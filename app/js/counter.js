let Counter = (function($){
  let stepsCount = 300;
  let duration = 1500;
  let currentStep = 0;
  let endValues = [];
  let tickTime = duration / stepsCount;
  let counter = $(".counter-red");
  let numbers = $(".counter-item span");

  function counterTick() {
    numbers.each((index, number) => {
      let value = Math.round(currentStep * endValues[index] / stepsCount);
      $(number).text(value);
    });

    if (++currentStep < stepsCount) {
      setTimeout(counterTick, tickTime);
    }
  }

  return {
    init() {
      numbers.each((index, number) => {
        endValues[index] = parseInt($(number).text());
        $(number).text("0");
      });

      let wp = counter.waypoint((direction) => {
        counterTick();
        wp.destroy();
      }, { offset: "75%" });
    }
  }
})(jQuery);

export {Counter};
