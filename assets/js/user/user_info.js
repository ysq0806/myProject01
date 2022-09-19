$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 自定义规则 
    // 不知道为什么  加了自定义规则之后  就不能再加内置的规则了
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入1-6位的昵称'
            }
        }
    })

    // 初始化用户信息
    initUserInfo();
    function initUserInfo() {

        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化用户信息失败')
                }
                // $('#mycard [name="nickname"]').html(res.data.username);

                // 调用form.val('filter', object)给表当赋值
                // filter指定哪个表当 表当需要有 这个属性，obj是我们的数据对象
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 重置按钮 恢复保存之前的原始数据
    $('#btnReset').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault();

        initUserInfo();
    })

    // // 提交b表单事件
    // $('#btnSubmit').on('click', function (e) {
    //     e.preventDefault();
    //     var data1 = form.val("formUserInfo");
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/userinfo',
    //         data: {
    //             id: data1.id,
    //             nickname: data1.nickname,
    //             email: data1.email
    //         },
    //         success: function (res) {
    //             console.log(res);
    //         }
    //     })
    //     console.log(data1);
    // })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 序列化数据
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败！')
                }
                layer.msg('提交成功！')

                // 更新欢迎你*** 即就是重新渲染头像区域
                // 调用父页里面的方法  需要window.parent.Fn()
                window.parent.getUserInfo();
            }
        })
    })
})