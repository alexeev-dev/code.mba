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
 * @param isShadow - отображать ли затенение под всплывающем окном
 */

function initPopup(selector, classes, isShadow) {
  const overlayVisible = 'shadow-overlay--visible';
  let overlay = $('.shadow-overlay');
  let {visible, close} = classes;
  let popup = $(selector);

  function closePopup() {
    overlay.removeClass(overlayVisible);
    popup.removeClass(visible);
    overlay.off('click');
  }

  popup.find(`.${close}`).click((event) => {
    event.preventDefault();
    event.stopPropagation();
    closePopup();
  });

  return function showPopup() {
    popup.addClass(visible);
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
 *    data-options="visible:close:shadow",
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
    let visible, close, isShadow;

    if (typeof optionsString !== 'undefined') {
      [visible, close, isShadow] = optionsString.split(':');
      visible = visible === '' ? 'active' : visible;
      close = close === '' ? 'close' : close;
      shadow = shadow === '' || 'true';
    } else {
      [visible, close, isShadow] = ['visible', 'close', true];
    }

    console.log(visible, close, isShadow);

    return {visible, close, isShadow};
  }

  return function showPopup(popupId) {
    if (typeof genericPopups[popupId] === 'undefined') {
      let options = loadOptions(popupId);
      let {visible, close, isShadow} = options;
      genericPopups[popupId] = initPopup(popupId, {visible, close}, isShadow);
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
  let coursePopups = {};

  let classes = {
    visible: 'active',
    close: 'close'
  };

  $('.price-popup').each((index, self) => {
    let id = $(self).attr('id');
    coursePopups[id] = initPopup(`#${id}`, classes, false);
  });

  function showPopup(courseId) {
    coursePopups[courseId]();
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

  let parentShow = initPopup(popupId, classes, false);

  let path = [1, 2, 3].map((id, index) => Snap(`#svg-modal-path-${index}`));

  $(popupId).find(`.${classes.close}`).click((event) => {
    event.preventDefault();
    overlay.removeClass(overlayVisible);
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
    loadContent(content);
    overlay.addClass(overlayVisible);
    parentShow();
    animateBackground('open');
  }
});
