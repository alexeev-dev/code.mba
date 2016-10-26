let ReviewsCarousel = (function($){
  let carousel = {
    content: $(".testi-1 .carousel__content"),
    items: $(".testi-1 .carousel-item"),
    dots: $(".testi-1 .carousel-dots")
  }

  let itemsCount = carousel.items.length;

  function slideTo(index) {
    let offset = 0 - index * (100 / itemsCount);
    let {content, items} = carousel;
    content.css("transform", `translateX(${offset}%)`);
    items.addClass("carousel-item--gone");
    items.eq(index).removeClass("carousel-item--gone");
  }

  function newDot(index) {
    let dot = $('<li><a href="#"></a></li>');
    if (index === 0) {
      dot.addClass("active");
    }

    dot.click((event) => {
      event.preventDefault();
      carousel.dots.find("li").removeClass("active");
      $(event.target).parent().addClass("active");
      slideTo(index);
    });

    return dot;
  }

  function makeDots() {
    let {dots} = carousel;
    for (let i = 0; i < itemsCount; i++) {
      dots.append(newDot(i));
    }
  }

  return {
    init() {
      let {content, items} = carousel;
      let contentWidth = 100 * itemsCount;
      let itemsWidth = 100 / itemsCount;
      content.css("width", `${contentWidth}%`);
      items.css("width", `${itemsWidth}%`);
      items.not(":first-child").addClass("carousel-item--gone");
      makeDots();
    }
  }
})(jQuery);

export {ReviewsCarousel};
