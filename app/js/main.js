import {loadElements} from './utils/elements-loader';
import {MobileMenu} from './mobile-menu';
import {DonutChart} from './donut-chart';
import {AuthorSlider} from './author-slider';
import AnimateParticle from './animate-particle';
import SvgPopups from './svg-popups';
import {ReviewsCarousel} from './reviews-carousel';
import {Counter} from './counter';
import {Popup} from './popup';
import {Form} from './form';

let MainController = {
  /**
   * Перечисляем хуки для выполнения различных действий контроллера
   * Синтаксис: ["хук-класс", "действиеКонтроллера"]
   */
  hooks: [
    ["js-open-search", "openSearch"],
    ["mobile-menu", "triggerMenu"],
    //["js-open-popup", "openPopup"],
    ["js-select-product", "selectProduct"]
  ],

  modules: {
    AnimateParticle,
    SvgPopups
  },

  el: {
    search: {
      container: ".overlay_search",
      form: ".overlay_search form"
    },
    icons: {
      seo: ".header-search .seoicon-text-paper"
    },
    tabs: {
      tabs: ".description-tab_control li",
      items: ".tab-item"
    },
    signInPopup: "#sign-in-popup"
  },

  isMenuOpen: false,

  init() {
    //MobileMenu.init();
    Form.init();
    Counter.init();
    DonutChart.init();
    AuthorSlider.init();
    ReviewsCarousel.init();

    for (let module in this.modules) {
      this.modules[module]();
    }

    loadElements(this.el);

    this.hooks.forEach((descriptor) => {
      let [hook, action] = descriptor;
      $(`.${hook}`).click((event) => {
        this[action](event);
      });
    });

    this.initSearch();
    this.initTabs();

  },

  initSearch() {
    let {container, form} = this.el.search;
    container.click($.proxy(this.closeSearch, this));
    form.click((event) => event.stopPropagation());
  },

  initTabs() {
    let {tabs, items} = this.el.tabs;
    tabs.click((event) => {
      let target = $(event.target);
      let tab = target.parent();
      event.preventDefault();
      tabs.removeClass("active");
      tab.addClass("active");
      items.css("display", "none");
      $(target.attr("href")).css("display", "block");
    });
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
  },

  // openPopup(event) {
  //   let popupId = $(event.target).attr("href");
  //   let popup = new Popup(popupId);
  //   event.preventDefault();
  //   popup.show();
  // },

  selectProduct(event) {
    let product = $(event.target).attr("data-id");
    this.el.signInPopup.find("input[name=source]").val(`sign-in-${product}`);
  }

}

MainController.init();
