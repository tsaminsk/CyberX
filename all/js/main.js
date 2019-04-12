window.onload = function () {


    // калькулятор прибыли
    // $('.js-calculator').find('input').on('change', function (event) {
    //     var pc = $('#calc-game-pk')[0].checked ? $('#calc-pc').val() * 35000 : 0;
    //     var syties = $('#calc-syties').val() > 500000 ? 300000 : 250000;
    //     var food = $('#calc-food')[0].checked ? 136000 : 0;
    //     var hook = $('#calc-hookah')[0].checked ? 300000 : 0;
    //     var summ = (pc - syties + food + hook) > 0 ? (pc - syties + food + hook) : 0;
    //     $('.js-calculator').find('.calculator__result-month p span').html(String(summ).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    //     $('.js-calculator').find('.calculator__result-year p span').html(String(summ * 12).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    // });

    // больше клубов - ссылка на сайт, котрого еще нет
    $('.js-clubs').on('click', function () {
        alert('Извините, пока недоступно');
    })

    // video
    $('.js-play').on('click', e => {
        e.preventDefault();
        $('.js-video-wrapper').addClass('is-active');
        // и само видео запустим
        $('.js-video-wrapper').find('video')[0].play();
    });

    $('.js-video-items').find('a.twelfth__item').on('click', function (event) {
        event.preventDefault();
        let datas = {};
        if (event.target.tagName == 'A') {
            datas.address = $(event.target).find('span').html();
            datas.src = $(event.target).data('video')
        }
        else if (event.target.tagName == 'SPAN') {
            datas.address = $(event.target).html();
            datas.src = $(event.target).parent('a').data('video')
        }
        else if (event.target.tagName == 'IMG') {
            datas.address = $(event.target).next().html();
            datas.src = $(event.target).parent('a').data('video')
        }
        
        $('.js-video-wrapper').find('video > source').attr('src', datas.src);
        $('.js-video-wrapper').find('video')[0].load();
        $('.thirteenth__player-address span').html(datas.address);
        $('.js-video-wrapper').addClass('is-active');
        // и само видео запустим
        $('.js-video-wrapper').find('video')[0].play();
    })

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
    var links = $('.js-menu').find('.nav__menu').find('li');
    for ( let k = 0; k < links.length; k++) {
        links[k].addEventListener('click', function (event) {
            event.preventDefault();
            // активный пункт меню
            // setMenuLinkActive(k);

            // скролл к выбранному
            var id = $(this).find('a').attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({ scrollTop: top }, 1500);
        });
    }

    var classesNav = [
        [null, 'nav__mouse-red'],
        ['nav__dark', 'nav__mouse-red'],
        ['nav__dark', 'nav__mouse-red'],
        ['nav__dark', 'nav__mouse-red'],
        [null, 'nav__mouse-white'],
        ['nav__dark', 'nav__mouse-red'],
        ['nav__dark', 'nav__mouse-red'],
        [null, 'nav__mouse-white'],
        ['nav__dark', 'nav__mouse-red'],
        ['nav__dark', 'nav__mouse-red'],
        [null, 'nav__mouse-white'],
        ['nav__dark', 'nav__mouse-red'],
        [null, 'nav__mouse-white'],
        [null, 'nav__mouse-red']
    ];
    
    function setMenuLinkActive() {
        let x = $('body').outerHeight() / 14;
        let y = $(window).scrollTop();
        // console.log(Math.floor(y/x + 1));
        num = Math.floor(y * 1.05 / x);

        for (let i = 0; i < links.length; i++) {
            if ($(links[i]).hasClass('is-active')) {
                $(links[i]).removeClass('is-active')
            }
            let op = 1 - Math.abs(num - i) * 0.070;
            $(links[i]).css('opacity', op);
        }
        $(links[num]).addClass('is-active');

        if (classesNav[num][0] === null ) {
            $('.js-menu').removeClass('nav__dark');
        }
        else if (classesNav[num][0] === 'nav__dark') {
            $('.js-menu').addClass('nav__dark');
        }

        if (classesNav[num][1] === 'nav__mouse-red') {
            $('.js-menu').removeClass('nav__mouse-white');
            $('.js-menu').addClass('nav__mouse-red');
        }
        else if (classesNav[num][1] === 'nav__mouse-white') {
            $('.js-menu').removeClass('nav__mouse-red');
            $('.js-menu').addClass('nav__mouse-white');
        }
    }

    setMenuLinkActive();

    // плавный скролл от кнопки далее
    $('.js-link').on('click', function () {
        event.preventDefault();
        var top = $('#elem-14').offset().top;
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
        
        setMenuLinkActive();
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

    // валидация форм
    var formData = ['^[А-ЯA-Z][а-яёa-z]', '[0-9]{6,15}', '^[a-zA-Z-.]+@[a-z]+\.[a-z]{2,3}$']; //патерны для валидации name phone email соответственно
    var formSubmit = document.querySelector('#popup__submited-button');
    var formItems = [];

    Array.prototype.forEach.call(document.querySelector('.popup__form').children, function (elem, i) {
        if (elem.tagName == 'INPUT') {
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

        let pattern = new RegExp(formData[i]);

        formItems[i].addEventListener('change', function () {            
            if ((pattern).test(this.value)) {
                if (this.classList.contains('popup__form-error')) {
                    this.classList.remove('popup__form-error');
                }
                else if (this.classList.contains('popup__form-active')) {
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
        if (count == 3) {
            formSubmit.removeAttribute('disabled');
        }
    }

    // отправка сообщения
    formSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        // ето передать на сервер и на почту
        $.ajax({
            type: "POST",
            url: "order.php",
            data: { name: $(formItems[0]).val(), phone: $(formItems[1]).val(), email: $(formItems[2]).val(), text: $('.popup__title').html() }
        }).done(function () {
            $(this).find("input").val("");
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            document.querySelector('.popup__wrap').style.display = 'none';
            document.querySelector('.popup__submited').style.display = 'block';
        });
        return false;
    });
    
    // кнопка закрыть в попап "ваше сообщение отправленно"
    $('#js-submited-close').on('click', function () {
        popupClean();
        document.querySelector('.popup').style.display = 'none';
    });

    var popupOpen5 = document.querySelector('#popup_5'); // попап заказать фин модель
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

    popupOpen5.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.popup__title').innerHTML = 'Получить документы<br>по расчету прибыли';
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup__wrap').style.display = 'block';
        document.querySelector('.popup__submited').style.display = 'none';
        document.querySelector('#popup__submited-button').innerHTML = '<span>Получить документы</span>';
    });

    popupClouse.addEventListener('click', () => {
        popupClean();
        document.querySelector('.popup').style.display = 'none';
        document.querySelector('body').classList.remove('modal-open');
    });

    popupSubmitedButton = document.querySelector('#popup__submited-button');

    popupSubmitedButton.addEventListener('click', () => {
        // document.querySelector('.popup').style.display = 'none';
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
        formSubmit.setAttribute('disabled', 'disabled');
    }

    // валидация и отправка заявки
    var forms = $('.js-form').find('input'); // массив инпутов основной формы
    for (let i = 0; i < forms.length; i++){
        forms[i].addEventListener('input', function () {
            if (this.classList.contains('popup__form-ok')) {
                this.classList.remove('popup__form-ok');
            }
            this.classList.add('popup__form-active');
        });
        let pattern = new RegExp(formData[i]);
        forms[i].addEventListener('change', function () {
            if ((pattern).test(this.value)) {
                if (this.classList.contains('popup__form-error')) {
                    this.classList.remove('popup__form-error');
                }
                else if (this.classList.contains('popup__form-active')) {
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
            checkSubmitForm();
        });
    }

    $('.js-form').submit(function () {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "request.php",
            data: { name: $(forms[0]).val(), phone: $(forms[1]).val(), email: $(forms[2]).val(), sity: $(forms[3]).val() }
        }).done(function () {
            $(this).find("input").val("");
            $('.fifteenth__form-inner').html('<div class="fifteenth__form-title">Ваша заявка отправленна!<br>мы скоро с вами свяжемся.</div><img src="/images/first/logo.png">')
            // alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            $("#form").trigger("reset");
        });
        return false;
    });

    function checkSubmitForm() {
        let count = 0;
        for (var i = 1; i < forms.length - 1; i++) {
            if (forms[i].classList.contains('popup__form-ok')) {
                count++;
            }
        }
        if (count >= 2) {
            $('.js-forms-submit').removeAttr("disabled");
        }
    }   
}