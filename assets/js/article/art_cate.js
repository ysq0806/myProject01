$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initArticleLIst();

    // 初始化文章列表
    function initArticleLIst() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res);
                $('#tbodyArticle').html(htmlStr)
            }
        })
    }
    var indexAdd = null;
    // 给添加文章按钮 绑定事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#dailog-add').html()  //这里需要的是‘’ 通过脚本获取过来
        })
    })
    // 因为这里面的conntent是动态生成的  所以需要代理点击事件
    // $('body').on('submit', '#form-add', function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/article/addcates',
    //         data: {
    //             name: $('#form-add [name="name"]').val(),
    //             alias: $('#form-add [name="alias"]').val()
    //         },
    //         success: function (res) {
    //             // console.log($('#form-add [name="name"]').val(), $('#form-add [name="alias"]').val());
    //             console.log(res);
    //             initArticleLIst();
    //         }
    //     })
    // })

    // 因为这里面的conntent是动态生成的  所以需要代理点击事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.close(indexAdd)
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })


    // 给编辑按钮绑定事件 同样需要代理
    var indexEdit = null;
    $('tbody').on('click', '#btn-edit', function (e) {
        e.preventDefault();
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dailog-edit').html()  //这里需要的是‘’ 通过脚本获取过来
        })

        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                // 快速填充表单
                form.val('form-edit', res.data);
            }
        })
    })

    // 给编辑弹窗里的 提交修改 按钮绑定事件 代理
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log($('#form-edit').serialize());
                console.log(1);
                if (res.status !== 0) {
                    return layer.msg('提交修改失败！')
                }
                layer.msg('提交修改成功！');
                initArticleLIst();
                // layer.close(indexEdit);
            }
        })
    })


    // 给 删除 按钮绑定事件 代理
    var indexConfirm = null;
    $('body').on('click', '#btn-delete', function () {
        // 弹出提示框是否删除
        indexConfirm = layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (indexConfirm) {
            var id = $(this).attr('data-id');
            //函数 执行删除的ajax操作 关闭 刷新页面
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        console.log(res.message);
                        return layer.msg(res.message);
                    }
                    layer.msg('删除文章成功！');
                    layer.close(indexConfirm);
                    initArticleLIst();
                }
            })

        });

    })
})