$(function () {
    var layer = layui.layer;

    // 主要导入corpper的框架
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 选择按钮绑定 原本上传按钮
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    // 为文件选择框 绑定change事件
    $('#file').on('change', function (e) {
        // console.log(e);
        // var filelist = e.target.files;
        // if (filelist === 0) {
        //     layer.msg('请选择图片');
        // }

        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 为确认按钮 绑定上传功能
    $('#btnUpload').on('click', function () {
        //先拿到裁剪后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // ajax上传更改头像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL  //base64格式的字符串
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')

                // 更改头像之后重新渲染信息
                window.parent.getUserInfo();
            }
        })
    })
})