$(document).ready(function(){
    document.body.addEventListener('touchstart', function(){}, {passive: true});

    var nav = $('.g-nav');
    var baseurl = $("meta[property='og:baseurl']").attr('content');
    var logo = $('.g-logo');
    var themeStyle = $('.g-banner').attr('data-theme');
    logo.css({
        'background': 'url(' + baseurl + '/assets/icons/' + themeStyle + '.svg) no-repeat center',
        'background-size': '100% 100%'
    });

    /**
     * Fix table for small screens
     */
     $("table").wrap("<div class='table-area'></div>");


    /**
     * Responsive Navigation
     */
    $('#menu-toggle').on('click', function(e) {
        var duration = 200;
        nav.slideToggle(duration);
        $(document).on('click', function() {
            nav.slideUp(duration);
        });
        e.stopPropagation();
    });

    nav.on('click', function(e) {
        e.stopPropagation();
    });

    /*
    *  Header Bar
    */
    if($(window).width() > 695) {
        var header = $('.g-header');
        var headerHeight = header.outerHeight();
        var navText = nav.find('a');
        var scFlag = $(document).scrollTop();
        var logo = $('.g-logo');
        var themeStyle = $('.g-banner').attr('data-theme');

        $(document).scroll(function() {
            var scrollTop = $(this).scrollTop();
            var navClassName = 'nav-' + themeStyle;


            if (scrollTop > headerHeight) {
                if(scrollTop > 3 * headerHeight) {
                    header.addClass('headerUp');
                }
                header.css({
                    'background-color': 'rgba(255, 255, 255, .98)',
                    'box-shadow': '0 1px 12px rgba(0, 0, 0, .08)'
                });
                logo.css({
                    'background': 'url(' + baseurl + '/assets/icons/' + themeStyle + '.svg) no-repeat center',
                    'background-size': '100% 100%'
                });
                navText.css('color', '#666');
                nav.addClass(navClassName);
            } else {
                header.removeClass('headerUp');
                // console.log("rm up");
                $('#bttb').removeClass("active");
                header.css({
                    'background-color': 'transparent',
                    'box-shadow': 'none'
                });
                logo.css({
                    'background': 'url(' + baseurl + '/assets/icons/' + themeStyle + '.svg) no-repeat center',
                    'background-size': '100% 100%'
                });
                navText.css('color', '#fff');
                nav.removeClass(navClassName);
            }

            // scroll action
            if (scFlag > scrollTop) {
                header.addClass('headerDown');
                if(header.hasClass('headerUp')){
                    $('#bttb').addClass("active");
                }
            } else {
                header.removeClass('headerDown');
                $('#bttb').removeClass("active");
            }
            scFlag = scrollTop;
        });
    }else{
        var header = $('.g-header');
        var headerHeight = header.outerHeight();
        var scFlag = $(document).scrollTop();
        $(document).scroll(function() {
            var scrollTop = $(this).scrollTop();

            if (scrollTop < 100){
                $('#bttb').removeClass("active");
            }

            // scroll action
            if (scFlag > scrollTop && scFlag > 5) {
                $('#bttb').addClass("active");
            } else {
                $('#bttb').removeClass("active");
            }
            scFlag = scrollTop;
        });
    }

    /*
    * List for contents
    */
    // var mode = getCookie("mode");
    // if(mode == "night"){
    //     $(".mobile-list .icon.list.night").addClass("active");
    // }else{
    //     $(".mobile-list .icon.list.day").addClass("active");
    // }

    function clickMobileList(){
        $('.table-of-contents').toggleClass("active");
        var mode = getCookie("mode");
        if(mode == "night"){
            $('.mobile-list .icon.list.night').toggleClass('active');
            $('.mobile-list .icon.exit.night').toggleClass('active');
        }else{
            $('.mobile-list .icon.list.day').toggleClass('active');
            $('.mobile-list .icon.exit.day').toggleClass('active');
        }
    }

    $('.mobile-list').bind('click', function(){
        clickMobileList();
    });

    $(".table-of-contents").on('click', function(){
        clickMobileList();
    });


    /*
    * Back To Top Button
    */
    $('.bttb').bind('click', function(){
        $('html,body').animate({scrollTop:0}, function(){
            $('#bttb').removeClass("active");
        });
    });

    /*
    * Post Cover Resize
    */
    function postCover(img, container) {
        var imgWidth = img.width();
        var containerWidth = container.width();
        var imgHeight = img.height();
        var containerHeight = container.height();

        if (imgHeight < containerHeight) {
            img.css({
                'width': 'auto',
                'height': '100%'
            });
            imgWidth = img.width(),
            containerWidth = container.width();
            var marginLeft = (imgWidth - containerWidth) / 2;
            img.css('margin-left', '-' + marginLeft + 'px');
        } else {
            var marginTop = (containerHeight - imgHeight) / 2;
            img.css('margin-top', marginTop + 'px');
        }

        img.fadeIn();
    }

    /**
     * The Post Navigator
     */
    $('.read-next-item section').each(function() {
        var n = $(this).height();
        var rn = $('.read-next-item').height();
        $(this).css('margin-top', (rn - n) / 2 + 'px');
        $(this).fadeIn();
    });

    $('.read-next-item img').each(function(){
        postCover($(this), $('.read-next-item'));
        // $(this).addClass("lazyload");
        $(this).attr('data-src', $(this).attr('src')).removeAttr('src').addClass("lazyload");
    });

    /**
     * Pagination
     */
    function pagination() {
        var total = parseInt($('#total_pages').val());
        var current = parseInt($('#current_pages').val());
        var baseUrl = $('#base_url').val();
        var limit = 3;

        var link_html = '';

        for (var i = current - limit; i < current; i++) {
            if (i > 0 && i !== 1) {
                link_html += '<a href="' + baseUrl + 'page' + i + '/index.html" class="page-link page-num">' + i + '</a>';
            } else if (i === 1) {
                link_html += '<a href="' + baseUrl + '" class="page-link page-num">' + i + '</a>';
            }
        }

        link_html += '<span class="page-link page-num active">' + current + '</span>';

        for (var j = current + 1; j <= current + limit; j++) {
            if (j <= total) {
                link_html += '<a href="' + baseUrl + 'page' + j + '/index.html" class="page-link page-num">' + j + '</a>';
            }
        }

        $('#page-link-container').html(link_html);
    }
    pagination();

    /**
     * Search
     */
    function Search() {
        var self = this;
        var input = $('#search_input');
        var result = $('.search_result');

        input.focus(function() {
            $('.icon-search').css('color', '#3199DB');
            result.show();
        });

        input.keyup(debounce(this.autoComplete));

        $(document).click(function(e) {
            if(e.target.id === 'search_input' || e.target.className === 'search_result' || e.target.className === 'search_item') {
                return;
            }
            $('.icon-search').css('color', '#CAD3DC');
            result.hide();
        });
    }

    Search.prototype.autoComplete = function() {
        var keywords = this.value.toLowerCase();

        if (keywords.length) {
            $('.icon-search').css('color', '#3199DB');
        } else {
            $('.icon-search').css('color', '#CAD3DC');
        }

        var jsonfile =  baseurl + '/assets/search.json';
        $.getJSON(jsonfile).done(function(data) {
            var html = '';
            for (var i in data) {
                var item = data[i];
                var title = item.title;
                var tags = item.tags;
                var url = item.url;

                var k = title + tags;
                if (keywords !== '' && k.toLowerCase().indexOf(keywords) >= 0) {
                    html += '<a class="search_item" href="' + item.url + '">' + item.title + '</a>';
                }
            }
            $('.search_result').html(html);
        });
    };

    function debounce(fn, delay) {
        var timer;
        delay = delay || 120;

        return function () {
            var ctx = this;
            var args = arguments;
            var later = function() {
                fn.apply(ctx, args);
            };
            clearTimeout(timer);
            timer = setTimeout(later, delay);
        };
    }

    new Search();

    /**
     * Night mode
     */
    function nightMode() {
        var el = $('body');
        var className = 'night-mode';

        var date = new Date();
        var hour = date.getHours();

        var mode = getCookie("mode");
        if (mode == "") {
            console.log(mode);
            if (hour <= 6 || hour >= 18){
                console.log("Start night mode");
                setCookie("mode", "night", 1)
            }
            // el.addClass(className);
        }
    }

    if ($('#nm-switch').val() === 'true') {
        nightMode();
    }

    /**
     * Copy and copyright
     */
    function setClipboardData(str) {
        str += '\n\n著作权归作者所有。\n商业转载请联系作者获得授权,非商业转载请注明出处。\n原文: ' + location.href;
        $('.post-content').on('copy', function(e) {
            var data = window.clipboardData || e.originalEvent.clipboardData;
            data.setData('text/plain', str);
            e.preventDefault();
        });
    }
    $('.post-content').on('mouseup', function(e) {
        var txt = window.getSelection();
        if (txt.toString().length >= 30) {
            setClipboardData(txt);
        }
    });

    /*
    * TOC highlight with the corresponding content
    */
    function locateCatelogList(){
        /*获取文章目录集合,可通过：header过滤器*/
        var alis = $('article :header');
        /*获取侧边栏目录列表集合**/
        var sidebar_alis = $('.table-of-contents').find('a');
        /*获取滚动条到顶部的距离*/
        var scroll_height = $(window).scrollTop();
        if(scroll_height>0){
            $('.g-header').addClass('headerUp');
        }
        for(var i =0;i<alis.length;i++){
            /*获取锚点集合中的元素分别到顶点的距离*/
            var a_height = $(alis[i]).offset().top - 100;
            if (a_height < scroll_height){
                /*高亮显示*/
                $(sidebar_alis).removeClass('active');
                $(sidebar_alis[i]).addClass('active');
            }
        }
    }

    locateCatelogList();
    $(window).bind('scroll',locateCatelogList); 

    /*
    * Day/Night mode switch button
    */
    function getCookie(cname)
    {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }

    // function setCookie(cname, cvalue, exdays, domain="127.0.0.1"){
    function setCookie(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        if(!baseurl){
            // document.cookie = cname+"="+cvalue+"; path=/; domain="+domain+";"+expires;
            document.cookie = cname+"="+cvalue+"; path=/; "+expires;
        }else {
            // document.cookie = cname+"="+cvalue+"; path="+baseurl+"; domain="+domain+";"+expires;
            document.cookie = cname+"="+cvalue+"; path="+baseurl+"; "+expires;
        }
    }
    
    // setCookie("SameSite", "None; Secure", 1, ".lisz.me");
    // setCookie("widget_session", "abc123; SameSite=None; Secure", 1);
    // setCookie("widget_session", "abc123; SameSite=None; Secure", 1, ".lisz.me");
    // setCookie("SameSite", "Strict", 1, ".lisz.me");

    // document.cookie = "Set-Cookie: widget_session=abc123; SameSite=None; Secure; path="+baseurl;

    var mode = getCookie("mode");
    // console.log(mode);
    if(mode == "night"){
        $(".g-nav li.mode .night").addClass("active");
        $("#mode-toggle .icon-night").addClass("active");
        $("body").addClass("night-mode");
        $(".icon.up.night").toggleClass("active");
        $(".icon.list.night").toggleClass("active");
    }else{
        $(".g-nav li.mode .day").addClass("active");
        $("#mode-toggle .icon-day").addClass("active");
        $("body").removeClass("night-mode");
        $(".icon.up.day").toggleClass("active");
        $(".icon.list.day").toggleClass("active");
    }

    function changeMode(){
        var mode = getCookie("mode");
        if(mode == ""){
            setCookie("mode", "night", 1)
            $("body").addClass("night-mode");
        }else if(mode == "day"){
            setCookie("mode", "night", 1)
            $("body").addClass("night-mode");
        }else{
            setCookie("mode", "day", 1)
            $("body").removeClass("night-mode");
        }
        // console.log(mode + "-->" + getCookie("mode"));
        if($("#disqus_thread").length > 0){
            DISQUS.reset({
                reload: true
            });
        }
        $(".g-nav li.mode .icon").toggleClass("active");
        $("#mode-toggle .icon").toggleClass("active");
        $(".icon.up.day").toggleClass("active");
        $(".icon.up.night").toggleClass("active");
        if($('.table-of-contents').css('visibility') == "visible"){
            $(".icon.exit.day").toggleClass("active");
            $(".icon.exit.night").toggleClass("active");
        }else{
            $(".icon.list.day").toggleClass("active");
            $(".icon.list.night").toggleClass("active");
        }
    }

    $(".g-nav li.mode").click(function(){
        changeMode();
    });

    $("#mode-toggle").click(function(){
        changeMode();
    });

    /*
    *  Copy code blocks
    */
    // get all <code> elements
    var allCodeBlocksElements = $("pre");
    allCodeBlocksElements.each(function(i) {
        // add different id for each code block
        // target	
        var currentId = "codeblock" + (i + 1);
        $(this).attr('id', currentId);
        var lang = $(this).attr("class").split(" ")[1].substring(9).toUpperCase(); 
       
        //trigger
        var clipButton = '<div class="copy-container"><span class="lang">' + lang + '</span><button class="btn" data-bs-original-title="Copy" aria-label="Copy" data-clipboard-target="#' + currentId + '"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-copy"></use></svg><span class="tooltip unfinish">Copy</span><span class="tooltip finish">Copied</span></button></div>';
        $(this).before(clipButton);
    });

    var clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function(e) {
        e.clearSelection();
    });

    $(".markdown-body .btn").hover(function(){
        $(this).find(".tooltip.unfinish").addClass("active");
    },function(){
        $(this).find(".tooltip.unfinish").removeClass("active");
    });

    $(".markdown-body .btn").click(function(){
        $(this).find(".tooltip.unfinish").removeClass("active");
        var finish = $(this).find(".tooltip.finish")
        finish.addClass("active");
        setTimeout(function () {      
            finish.removeClass("active");
        }, 500);
    });

    /*
    *  Error image loading
    */
    document.addEventListener('error', function(e){
        if(e.target.nodeName == 'IMG'){e.target.src = baseurl + '/assets/img/placeholder.webp';}
    }, true);

});
