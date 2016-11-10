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
      salary: '62<span>000</span>',
      post: '<b>MIDDLE FRONT-END</b> разработчик',
      term: '<b>6</b>мес',
      button: ['подтвердить участие', '/path/to/action#1']
    },
    {
      className: 0,
      salary: '62<span>001</span>',
      post: '<b>MIDDLE FRONT-END 1</b> разработчик',
      term: '<b>61</b>мес',
      button: ['оплатить участие', '/path/to/action#2']
    },
    {
      className: 1,
      salary: '62<span>002</span>',
      post: '<b>MIDDLE FRONT-END 2</b> разработчик',
      term: '<b>62</b>мес',
      button: ['оплатить участие', '/path/to/action#3']
    },
    {
      className: 2,
      salary: '62<span>003</span>',
      post: '<b>MIDDLE FRONT-END 3</b> разработчик',
      term: '<b>63</b>мес',
      button: ['оплатить участие', '/path/to/action#4']
    },
    {
      className: 3,
      salary: '62<span>004</span>',
      post: '<b>MIDDLE FRONT-END 4</b> разработчик',
      term: '<b>64</b>мес',
      button: ['оплатить участие', '/path/to/action#5']
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
