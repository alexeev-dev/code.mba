let Popup = (function($){
  let overlay = $(".popup-overlay");

  class Popup
  {
    constructor(id) {
      let el = $(id);
      this.el = el;
      el.click((event) => {
        event.stopPropagation();
      });
      el.find(".close-popup").click((event) => {
        event.preventDefault();
        this.close();
      });
      overlay.click((event) => {
        this.close();
      });
    }

    show() {
      overlay.addClass("popup-overlay_open");
      this.el.addClass("popup_open");
    }

    close() {
      overlay.removeClass("popup-overlay_open");
      this.el.removeClass("popup_open");
    }
  }

  return Popup;
})(jQuery);

export {Popup};
