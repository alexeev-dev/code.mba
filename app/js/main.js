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
    searchForm: ".overlay_search"
  },

  searchForm: {
    state: {
      open: "open"
    }
  },

  init() {
    this.hooks.forEach((descriptor) => {
      let [hook, action] = descriptor;
      $(`.${hook}`).click((event) => {
        this[action]();
      });
    });
  },

  openSearch() {

  }

}

MainController.init();
