//在每次$.ajax() \ get() \post()之前 先执行ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log('http://www.liulongbin.top:3007' + options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url;
})