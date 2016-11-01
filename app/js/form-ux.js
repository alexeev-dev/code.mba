export default function initFormUx() {
  let messages = {
    name: 'Не верно указано имя!',
    phone: 'Не верно указан номер телефона!',
    email: 'Не верно указан E-mail!',
    other: 'Пожалуйста, заполните это поле!'
  };

  $(window).on('validation-failed', (event, form, failed) => {
    failed.forEach((item, index) => {
      let {name, field} = item;
      let message;

      if (typeof field.data('error') === 'undefined') {
        field.data('error', true);
        message = $('<span class="err">');
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

  // $(window).on('form-sent', (event, form, data) => {
  //   form.addClass('sent').find('.animate').addClass('active');
  //   form.find('input, textarea').each((index, item) => {
  //     $(item).val('');
  //   });
  // });
}
