//在每次$.ajax() \ get() \post()之前 先执行ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log('http://www.liulongbin.top:3007' + options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // headers
    // 判断是否需要添加先
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { //headers这列一定要写对 不然成功不了 
            Authorization: localStorage.getItem('token')
        }
    }


    // 判断是否有token即就是访问权限 没有权限的话先让其登录--挑战到登录页面
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1 强制清除token
            localStorage.removeItem('token');
            //2 强制跳转到login页面先进行登录验证
            location.href = '/login.html';
        }
    }
})