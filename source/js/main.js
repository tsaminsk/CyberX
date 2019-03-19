window.onload = function () {

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

    var popupOpen = document.querySelector('#popup_1');
    var popupClouse = document.querySelector('.popup__clouse');

    popupOpen.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.popup').style.display = 'block';
        document.querySelector('.popup__wrap').style.display = 'block';
        document.querySelector('.popup__submited').style.display = 'none';
        document.querySelector('body').addClass = 'modal-open';

    });

    popupClouse.addEventListener('click', () => {
        popupClean();
        document.querySelector('.popup').style.display = 'none';
        document.querySelector('body').removeClass = 'modal-open';

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