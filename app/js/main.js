import {loadElements} from './utils/elements-loader';
import {MobileMenu} from './mobile-menu';
import {DonutChart} from './donut-chart';

let MainController = {
  /**
   * Перечисляем хуки для выполнения различных действий контроллера
   * Синтаксис: ["хук-класс", "действиеКонтроллера"]
   */
  hooks: [
    ["js-open-search", "openSearch"],
    ["mobile-menu", "triggerMenu"]
  ],

  el: {
    search: {
      container: ".overlay_search",
      form: ".overlay_search form"
    },
    icons: {
      seo: ".header-search .seoicon-text-paper"
    }
  },

  isMenuOpen: false,

  init() {
    MobileMenu.init();
    DonutChart.init();
    loadElements(this.el);

    this.hooks.forEach((descriptor) => {
      let [hook, action] = descriptor;
      $(`.${hook}`).click((event) => {
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
  },

  triggerMenu() {
    if (this.isMenuOpen) {
      MobileMenu.animateOpen();
      this.isMenuOpen = false;
    } else {
      MobileMenu.animateClose();
      this.isMenuOpen = true;
    }
  }

}

MainController.init();
