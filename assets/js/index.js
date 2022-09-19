$(function () {
    // 调用getUserInfo函数获取基本信息
    getUserInfo()
    // console.log(localStorage.getItem('token'));
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',   //这里不用写完整的根路径了  因为导入了baseAPI
        // 请求头 可以封装到baseAPI里面 不用每次都添加进来
        // headers: { //headers这列一定要写对 不然成功不了 
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            //判断是否获取信息成功
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //成功的话调用renderAvatar函数 来渲染头像信息
            // console.log(res);
            renderAvatar(res.data);
        }, //这里一定要注意  如果后面还有需要写其他函数 要加痘号  对象
        //不管请求成功与否 都会执行  函数
        // complete: function (res) {
        //     // console.log(res.responseJSON)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1 强制清除token
        //         localStorage.removeItem('token');
        //         //2 强制跳转到login页面先进行登录验证
        //         location.href = '/login.html';
        //     }
        // }

        //每次重新登录获取的token都是不一样的
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU2NTYsInVzZXJuYW1lIjoidnYxMjM0NTYiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2Mjk4NDAzMywiZXhwIjoxNjYzMDIwMDMzfQ.jl2Ju7eCF0Y1I5SWo7ECIGmXhkUT02M4u_-zARFqQMA
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU1NDcsInVzZXJuYW1lIjoiMTM1NDU2Nzg5MTIiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2Mjk4NDEwNywiZXhwIjoxNjYzMDIwMTA3fQ.Mpg4kIbc1HmgOhbfeTtRdnMngJlqPYT12cW5ka-D7Gk
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU2NTcsInVzZXJuYW1lIjoiY2MxMjM0NTYiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2Mjk4NDE1MCwiZXhwIjoxNjYzMDIwMTUwfQ.lDc24fvEfgf_pzuE1FO-cubQXtBbh0XcMJy8oQdjBos
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU2NTYsInVzZXJuYW1lIjoidnYxMjM0NTYiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2Mjk4NDE3MCwiZXhwIjoxNjYzMDIwMTcwfQ.RHGu4j0nnQeTqrO_tKzcYUdSX6if4b5mQ2SGha77ic0
    })
}

// 获取个人头像信息函数
function renderAvatar(user) {
    //欢迎你*** 字面  优先昵称没有的话就账户名
    var name = user.nickname || user.username;
    // $('.welcome').html(uname)
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //头像 优先用户设置的那个头像没有的话就用用户名的首字母大写
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avartar').hide();
    } else {
        $('.layui-nav-img').hide();
        var firstName = name[0].toUpperCase();
        $('.text-avartar').html(firstName).show();
    }
}

// 退出绑定事件
$('#btnLoginOut').on('click', function () {

    var layer = layui.layer;
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 1 清除掉本地的token
        localStorage.removeItem('token');
        // 2 重新返回到登录的页面
        location.href = '/login.html';
        // 3 退出窗口 
        layer.close(index);
    });



})