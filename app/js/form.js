let Form = (function($) {

  let messages = {
    name: "Пожалуйста, введите Ваше имя!",
    phone: "Пожалуйста, введите Ваш номер телефона!",
    email: "Пожалуйста, введите Ваш E-mail"
  }

  /* Считываем данные из формы */
  function readInput(form) {
    let data = [];

    $(form).find("input, textarea").each((index, field) => {
      let input = $(field);
      let value = input.val();
      let type = input.attr("name");
      let isRequired = input.attr("required") === "required";
      data.push({value, type, isRequired});
    });

    return data;
  }

  /* Показываем сообщение об ошибке */
  function showErrorMessage(type) {
    alert(messages[type]);
  }

  /* Валидация введённых данных */
  function validateInput(input) {
    let data = {};

    input.forEach((field) => {
      if (field.isRequired && field.value.length === 0) {
        showErrorMessage(field.type);
        return false;
      }
      data[field.type] = field.value;
    });

    return data;
  }

  /* Отправляем заявку на сервер */
  function submitForm(event) {
    let input = readInput(event.target);
    let result = validateInput(input);

    if (result === false) {
      return false;
    }

    $.post("send-request.php", result, (data) => {
      $(window).trigger("form-sent", data);
    }).fail(() => {
      $(window).trigger("sent-fail");
    });

    return false;
  }

  return {
    init() {
      let forms = $("form");
      forms.each((index, form) => {
        $(form).submit(submitForm);
      });
    }
  }

})(jQuery);

export {Form};
