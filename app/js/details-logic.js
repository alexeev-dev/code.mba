export default function initDetails() {
  const DISABLED = false;
  const ACTIVE = true;
  const NONE = false;

  /* Здесь храним состоянии красной, фиолетовой и зелёной кнопок */
  let buttonStates = [DISABLED, DISABLED, DISABLED];

  let buttons = $('.modules-block li');

  let classNames = [
    'include-intensive',
    'include-lvl_up',
    'include-coaching',
    'include-all'
  ];

  let allClassNames = classNames.join(' ');

  let stateNumber = [1, 3, 2, 4];

  /* Данные для каждого состояния */

  let stateInfo = [
    {
      className: NONE,
      salary: '28<span>000</span>',
      post: '<b>НАПОЛНЕНИЕ САЙТА</b> на подработке',
      term: '<b>2</b>ч. + <b>1</b> неделя',
      button: ['подтвердить участие', '/registred']
    },
    {
      className: 0,
      salary: '64<span>000</span>',
      post: '<b>SENIOR HTML</b>-верстальщик',
      term: '<b>2</b> месяца',
      time: '2',
      button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=14500&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик']
    },
    {
      className: 1,
      salary: '92<span>000</span>',
      post: '<b>MIDDLE FRONT-END</b> разработчик',
      term: '<b>5</b> месяцев',
      time: '5',
      button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=39270&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик+3+месяца+FRONT-END+разработчик']
    },
    {
      className: 2,
      salary: '79<span>000</span>',
      post: '<b>ДИЗАЙНЕР-ВЕРСТАЛЬЩИК</b> сайтов',
      term: '<b>3</b> месяца',
      time: '3',
      button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=27020&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик+1-месяц+Коучинга']
    },
    {
      className: 3,
      salary: '120<span><small>т.</small></span>',
      post: '<b>FULL-STACK</b> разработчик',
      term: '<b>6</b> месяцев',
      time: '6',
      button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=45660&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик+3+месяца+FRONT-END+разработчик+1-месяц+Коучинга']
    }
  ];

  /*
   * Определяет и возвращает порядковый номер состояния,
   * основываясь на комбинациях активных кнопок
   */

  function getStateNumber() {
    let [red, violet, green] = buttonStates;
    let stateIndex = 0;

    if (red === DISABLED) {
      return 0;
    } else {
      stateIndex += violet ? 2 : 0;
      stateIndex += green ? 1 : 0;
      return stateNumber[stateIndex];
    }
  }

  /* Вызывается при изменении состояния: обновляем вьюшку */

  function updateDetails() {
    let state = stateInfo[getStateNumber()];

    buttonStates.forEach((state, index) => {
      let button = buttons.eq(index + 2);
      if (state === DISABLED) {
        button.removeClass('active');
      } else {
        button.addClass('active');
      }
    });

    let className = '';

    if (state.className !== NONE) {
      className = classNames[state.className];
    }

    $('.choose-your-module, .modules-map').removeClass(allClassNames)
    .addClass(className);

    $('.choose-your-module .salary').html(state.salary);
    $('.choose-your-module .post').html(state.post);
    $('.choose-your-module .term').html(state.term);
    $('.choose-your-module .time').html(state.time);
    $('.agreement .submit-button .text').text(state.button[0]);
    $('.agreement .submit-button').attr('href', state.button[1]);
  }

  /* Инициализируем последние три кнопки */
  buttons.each((index, item) => {

    /* Первые три кнопочки пропускаем */

    if (index < 2) {
      return true;
    }

    /*
     * Делаем так, чтобы нумерация начиналась с 0
     * это необходимо для удобной работы с массивом buttonStates
     */

    let id = index - 2;

    $(item).click((event) => {
      console.log(id);
      if (id > 0 && buttonStates[id] === DISABLED) {
        buttonStates[0] = ACTIVE; // Required: первая кнопка обязана быть активной
        buttonStates[id] = ACTIVE;
      } else if (buttonStates[id] === DISABLED) {
        buttonStates[id] = ACTIVE;
      } else if (id === 0) {
        buttonStates[0] = DISABLED;
        buttonStates[1] = DISABLED;
        buttonStates[2] = DISABLED;
      } else {
        buttonStates[id] = DISABLED;
      }
      updateDetails();
    });

  });

  $('.agreement .submit-button').addClass('disabled');
  $('.agreement .checkbox-block').click((event) => {
    $('.agreement .submit-button').toggleClass('disabled');
  });
}
