import {loadElements} from './utils/elements-loader';

let MainController = {
  /**
   * Перечисляем хуки для выполнения различных действий контроллера
   * Синтаксис: ["хук-класс", "действиеКонтроллера"]
   */
  hooks: [
    ["js-open-search", "openSearch"]
  ],

  el: {
    search: {
      container: ".overlay_search",
      form: ".overlay_search form"
    }
  },

  init() {
    loadElements(this.el);

    this.hooks.forEach((descriptor) => {
      let [hook, action] = descriptor;
      $(`.${hook}`).click((event) => {
        console.log("Hook triggered!");
        this[action]();
      });
    });

    this.initSearch();

  },

  initSearch() {
    let {container, form} = this.el.search;
    container.click($.proxy(this.closeSearch, this));
    form.click((event) => event.stopPropagation());
  },

  openSearch() {
    this.el.search.container.addClass("open");
  },

  closeSearch() {
    this.el.search.container.removeClass("open");
  }

}

MainController.init();
