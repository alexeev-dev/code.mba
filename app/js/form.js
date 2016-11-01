/**
 * Регулярные выражения для валидации форм
 */

let validationRegEx = {
  // name: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
  // phone: /^( +)?((\+?7|8) ?)?((\(\d{3}\))|(\d{3}))?( )?(\d{3}[\- ]?\d{2}[\- ]?\d{2})( +)?$/,
  // email: /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/
}

/**
 * Валидация значения поля
 * @param {String} value - значение поля ввода
 * @param {RegExp} rgx - регулярное выражения для валидации
 */

function validateField(value, rgx) {
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
  $.post('send-request.php', data, (result) => {
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
