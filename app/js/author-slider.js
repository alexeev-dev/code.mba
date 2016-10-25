let AuthorSlider = (function($){
  /* Подключаемся к DOM-слайдера */
  let elements = {
    content: $(".author-slider__content"),
    slides: $(".author-slider__item"),
    dots: $(".author-slider__dots")
  }

  let slidesCount = elements.slides.length;

  function makeDot(isFirst = false) {
    let dot = $('<div class="author-slider__dot">');

    if (isFirst) {
      dot.addClass("author-slider__dot_current");
    }

    return dot;
  }

  function slideTo(index) {
    let offset = 0 - index * (100 / slidesCount);
    let {content} = elements;
    content.css("transform", `translateX(${offset}%)`);
  }

  /* Экспортируем модуль из замыкания */
  return {
    init() {
      let contentWidth = 100 * slidesCount;
      let slideWidth = 100 / slidesCount;
      let {content, slides, dots} = elements;
      content.css("width", `${contentWidth}%`);
      slides.css("width", `${slideWidth}%`);

      for (let i = 0; i < slidesCount; i++) {
        if (i === 0) {
          dots.append(makeDot(true));
        } else {
          dots.append(makeDot());
        }
      }

      $(".author-slider__dot").each((index, dot) => {
        $(dot).click((event) => {
          $(".author-slider__dot").removeClass("author-slider__dot_current");
          $(dot).addClass("author-slider__dot_current");
          slideTo(index);
        });
      });
    }
  }
})(jQuery);

export {AuthorSlider};
