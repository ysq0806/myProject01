$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    var q = {
        pagenum: 2,  //页码值  
        pagesize: 3, //每页显示多少条数据
        cate_id: '',//文章分类的 Id
        state: ''//文章的状态
    }

    // 时间过滤器
    template.defaults.imports.dateFormate = function (data) {
        const dt = new Date(data);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth + 1);
        var d = padZero(dt.getDay);

        var hh = padZero(dt.getHours);
        var mm = padZero(dt.getMinutes);
        var ss = padZero(dt.getSeconds);

        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss;
    }
    // 补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }


    initTable(q);
    initCate();
    //初始化表格的函数
    function initTable(q) {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化表格数据失败！');
                }

                // 利用模板引擎渲染表格数据
                var htmlStr = template('tpl-table', res);
                console.log(res);
                $('tbody').html(htmlStr);
                layer.msg('初始化表格数据成功！');

                // 调用分页渲染函数 渲染分页
                renderPage(res.total);
            }
        })
    }

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化可选框失败！')
                }
                var htmlStr = template('tpl-cate', res);
                console.log(htmlStr);
                $('[name="cate_id"]').html(htmlStr);

                // 需要重新渲染layui的页面
                form.render();
            }
        })
    }

    //为筛选按钮绑定事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        // 获取表单中选中的值
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();

        // 将获取的值填入参数对象q里 
        q.cate_id = cate_id;
        q.state = state;

        // 重新渲染表格
        initTable(q);
    })

    // 渲染分页函数
    function renderPage(total) {
        laypage.render({
            elem: 'boxPage' //容器
            , count: 5  //数据总条数
            , curr: q.pagenum//获取起始页
            , limit: q.pagesize //每页的条数
            , limits: [2, 3, 5, 10]
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']

            // 分页发生切换时,就会执行下面回调函数
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit);
                // 将页面的页数更新到q
                q.pagenum = obj.curr;

                // 将页面显示条数更新到q
                q.pagesize = obj.limit;

                // 重新渲染表格
                // initTable(q);  直接调用的话会死循环, 因为执行render函数就会执行jump回调,再去初始化表格又会执行render函数

                if (!first) {
                    initTable(q);
                }
            }
        });
    }



})