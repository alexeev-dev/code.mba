export default function initFormUx() {
  let messages = {
    name: 'Пожалуйста укажите своё имя!',
    phone: 'Пожалуйста укажите свой номер телефона!',
    email: 'Пожалуйста укажите Ваш E-mail!',
    other: 'Пожалуйста, заполните это поле!'
  };

  $(window).on('validation-failed', (event, form, failed) => {
    failed.forEach((item, index) => {
      let {name, field} = item;
      let message;

      if (typeof field.data('error') === 'undefined') {
        field.data('error', true);
        message = $('<span>');
        if (typeof messages[name] !== 'undefined') {
          message.text(messages[name]);
        } else {
          message.text(messages[other]);
        }
        field.after(message);
      }

      field.addClass('err').keypress((event) => {
        field.removeClass('err').off('keypress');
      });
    });
  });

  $(window).on('form-sent', (event, form, data) => {
    form.addClass('sent').find('.animate').addClass('active');
    form.find('input, textarea').each((index, item) => {
      $(item).val('');
    });
  });
}
