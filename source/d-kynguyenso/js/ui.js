if (document.querySelector('.section-homepage')) {
    $('.section-homepage .box-highlight .rank-1').slick({
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
    });

    // active nav-tab
    const $navTabLink = $('.nav-tab .nav-tab__link a');
    const $navTabContent = $('.nav-tab .nav-tab__content ');

    $(".nav-tab .nav-tab__link a").click(function (e) {
        // INFO: prevent hash-jumping from anchor element
        e.preventDefault();
        const $this = $(e.target);
        const chosenTab = $this.attr('data-link');
        $navTabLink.removeClass('active');
        $this.addClass('active');
        $navTabContent.find('.tab-pane')
            .removeClass('active fadeInUp')
        $('.nav-tab .nav-tab__content .' + chosenTab).addClass('active fadeInUp');
    });
}
// > photoswipe

$(".article__body img:not(.no-slider)").wrap(function (index) {
    var _this = $(this);
    console.log(_this);
    var naturalWidth = _this[0].naturalWidth;
    var naturalHeight = _this[0].naturalHeight;
    var title = _this[0].alt ;
    console.log(title);
    var src = $(this).attr("src");

    src = src.replace("w460x", "");
    var box_desc = $(this).parent().find(".image_caption");
    if (box_desc == null) {
        box_desc = $(this).find("em");
    }
    var desc = box_desc == null ? document.title.replace("\"", "&quot;").replace("“", "&quot;").replace("”", "&quot;") : box_desc.text();
    var width = Number(naturalWidth * 1.5625).toFixed(0);
    var height = Number(naturalHeight * 1.5625).toFixed(0);
    if (_this.parents('.photo').length) {
        _this.parents().attr('data-index', index);
        _this.parents().attr('data-med-size', naturalWidth + "x" + naturalHeight);
        _this.parents().attr('data-med-size', naturalWidth + "x" + naturalHeight);
        _this.parents().attr('data-size', width + "x" + height);
        _this.parents().attr('data-src', src);
        _this.parents().attr('data-title', title);
        return;
    }
    return "<a class='photo' href='" + src + "' data-desc='" + (desc == undefined ? "" : desc) + "' data-index='" + index
        + "' data-med-size='" + naturalWidth + "x" + naturalHeight
        + "' data-src='" + src
        + "' data-size='" + width + "x" + height + "' "
        //+ "' data-title='" + title
        + "/>";
});

$('.article__body').each(function () {
    var $pic = $(this),
        getItems = function () {
            var items = [];
            $pic.find('a.photo').each(function () {
                //try {
                    var width = $(this).data('width');
                    var height = $(this).data('height');
                    var href = $(this).data('src'),
                        thumb = $(this).children("img").attr("src"),
                        size = $(this).data('size').split('x'),
                        width = size[0],
                        height = size[1];

                    var item = {
                        src: thumb,
                        msrc: thumb,
                        w: width,
                        h: height,
                        //author: $(this).children("img").attr("data-title")
                    };

                    item.el = $(this).find("img")[0];

                    items.push(item);
                //} catch (error) {
                   // console.log(error);
               // }
            });
            console.log(items)
            return items;
        }

    var items = getItems();
    var $pswp = $('.pswp')[0];
    $pic.on('click', 'a.photo', function (event) {
        console.log('object');
        event.preventDefault();
        var $index = $(this).data('index');
        console.log('index => ', $index);
        // alert($index);
        var options = {
            index: $index,
            bgOpacity: 0.7,
            showHideOpacity: true,
            enableMouseWheel: false,
            enableKeyboard: false,
            shareEl: false,

            //animation
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el;
                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                var rect = thumbnail.getBoundingClientRect();
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }//end animation
        };
        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
        lightBox.init();
    });
});
// end