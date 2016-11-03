/**
 * Модуль Popups.js - здесь находятится весь код всплывающих окон
 * Так как всплывающие окна бывают разных типов, предусмотрена унифицированная
 * система доступа к ним - функция showPopup(). Она позволяет показывать
 * любое зарегистрированное в этом модуле всплывающее окно. Достаточно просто
 * передать имя окна и (опционально) пользовательские данные.
 * Модуль состоит из последовательной регистрации замыканий, в которых находится
 * код каждого отдельно взятого окна.
 */

import SvgModal from './svg-modal.json';
import bezier from './utils/bezier';

/**
 * Хэш, в котором будут регистрироваться всплывающие окна
 */

let popups = {};

/**
 * Вспомогательная функция - выполняет регистрацию всплывающего окна
 */

function registerPopup(popupName, popupClosure) {
  popups[popupName] = popupClosure();
}

/**
 * Показывает нужное нам всплывающее окно
 * @param name - имя всплывающего окна (определяется при его регистрации)
 * @param options - дополнительные опции, которые могут быть необязательны, а
 * могут и использоваться разными способами. Всё зависит от типа попапа
 */

export default function showPopup(name, options) {
  if (typeof popups[name] !== 'undefined') {
    popups[name](options);
  } else {
    console.log(`Ошибка при вызове функции showPopup:
    Попап с именем "${name}" не зарегистрирован!
    Пожалуйста убедитесь, что правильно указали
    имя всплывающего окна. Оно может отличаться от его id
    или имени класса. Возможно попап с данным именем ещё
    не был создан и зарегистрирован. Почитайте документацию
    к модулю app/js/popups.js для более подробной информации.`);
  }
}

/**
 * Вспомогательная функция-замыкание, для создания всплывающих окон
 * Подключает обработчики событий, создаёт функционал для стандартного
 * отображения всплывающего окна.
 * @param selector - id или класс всплывающего окна в разметке
 * @param classes - хэш с именами классов для стейта visible и селектор
 * для элемента закрывающего попап
 * @param animation – хэш с именами классов для анимации попапав
 * @param isShadow - отображать ли затенение под всплывающем окном
 */

function initPopup(selector, classes, animation, isShadow) {
  const overlayVisible = 'shadow-overlay--visible';
  let target = $('[data-options$="'+selector+'"]');
  let overlay = $('.shadow-overlay');
  let popup = $(selector);
  let {visible, close} = classes;
  let {aminationIn, aminationOut} = animation;
  let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  
  function closePopup() {
    overlay.removeClass(overlayVisible);
    popup.addClass(aminationOut).one(animationEnd, function() {
      $(this).removeClass(aminationOut);
      $(this).removeClass(visible);
    });
    overlay.off('click'); // зачем тут .off если .on у тебя нигде не используется? в коде ты исполуешь .click()
    target.removeClass('hideIt');
    popup.find('form').removeClass('sended');
    return false; // вместо твоего .off()
  }

  popup.find(`.${close}`).click((event) => {
    event.preventDefault();
    event.stopPropagation();
    closePopup();
    $('body').removeClass('of-hidden');
  });

  return function showPopup() {
    target.addClass('hideIt');
    popup.addClass(visible);
    popup.addClass(aminationIn).one(animationEnd, function() {
      $(this).removeClass(aminationIn);
    });
    if (isShadow) {
      overlay.addClass(overlayVisible);
      overlay.click((event) => {
        closePopup();
      });
    }
  }
}

/**
 * Универсальное всплывающее окно. Подходит для простых окон.
 * Данный попап очень легко использовать. Для этого сделайте следующее:
 * 1) Создайте разметку всплывающего окна
 * 2) При помощи CSS сделайте его оформление. Пропишите стили для скрытого
 *    и видимого состояния. Там же можно прописать анимации
 * 3) Добавьте к всплывающему окну опции, использую html5 аттрибут
 *    data-options. Синтаксис опций следующий:
 *    data-options="visible:close:aminationIn:aminationOut:shadow",
 *    где visible - класс добавляемый при открытии окна,
 *    close - имя класса элемента, при клике на который вы хотите чтобы
 *    закрывалось окно, shadow - принимает значения true или false,
 *    true - если вы хотите чтобы происходило затемнения экрана
 *    false - если вы этого не желаете.
 * 4) Добавьте класс js-show-popup к тем элементам, при клике на которые
 *    вы хотите, чтобы открывался ваш попап. А затем к этим же элементам
 *    добавьте аттрибут data-options="generic:#idВашегоПопапа", не забывая
 *    указывать id нужного попапа.
 * Вот собственно и всё. Удачи!!!
 */

