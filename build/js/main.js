window.onload = function () {

    // video
    $('.js-play').on('click', e => {
        e.preventDefault();
        $('.js-video-wrapper').addClass('is-active');
        // и само видео запустим
        $('.js-video-wrapper').find('video')[0].play();
    });

    // слайдер в блоке "с чего начать?"
    var items = $('.js-sixth').find('.sixth__pagination-item');
    for ( let i = 0; i < items.length; i++) {
        $(items[i]).on('click', function () {
            $('.sixth__col-too').css('transform', `translate3d(${-25*i}%, 0, 0)`);
            for (let j = 0; j < items.length; j++) {
                if ($(items[j]).hasClass('is-active')) {
                    $(items[j]).removeClass('is-active');
                }
            }
            $(items[i]).addClass('is-active');
        });
    }
    // слайдер от тачскрина в блоке "с чего начать?"
    $('.sixth__col-too').on('touchstart', function (e) {
        var delta = 0;
        for (let i = 0; i < items.length; i++) {
            if ($(items[i]).hasClass('is-active')) {
                delta = i;
            }   
        }
        const target = e.changedTouches[0].target;
        const startCoord = e.changedTouches[0].screenX;
        const endHandler = e => {
            const endCoord = e.changedTouches[0].screenX;
            // движение на более чем 30 пикселей, скорее всего, намеренное
            if (Math.abs(startCoord - endCoord) > 30) {
                if (endCoord > startCoord  && delta > 0) {
                    $(items[delta]).removeClass('is-active');
                    $(items[delta - 1]).addClass('is-active');
                    $('.sixth__col-too').css('transform', `translate3d(-${( delta - 1) * 25}%, 0, 0)`);
                } else if (endCoord < startCoord && delta < 3) {
                    $(items[delta]).removeClass('is-active');
                    $(items[delta + 1]).addClass('is-active');                    
                    $('.sixth__col-too').css('transform', `translate3d(-${ (delta + 1) * 25}%, 0, 0)`);
                }
            }
            target.removeEventListener('touchend', endHandler);
        };
        target.addEventListener('touchend', endHandler);
    });

    // слайдер в блоке "бизнес в удовольствие"
    $('.eleventh__pagination').children('div').on('click', function (event) {
        if ($(event.target).hasClass('eleventh__pagination-right')) {
            $('.eleventh__content').css('transform', 'translate3d(-50%, 0, 0)');
        }
        else {
            $('.eleventh__content').css('transform', 'translate3d(0, 0, 0)');
        }
        $('.eleventh__pagination').children('div').toggleClass('is-active');
    });
    // слайд от тачскрина
    $('.eleventh__content').on('touchstart', function (e) {
        const target = e.changedTouches[0].target;
        const startCoord = e.changedTouches[0].screenX;
        const endHandler = e => {
            const endCoord = e.changedTouches[0].screenX;
            // движение на более чем 30 пикселей, скорее всего, намеренное
            if (Math.abs(startCoord - endCoord) > 30) {
                if (endCoord > startCoord) {
                    $('.eleventh__content').css('transform', 'translate3d(0, 0, 0)');
                    $('.eleventh__pagination').find('.eleventh__pagination-left').addClass('is-active');
                    $('.eleventh__pagination').find('.eleventh__pagination-right').removeClass('is-active');
                } else {
                    $('.eleventh__content').css('transform', 'translate3d(-50%, 0, 0)');
                    $('.eleventh__pagination').find('.eleventh__pagination-left').removeClass('is-active');
                    $('.eleventh__pagination').find('.eleventh__pagination-right').addClass('is-active');
                }
            }
            target.removeEventListener('touchend', endHandler);
        };
        target.addEventListener('touchend', endHandler);
    });

    // плавный скролл к блокам
    var elems = document.querySelectorAll('.js-menu');
    for ( let j =0; j < elems.length; j++) {
        var links = $(elems[j]).find('li a');

        for ( let k = 0; k < links.length; k++) {
            links[k].addEventListener('click', function () {
                event.preventDefault();

                var id = $(this).attr('href'),
                    top = $(id).offset().top;

                $('body,html').animate({ scrollTop: top }, 1500);
                    
            });
        }        
    }

    // плавный скролл от кнопки далее
    $('.js-link').on('click', function () {
        event.preventDefault();
        var top = $('#elem-02').offset().top;
        $('body,html').animate({ scrollTop: top }, 750);
    });

    // плавный скролл к началу страницы
    $('.js-top').on('click', function () {
        event.preventDefault();
        var top = $('#elem-01').offset().top;
        $('body,html').animate({ scrollTop: top }, 750);
    });

    // мобменю фиксед кнопка
    $(window).scroll(function() {
        if ($(window).scrollTop() > 500) {
            $('.nav-mobile').hasClass('is-scrolled') ? null : $('.nav-mobile').addClass('is-scrolled');
        }
        else $('.nav-mobile').hasClass('is-scrolled') ? $('.nav-mobile').removeClass('is-scrolled') : null;
    });

    // мобменю список
    var mobMenu = document.querySelector('.js-mobmenu').children;
    for (let i = 0; i < mobMenu.length; i++) {
        mobMenu[i].addEventListener('click', function (event) {
            for (let j = 0; j < mobMenu.length; j++) {
                if ( mobMenu[j].classList.contains('is-active') ) {
                    mobMenu[j].classList.toggle('is-active')
                }
            }
            mobMenu[i].classList.add('is-active');

            document.querySelector('.nav-mobile').classList.remove('is-open');
            openMobmenu.style.display = 'block';  
        });
    }

    // моб. меню открытие
    var openMobmenu = document.querySelector('.js-open-mobmenu');
    var closeMobmenu = document.querySelector('.js-close-mobmenu');

    openMobmenu.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('.nav-mobile').classList.add('is-open');
        openMobmenu.style.display = 'none';
    });

    closeMobmenu.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('.nav-mobile').classList.remove('is-open');
        openMobmenu.style.display = 'block';
    });

    // моб. меню номера телефона
    var openPhone = document.querySelector('.js-open-phone');
    var closePhone = document.querySelector('.js-close-phone');

    openPhone.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('.first__right').classList.add('is-open');
        openMobmenu.style.display = 'none';
    });

    closePhone.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('.first__right').classList.remove('is-open');
        openMobmenu.style.display = 'block';
    });

    // яндекс-карта
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 9,
            controls: []
        }, {
            suppressMapOpenBlock: true,
            searchControlProvider: 'yandex#search'
        });

        var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #000; font-weight: bold;">$[properties.iconContent]</div>'
        );

        var myPlacemark_1 = new ymaps.Placemark([55.663847, 37.511311], {
            ballonContentHeader: 'Заголовок',
            ballonContentBody: 'Тело описания',
            ballonContentFooter: 'Футер',
            hintContent: 'описание по наведению'

        }, {
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/map-label.png',
            // Размеры метки.
            iconImageSize: [50, 65],
            iconContentLayout: MyIconContentLayout
        });

        myMap.geoObjects
            .add(myPlacemark_1);
    }

    // 

    var formData = {
        'name': '^[А-ЯA-Z][а-яёa-z]',
        'email': '^[a-zA-Z-.]+@[a-z]+\.[a-z]{2,3}$',
        'phone': '[0-9]{6,15}',
        'message': ''
    };

    var formSubmit = document.querySelector('#popup__form-button');
    var formItems = [];

    Array.prototype.forEach.call(document.querySelector('.popup__form').children, function (elem, i) {
        if (elem.tagName == 'INPUT' || elem.tagName == 'TEXTAREA') {
            if (elem.getAttribute('type') != 'submit') {
                formItems.push(elem);
            }
        }
    });

    for (var i = 0; i < formItems.length; i++) {
        formItems[i].addEventListener('input', function () {
            if (this.classList.contains('popup__form-ok')) {
                this.classList.remove('popup__form-ok');
            }
            this.classList.add('popup__form-active');
        });

        formItems[i].addEventListener('change', function () {
            let key = this.getAttribute('id').substring(12);
            let pattern = new RegExp(formData[key]);
            if ((pattern).test(this.value)) {
                if (this.classList.contains('popup__form-error')) {
                    this.classList.remove('popup__form-error');
                }
                if (this.classList.contains('popup__form-active')) {
                    this.classList.remove('popup__form-active');
                }
                this.classList.add('popup__form-ok');
            } else {
                this.classList.remove('popup__form-active');
                this.classList.add('popup__form-error');
                if (this.value == '') {
                    this.value = 'Поле обязательно для заполнения';
                }
            }
            checkSubmit();
        });
    }

    function checkSubmit() {
        let count = 0;
        for (var i = 0; i < formItems.length; i++) {
            if (formItems[i].classList.contains('popup__form-ok')) {
                count++;
            }
        }
        if (count == 4) {
            formSubmit.removeAttribute('disabled');
        }

    }

    // formSubmit.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     document.querySelector('.popup__wrap').style.display = 'none';
    //     document.querySelector('.popup__submited').style.display = 'block';

    // });    

    var popupOpen4 = document.querySelector('#popup_4'); // попап заказать звонок
    var popupOpen3 = document.querySelector('#popup_3'); // попап заказать звонок
    var popupOpen1 = document.querySelector('#popup_1'); // попап получить доступ к фин документации
    var popupOpen2 = document.querySelector('#popup_2'); // попап проверить город
    var popupClouse = document.querySelector('.popup__clouse');

    popupOpen1.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.popup__title').innerHTML = 'доступ к финансовым документам';
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup__wrap').style.display = 'block';
        document.querySelector('.popup__submited').style.display = 'none';
    });

    popupOpen2.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.popup__title').innerHTML = 'Свободен ли ваш<br>город?';
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup__wrap').style.display = 'block';
        document.querySelector('.popup__submited').style.display = 'none';
    });
    
    popupOpen3.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.popup__title').innerHTML = 'Заказать<br>звонок';
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup__wrap').style.display = 'block';
        document.querySelector('.popup__submited').style.display = 'none';
        document.querySelector('#popup__submited-button').innerHTML = '<span>Отправить</span>'; 
    });

    popupOpen4.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.popup__title').innerHTML = 'Получить доступ<br>к камерам';
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup__wrap').style.display = 'block';
        document.querySelector('.popup__submited').style.display = 'none';
        document.querySelector('#popup__submited-button').innerHTML = '<span>Получить доступ</span>';
    });

    popupClouse.addEventListener('click', () => {
        popupClean();
        document.querySelector('.popup').style.display = 'none';
        document.querySelector('body').classList.remove('modal-open');
    });

    popupSubmitedButton = document.querySelector('#popup__submited-button');

    popupSubmitedButton.addEventListener('click', () => {
        document.querySelector('.popup').style.display = 'none';
        popupClean();
    });

    function popupClean() {
        for (var i = 0; i < formItems.length; i++) {
            formItems[i].value = '';
            if (formItems[i].classList.contains('popup__form-ok')) {
                formItems[i].classList.remove('popup__form-ok')
            }
            if (formItems[i].classList.contains('popup__form-error')) {
                formItems[i].classList.remove('popup__form-error')
            }
            if (formItems[i].classList.contains('popup__form-active')) {
                formItems[i].classList.remove('popup__form-active')
            }
        }

    }

}




