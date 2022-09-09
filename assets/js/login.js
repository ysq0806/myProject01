$(function () {
    // 绑定点击事件  切换盒子
    $('#login_link').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#reg_link').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //自定义验证规则
    var form = layui.form; //先获取这个元素
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })

    //注册表单事件 注册
    var layer = layui.layer; //先获取这个元素
    $('#form_reg').on('submit', function (e) {
        //🚫默认行为
        e.preventDefault();

        //如果2次密码不一致 返回弹出消息警告
        if ($('#form_reg [name = "password"]').val() !== $('#form_reg [name = "repassword"]').val()) {
            return layer.msg('密码不一致');
        }
        var data = { username: $('#form_reg [name = "username"]').val(), password: $('#form_reg [name="password"]').val() };
        //发起post请求
        $.post('/api/reguser', data, function (res) {
            // console.log(res);
            if (res.status !== 0) {
                // return console.log('注册失败');
                return layer.msg("注册失败!")
            }
            // 调用layui里面的弹出方法
            layer.msg("注册成功!请登录")
        })

        //注册成功之后,自动跳转到登录页面(点击右下角的去登录)
        $('#reg_link').click();
    })

    //注册表单事件 登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        data = { username: $('#form_reg [name = "username"]').val(), password: $('#form_reg [name="password"]').val() };
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg("登录失败!");
            }
            layer.msg("登录成功!")
            console.log(res.token);
            //  需要有token才能进行有权限的页面请求 重要信息  先储存在本地
            localStorage.setItem('token', res.token);

            location.href = '/index.html';
        })
    })
})