registerPopup('generic', function () {
  let genericPopups = {};

  function loadOptions(popupId) {
    let optionsString = $(popupId).data('options');
    let visible, close, aminationIn, aminationOut, isShadow;

    if (typeof optionsString !== 'undefined') {
      [visible, close, aminationIn, aminationOut, isShadow] = optionsString.split(':');
      visible = visible === '' ? 'active' : visible;
      close = close === '' ? 'close' : close;
      aminationIn = aminationIn === '' ? 'fadeIn' : aminationIn;
      aminationOut = aminationOut === '' ? 'fadeOut' : aminationOut;
      isShadow = isShadow === '' || 'true';
    } else {
      [visible, close, aminationIn, aminationOut, isShadow] = ['visible', 'close', 'fadeIn', 'fadeOut', true];
    }

    return {visible, close, aminationIn, aminationOut, isShadow};
  }

  return function showPopup([popupId]) {
    if (typeof genericPopups[popupId] === 'undefined') {
      let options = loadOptions(popupId);
      let {visible, close, aminationIn, aminationOut, isShadow} = options;
      genericPopups[popupId] = initPopup(popupId, {visible, close}, {aminationIn, aminationOut}, isShadow);
    }
    genericPopups[popupId]();
  }
});

/**
 * Всплывающее окно для записи на курсы.
 * Инструкция к использованию:
 * showPopup('price', 'popupId');
 * Вместо 'popupId' - написать id попапа без знака "#"
 */

registerPopup('price', function() {
  let pricePopups = {};

  let classes = {
    visible: 'active',
    close: 'close'
  };

  let animation = {
    aminationIn: '',
    aminationOut: ''
  };

  $('.price-popup').each((index, self) => {
    let id = $(self).attr('id');
    pricePopups[`#${id}`] = initPopup(`#${id}`, classes, animation, false);
  });

  function showPopup([priceId]) {
    pricePopups[priceId]();
  }

  return showPopup;
});


/**
 * Всплывающее окно с SVG-анимациями на основе библиотеки
 * Snap.svg (http://snapsvg.io)
 */

registerPopup('svg', function() {
  const duration = 600;
  const popupId = '#svg-modal';
  const overlayVisible = 'active';
  const overlay = $('.svg-modal__overlay');
  const epsilon = (1000 / 60 / duration) / 4;
  const easing = bezier(0.63, 0.35, 0.48, 0.92, epsilon);

  let classes = {
    visible: 'svg-modal_visible',
    close: 'svg-modal__close'
  };

  let animation = {
    aminationIn: '',
    aminationOut: ''
  };

  let parentShow = initPopup(popupId, classes, animation, false);

  let path = [1, 2, 3].map((id, index) => Snap(`#svg-modal-path-${index}`));

  $(popupId).find(`.${classes.close}`).click((event) => {
    event.preventDefault();
    overlay.removeClass(overlayVisible);
    $(popupId).removeClass(classes.visible);
    animateBackground('close');
  });

  function loadContent([content]) {
    $('.svg-modal__content').hide();
    $(content).show();
  }

  function animateBackground(direction) {
    let {open, close} = SvgModal.animation;
    let animation = direction === 'open' ? open : close;
    path.forEach((path, index) => {
      path.animate({d:animation}, duration, easing);
    });
  }

  return function showPopup(content) {
    $('body').addClass('of-hidden');
    loadContent(content);
    overlay.addClass(overlayVisible);
    parentShow();
    animateBackground('open');
  }
});
