export default function initDetails() {
  const DISABLED = false;
  const ACTIVE = true;

  /* Здесь храним состоянии красной, фиолетовой и зелёной кнопок */
  let buttonStates = [DISABLED, DISABLED, DISABLED];

  let buttons = $('.modules-block li');

  /* Данные для каждого состояния */
  let stateInfo = [
    {
      className: 'include-intensive',
      salary: '62<span>000</span>',
      post: '<b>MIDDLE FRONT-END</b> разработчик',
      price: 'скидка <span><b>50%</b></span> при оплате 6<small>-мес</small><br><em class="closed">76 100</em><em>38 050</em>',
      term: '<b>6</b>мес'
    }
  ]

  /* Вызывается при изменении состояния: обновляем вьюшку */
  function updateDetails() {
    buttonStates.forEach((state, index) => {
      let button = buttons.eq(index + 3);
      if (state === DISABLED) {
        button.removeClass('active');
      } else {
        button.addClass('active');
      }
    });
  }

  /* Инициализируем последние три кнопки */
  buttons.each((index, item) => {

    /* Первые три кнопочки пропускаем */
    if (index < 3) {
      return true;
    }

    /*
     * Делаем так, чтобы нумерация начиналась с 0
     * это необходимо для удобной работы с массивом buttonStates
     */
    let id = index - 3;

    $(item).click((event) => {
      if (id > 0 && buttonStates[id] === DISABLED) {
        buttonStates[0] = ACTIVE; // Required: первая кнопка обязана быть активной
        buttonStates[id] = ACTIVE;
      } else if (buttonStates[id] === DISABLED) {
        buttonStates[id] = ACTIVE;
      } else {
        buttonStates[id] = DISABLED;
      }
      updateDetails();
    });

  });
}
