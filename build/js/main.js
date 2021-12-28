// ================================================== vars
const header = document.querySelector('.header')
const home = document.querySelector('.home')
const advantages = document.querySelector('.advantages')
const awards = document.querySelector('.awards')
const dignity = document.querySelector('.dignity')
const vacancy = document.querySelector('.vacancy__images')
const floors = document.querySelector('.vacancy__areas')
const contacts = document.querySelector('.contacts')
const form = document.querySelector('.form')

// ================================================== header
window.addEventListener('scroll', function () {
    const scrollSize = window.pageYOffset
    scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
})
// ===================== выравниваем логотип по левому краю (чтобы на всех разрешениях он был на одинаковом расстоянии от левого края)
function logoAlign() {
    const screenWidth = window.innerWidth
    const logo = document.querySelector('.header__logo')
    const titleHomeScreen = document.querySelector('.home__title')
    titleHomeScreenLeftBorder = titleHomeScreen.getBoundingClientRect().left
    document.documentElement.clientWidth > 1200 ?
        logo.style.left = `${titleHomeScreenLeftBorder - 25}px` :
        logo.style.left = `${titleHomeScreenLeftBorder}px`
}
window.addEventListener('resize', logoAlign)
window.addEventListener('load', logoAlign)

// ================================================== inputmask
$(document).ready(function () {
    $(":input").inputmask();
    $(".phone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        greedy: false,
        clearIncomplete: true,
        onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            '*': {
                validator: "[0-9A-Za-z-а-я-]",
                casing: "lower"
            }
        }
    }
    );
});

// ================================================== slick slider
document.addEventListener('DOMContentLoaded', function () {
    $('.slider').slick({
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        // nextArrow: '<button type="button" class="slick-next">Next</button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    // пользовательская навигация
    // var dot = $(".dots__item");
    // $('.slider').on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    //     dot.removeClass("dots__item--active").eq(nextSlide).addClass("dots__item--active")
    // });
    // dot.on("click", function () {
    //     var i = dot.index(this);
    //     $('.slider').slick("slickGoTo", i)
    // });
    // $(".prev").on("click", function () {
    //     $('.slider').slick("slickPrev")
    // });
    // $(".next").on("click", function () {
    //     $('.slider').slick("slickNext")
    // });

});
// ================================================== animation
window.addEventListener('load', function () {
    // home section
    setTimeout(function () {
        home.style.opacity = 1
    }, 1000)
    setTimeout(function () {
        header.style.top = 0
    }, 1500)
})

window.addEventListener('load', () => {
    function animation(section, classNameAnimation) {
        let prevRatio = 0.0;
        let observer = new IntersectionObserver((entries, observer) => {
            const animateElems = section.querySelectorAll('.animate__animated')
            time = 0
            entries.forEach(entry => {
                let curRatio = entry.intersectionRatio;
                if (curRatio > prevRatio) {
                    animateElems.forEach(item => {
                        this.setTimeout(function () {
                            item.classList.add(classNameAnimation)
                            item.style.opacity = 1
                        }, time)
                        time += 200
                    })
                } else {
                    animateElems.forEach(item => {
                        this.setTimeout(function () {
                            item.classList.remove(classNameAnimation)
                            item.style.opacity = 0
                        }, time)
                        time = 0
                    })
                }
                prevRatio = curRatio;
            })
        }, { threshold: 0.2 });
        observer.observe(section);
    }
    animation(home, 'animate__fadeInDown');
    animation(advantages, 'animate__fadeInLeft');
    animation(awards, 'animate__fadeInDown');
    animation(dignity, 'animate__flipInY')
    animation(vacancy, 'animate__zoomIn')
    animation(floors, 'animate__fadeInDown')
    animation(contacts, 'animate__fadeInLeft')
});

// ================================================== map (отложенная загрузка)
setTimeout(function () {
    var headID = document.getElementsByTagName("body")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    headID.appendChild(newScript);
}, 3000);
setTimeout(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.907879, 37.415901],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: '141402, Московская обл., г. Химки, ул. Ленинградская, владение 39, стр. 5',
            balloonContent: '141402, Московская обл., г. Химки, ул. Ленинградская, владение 39, стр. 5'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/Logo.png',
            iconImageSize: [40, 45],
            iconImageOffset: [-5, -38]
        })
    myMap.geoObjects
        .add(myPlacemark)
}, 4000);