// window.onload = function () {

    // var formData = {
    //     'name': '^[А-ЯA-Z][а-яёa-z]',
    //     'email': '^[a-zA-Z-.]+@[a-z]+\.[a-z]{2,3}$',
    //     'phone': '[0-9]{6,15}',
    //     'message': ''
    // };

    // var formSubmit = document.querySelector('#popup__form-button');
    // var formItems = [];

    // Array.prototype.forEach.call(document.querySelector('.popup__form').children, function (elem, i) {
    //     if (elem.tagName == 'INPUT' || elem.tagName == 'TEXTAREA') {
    //         if (elem.getAttribute('type') != 'submit') {
    //             formItems.push(elem);
    //         }
    //     }
    // });

    // for (var i = 0; i < formItems.length; i++) {
    //     formItems[i].addEventListener('input', function () {
    //         if (this.classList.contains('popup__form-ok')) {
    //             this.classList.remove('popup__form-ok');
    //         }
    //         this.classList.add('popup__form-active');
    //     });

    //     formItems[i].addEventListener('change', function () {
    //         let key = this.getAttribute('id').substring(12);
    //         let pattern = new RegExp(formData[key]);
    //         if ((pattern).test(this.value)) {
    //             if (this.classList.contains('popup__form-error')) {
    //                 this.classList.remove('popup__form-error');
    //             }
    //             if (this.classList.contains('popup__form-active')) {
    //                 this.classList.remove('popup__form-active');
    //             }
    //             this.classList.add('popup__form-ok');
    //         } else {
    //             this.classList.remove('popup__form-active');
    //             this.classList.add('popup__form-error');
    //             if (this.value == '') {
    //                 this.value = 'Поле обязательно для заполнения';
    //             }
    //         }
    //         checkSubmit();
    //     });
    // }

    // function checkSubmit() {
    //     let count = 0;
    //     for (var i = 0; i < formItems.length; i++) {
    //         if (formItems[i].classList.contains('popup__form-ok')) {
    //             count++;
    //         }
    //     }
    //     if (count == 4) {
    //         formSubmit.removeAttribute('disabled');
    //     }

    // }

    // // formSubmit.addEventListener('click', function (event) {
    // //     event.preventDefault();
    // //     document.querySelector('.popup__wrap').style.display = 'none';
    // //     document.querySelector('.popup__submited').style.display = 'block';

    // // });

    // var popupOpen1 = document.querySelector('#popup_1');
    // var popupOpen2 = document.querySelector('#popup_2');
    // var popupClouse = document.querySelector('.popup__clouse');

    // popupOpen1.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     document.querySelector('.popup__title').innerHTML = 'доступ к финансовым документам';
    //     document.querySelector('.popup').style.display = 'block';
    //     document.querySelector('.popup__wrap').style.display = 'block';
    //     document.querySelector('.popup__submited').style.display = 'none';
    //     document.querySelector('body').addClass = 'modal-open';

    // });

    // popupOpen2.addEventListener('click', (event) => {
    //     event.preventDefault();
        
    //     document.querySelector('.popup__title').innerHTML = 'Свободен ли ваш<br>город?';
    //     document.querySelector('.popup').style.display = 'block';
    //     document.querySelector('.popup__wrap').style.display = 'block';
    //     document.querySelector('.popup__submited').style.display = 'none';
    //     document.querySelector('body').addClass = 'modal-open';

    // });

    // popupClouse.addEventListener('click', () => {
    //     popupClean();
    //     document.querySelector('.popup').style.display = 'none';
    //     document.querySelector('body').removeClass = 'modal-open';

    // });

    // popupSubmitedButton = document.querySelector('#popup__submited-button');

    // popupSubmitedButton.addEventListener('click', () => {
    //     document.querySelector('.popup').style.display = 'none';
    //     popupClean();
    // });

    // function popupClean() {
    //     for (var i = 0; i < formItems.length; i++) {
    //         formItems[i].value = '';
    //         if (formItems[i].classList.contains('popup__form-ok')) {
    //             formItems[i].classList.remove('popup__form-ok')
    //         }
    //         if (formItems[i].classList.contains('popup__form-error')) {
    //             formItems[i].classList.remove('popup__form-error')
    //         }
    //         if (formItems[i].classList.contains('popup__form-active')) {
    //             formItems[i].classList.remove('popup__form-active')
    //         }
    //     }

    // }

// }