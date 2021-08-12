// get height container 3-article-text
var heightWindown = window.innerHeight - 290;
$(".section-article-text .box-style-10 .main-content").height(heightWindown);


// make a button to scroll horizontally in div

$('.slideNext').on('click', function (e) {
    $('.main-content').animate({ scrollLeft: '+=1173' }, 1000);
});

$('.slidePrev').on('click', function (e) {
    $('.main-content').animate({ scrollLeft: '-=1173' }, 1000);
});

// get widthScroll

var widthScroll = $('.main-content')[0].scrollWidth;
var column = Math.round(widthScroll / 293);

var missColumn = (4 - column % 4)
console.log('missColumn', missColumn);
if (missColumn < 4) {
    var height = missColumn * 100
    var number = height + "%"
    $('.column-miss ').css('height', number);
}



// auto scroll
if (document.querySelector('.section-homepage')) {
    var activeChapter = 1;
    var lastScroll = 0;
    var monitor = true;
    $('.dots, .chevron-wrap').on('click', function (e) {
        e.preventDefault();
        monitor = false;
        $('html, body').animate({ scrollTop: $('#chapter' + $(this).attr('data-link')).offset().top }, 1000, function () { monitor = true; });
    });
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var height = $(window).height();

        var chapter = 1;
        $('.chapter').each(function (i) {
            if ($(this).position().top <= scroll + height * 0.5) {
                chapter = parseInt($(this).attr('id').replace('chapter', ''));
            }
        });
        $('.wrap-dots .dots.active').removeClass('active');
        $('.wrap-dots .dots').eq(chapter - 1).addClass('active');
        activeChapter = chapter;

        if (!monitor) { return; }

        var monitorObject;
        if (scroll > lastScroll) {
            //down
            monitorObject = $('#chapterbtn' + activeChapter);
            if (monitorObject.length > 0) {
                if (monitorObject.offset().top > scroll && monitorObject.offset().top < scroll + height * 0.6) {
                    monitorObject.click();
                }
            }
        } else {
            //top
            if (activeChapter > 1) {
                monitorObject = $('#chapter' + activeChapter);
                if (monitorObject.length > 0) {
                    if (monitorObject.offset().top < scroll + height && monitorObject.offset().top > scroll + height * 0.6) {
                        monitor = false;
                        $('html, body').animate({ scrollTop: $('#chapterbtn' + (activeChapter - 1)).offset().top - height * 0.7 }, 1000, function () { monitor = true; });
                    }
                }
            }

        }
        lastScroll = scroll;

    }).scroll();
}


