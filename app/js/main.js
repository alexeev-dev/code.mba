import {loadElements} from './utils/elements-loader';
import {MobileMenu} from './mobile-menu';
import {DonutChart} from './donut-chart';
import {AuthorSlider} from './author-slider';
import AnimateParticle from './animate-particle';
import SvgPopups from './svg-popups';
import {ReviewsCarousel} from './reviews-carousel';
import {Counter} from './counter';
import showPopup from './popup';
import {Form} from './form';

let MainController = {
  /**
   * Перечисляем хуки для выполнения различных действий контроллера
   * Синтаксис: ["хук-класс", "действиеКонтроллера"]
   */
  hooks: [
    ["js-open-search", "openSearch"],
    ["mobile-menu", "triggerMenu"],
    ["js-show-popup", "openPopup"],
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
    this.movePopups();
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
    // this.initNolbAnimation();
    this.animateAd();
    this.animateAd1();
    this.animateAcc();
    this.animateOrder();

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

  movePopups() {
    $('.js-show-popup').each((index, trigger) => {
      let target = $(trigger);
      let params = target.data('options');

      if (typeof params === 'undefined') {
        return true;
      }

      let [name, popupId] = params.split(':');
      let options = $(popupId).data('options');
      let isNomadic = false;
      if (typeof options !== 'undefined') {
        [,,,,,isNomadic] = options.split(':');
      }
      if (isNomadic === 'true') {
        $(popupId).insertAfter(target);
      }
    });
  },

  openPopup(event) {
    event.preventDefault();
    let params = $(event.target).data('options');
    let [name, ...options] = params.split(':');
    showPopup(name, options);
  },

  selectProduct(event) {
    let product = $(event.target).attr("data-id");
    this.el.signInPopup.find("input[name=source]").val(`sign-in-${product}`);
  },
  
  // initNolbAnimation() {
    
  //   function cssPrefix(propertie) {

  //     let cssPrefixString = {};
      
  //     if (cssPrefixString[propertie] || cssPrefixString[propertie] === '') return cssPrefixString[propertie] + propertie;
  //     let e = document.createElement('div');
  //     let prefixes = ['', 'Moz', 'Webkit', 'O', 'ms', 'Khtml']; // Various supports...
      
  //     for (let i in prefixes) {
  //       if (typeof e.style[prefixes[i] + propertie] !== 'undefined') {
  //           cssPrefixString[propertie] = prefixes[i];
  //           return prefixes[i] + propertie;
  //       }
  //     }
  //     return false;
  //   }

  //   let scaleX = 1.05;
  //   let scaleY = 0.95;

  //   let moveX = 10;
  //   let moveY = -10;

  //   let depthX = 0.0005;
  //   let depthY = -0.0005;

  //   let mode = 10;

  //   let rotateZ = 0.17;
  //   let rotateZone = -rotateZ;

  //   let rotateX = 0.34;
  //   let rotateXone = -rotateX;

  //   let rotateY = 0.17
  //   let rotateYone = -rotateY;
    

  //   let cssTransform = cssPrefix('Transform'); // "MozTransform" or "WebkitTransform"
  //   if (cssTransform) {
  //     let cssProp = {};

  //     $('.svg-modal__content section').each(function() {
  //         let myMatrix = [scaleX, rotateZ, rotateY, depthY, rotateZone, scaleY, rotateX, depthX, rotateYone, rotateXone, moveX, moveY, mode, 1].toString();
  //         cssProp[cssPrefix('Transform')] = 'matrix3d('+myMatrix+')';
  //         console.log(myMatrix);
  //         $(this).css(cssProp);
  //     });
  //   }
  // }

  animateAd() {
    $('.it_education-advantages section').hover(
      function() {
        $('.it_education-advantages section').removeClass('hideMe').addClass('hideMe');
        $(this).removeClass('hideMe').addClass('showMe');
      }, function() {
        $('.it_education-advantages section').removeClass('hideMe').removeClass('showMe');
    });
  },

  animateAd1() {
    $('.faq-questions li').hover(
      function() {
        $('.faq-questions li').removeClass('hideMe').addClass('hideMe');
        $(this).removeClass('hideMe').addClass('showMe');
      }, function() {
        $('.faq-questions li').removeClass('hideMe').removeClass('showMe');
    });
  },

  animateAcc() {
    $('.faq-questions li a').click(function() {
      $(this).parent('li').toggleClass('active');
      return false;
    });
  },

  animateOrder() {
    $('.order-education input').focus(function() {
      $('.order-education form').addClass('active');
    });
    $('.order-education input').blur(function() {
      $('.order-education form').removeClass('active');
    });
  }

}

MainController.init();
