$(function () {
    var form = layui.form;
    var layer = layui.layer;

    // 注意在填写 lay-verify="pwd" 的时候前往不要加了空格  哭死
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 新旧密码不能一样
        diffPwd: function (value) { //value：表单的值、item：表单的DOM对象
            if (value === $('[name = "oldPwd"]').val()) {
                return '用户新密码不能跟旧密码一致';
            }
        },

        // 新密码一致
        samePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '新密码不一致';
            }
        }
    })


    // 发起ajax 修改服务器密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败');

                }
                layer.msg('修改密码成功');

                // 清空输入框
                $('#reset').click();
            }

        })
    })
})