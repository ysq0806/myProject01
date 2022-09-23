$(function () {
    var layer = layui.layer;
    var form = layui.form;

    // 初始化下拉选择框的数据
    initOption()
    // 初始化富文本编辑器
    initEditor()

    // 初始化下拉选择框的数据
    function initOption() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化下拉选择框数据失败！')
                }
                var htmlStr = template('tpl-option', res);
                $('[name="cate_id"]').html(htmlStr);
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 4 选择按钮绑定 原本上传按钮
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    // 5 为文件选择框 绑定change事件
    $('#file').on('change', function (e) {
        // console.log(e);
        var filelist = e.target.files;
        if (filelist === 0) {
            return layer.msg('请选择图片');
        }

        // 模板
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 定义 发表文章的状态
    var art_status = '已发布';
    // 若是存为草稿提交的 改为草稿
    $('#btnSave2').on('click', function () {
        art_status = '草稿';
    })


    // 为表单提交绑定事件 
    $('#form-pub').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();

        //1 快速将表单转化为dataformate格式
        var fd = new FormData($(this)[0]);

        //2 将status追加到fd里去
        fd.append('status', art_status);

        //3 将封面转化为blob对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                //4 得到文件对象后，将其追加到fd中
                fd.append('cover_img', blob);

                //5 调用函数 进行ajax请求
                publishArticle(fd);
            })


        //进行ajax请求 发表文章
        function publishArticle(fd) {
            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,
                // 如果想服务器发送FormData数据的话需要下面2个属性
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('发表文章失败！')
                    }
                    location.href = '/article/art_list.html';
                }
            })
        }
    })

})