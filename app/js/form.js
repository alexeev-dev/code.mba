/**
 * Регулярные выражения для валидации форм
 */

let validationRegEx = {
  name: /^.{2,50}$/,
  phone: /^.{2,50}$/,
  email: /^.{2,50}@.{2,50}$/,
  EMAIL: /^.{2,50}@.{2,50}$/
}

/**
 * Валидация значения поля
 * @param {String} value - значение поля ввода
 * @param {RegExp} rgx - регулярное выражения для валидации
 */

function validateField(value, rgx) {
  console.log(value, rgx, rgx.test(value));
  return rgx.test(value);
}

/**
 * Производит валидацию формы
 * @param {Object} fields - jQuery коллекция инпутов
 * @return {Object} result - информация о результатах валидации:
 * result.data - объект с извлечёнными данными из формы
 * result.isValid - (true|false) - успешно ли прошла валидация
 * result.failed - массив из полей, которые не прошли валидацию
 */

function validateInput(fields) {
  let result = {
    data: {},
    isValid: true
  };

  fields.each((index, input) => {
    let field = $(input);
    let name = field.attr('name');
    let isRequired = field.hasClass('js-required');

    if (isRequired && typeof validationRegEx[name] !== 'undefined') {
      if (validateField(field.val(), validationRegEx[name]) === false) {
        result.failed = result.failed || [];
        result.isValid = false;
        result.failed.push({name, field});
        return true; /* Переходим к следующему полю */
      }
    }

    result.data[name] = field.val();
  });

  return result;

}

/**
 * Отправляет данные формы на сервер
 * @param {Object} data - данные из формы
 */

function submitForm(form, data) {
  let url = form.attr('action');

  console.log(form);
  console.log(url);
  
  if (url == 'undefined') {
    url = 'send-request.php';
  }

  console.log(form);
  console.log(url);

  $.post(url, data, (result) => {
    $(window).trigger('form-sent', {form, data});
  });
}

/**
 * Инициализирует форму
 * @param {Object} form - DOM-элемент инициализируемой формы
 */

function initForm(form) {
  let self = $(form);
  let fields = self.find('input, textarea');

  self.on('submit', (event) => {
    let result = validateInput(fields);
    event.preventDefault();
    if (result.isValid === true) {
      submitForm(self, result.data);
      self.addClass('sended');

      if (self.find('button').hasClass('js-big_show')) {

          self.removeClass('sended');
          $('.order-education').addClass('scaled');

          setTimeout(function() {
            $('body').addClass('of-hidden');
            $('.order-education').addClass('scaled_full');

            setTimeout(function() {
              $('.cd-transition-layer').addClass('visible opening');

              var delay = (
                $('.no-cssanimations').length > 0 ) ? 0 : 800;

                setTimeout(function(){
                  $('.cd-modal').addClass('visible');
                  $('.cd-transition-layer').removeClass('opening');
                }, delay
              );

              setTimeout(function() {
                $('.order-education').removeClass('scaled_full');
                $('.order-education').removeClass('scaled');
                $('.order-education form').removeClass('sended');
              }, 1000);

            }, 800);

          }, 2600);

      }

    } else {
      $(window).trigger('validation-failed', [self, result.failed]);
    }
    return false;
  });
}

/**
 * Экспортируем функцию инициализации модуля.
 * Просто вывозите её - и все формы будут готовы к своей работе
 */

export default function initAllForms() {
  $("form").each((index, form) => initForm(form));
}
