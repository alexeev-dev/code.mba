let Popup = (function($){
  
  class Popup {
    
    constructor(id) {

      let el = $(id);

      this.el = el;
      this.overlay = $('.overlay');
      this.btnTarget = $('a[href="' + id + '"]');
      
      el.click((event) => {
        event.stopPropagation();
      });
      el.find(".close").click((event) => {
        event.preventDefault();
        this.close();
      });
      this.overlay.click((event) => {
        this.close();
      });

      // if (el.hasClass('slide')) {
      //     el.detach().insertAfter(this.btnTarget);
      // }
    }

    show() {
      this.el.addClass('active');

      this.overlay.addClass('active');

      svgPopup(open);

      // this.btnTarget.addClass('hidden');

      // return false;
    }

    close() {
      this.el.removeClass('active');
    
      this.btnTarget.removeClass('hidden');

      this.overlay.removeClass('active');

      // svgPopup(close, this.el);
    

      return false;
    }
  }

  return Popup;
})(jQuery);

export {Popup};



/* ------------------- */
/* ----- HELPERS ----- */
/* ------------------- */
let svgPopup = (state)=> {

  /*
    convert a cubic bezier value to a custom mina easing
    http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
  */
  let duration = 600;
  let epsilon = (1000 / 60 / duration) / 4;
  let firstCustomMinaAnimation = bezier(.63,.35,.48,.92, epsilon);

  let svgCoverLayer = $('#lessons-base').children('.svg-bg');
  let paths = svgCoverLayer.find('path');

  //store Snap objects
  let pathsArray = [];
      pathsArray[0] = Snap('#'+paths.eq(0).attr('id')),
      pathsArray[1] = Snap('#'+paths.eq(1).attr('id')),
      pathsArray[2] = Snap('#'+paths.eq(2).attr('id'));

  //store path 'd' attribute values 
  let pathSteps = [];
      pathSteps[0] = svgCoverLayer.data('step1');
      pathSteps[1] = svgCoverLayer.data('step2');
      pathSteps[2] = svgCoverLayer.data('step3');
      pathSteps[3] = svgCoverLayer.data('step4');
      pathSteps[4] = svgCoverLayer.data('step5');
      pathSteps[5] = svgCoverLayer.data('step6');


  // CALL OUR ANIMAYON HERE
  animatePopup(paths, pathSteps, duration, state);

}


// animate SVG
function animatePopup(paths, pathSteps, duration, state) {
    let path1 = ( state == 'open' ) ? pathSteps[1] : pathSteps[0]; // pathSteps[n] = $('.svg-bg').data('step'+(n+1));
    let path2 = ( state == 'open' ) ? pathSteps[3] : pathSteps[2];
    let path3 = ( state == 'open' ) ? pathSteps[5] : pathSteps[4];
    
    paths[0].animate({'d': path1}, duration, firstCustomMinaAnimation); //paths[0] = Snap('#cd-changing-path-1')
    paths[1].animate({'d': path2}, duration, firstCustomMinaAnimation); //paths[1] = Snap('#cd-changing-path-2')
    paths[2].animate({'d': path3}, duration, firstCustomMinaAnimation); //paths[2] = Snap('#cd-changing-path-3')
}

// bezier CODE
function bezier(x1, y1, x2, y2, epsilon) {
    //https://github.com/arian/cubic-bezier
    let curveX = (t)=> {
      let v = 1 - t;
      return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
    };

    let curveY = (t)=> {
      let v = 1 - t;
      return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
    };

    let derivativeCurveX = (t)=> {
      let v = 1 - t;
      return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
    };

    return (t)=> {

      let x = t, t0, t1, t2, x2, d2, i;

      // First try a few iterations of Newton's method -- normally very fast.
      for (t2 = x, i = 0; i < 8; i++){
        x2 = curveX(t2) - x;
        if (Math.abs(x2) < epsilon) return curveY(t2);
        d2 = derivativeCurveX(t2);
        if (Math.abs(d2) < 1e-6) break;
        t2 = t2 - x2 / d2;
      }

      t0 = 0, t1 = 1, t2 = x;

      if (t2 < t0) return curveY(t0);
      if (t2 > t1) return curveY(t1);

      // Fallback to the bisection method for reliability.
      while (t0 < t1){
        x2 = curveX(t2);
        if (Math.abs(x2 - x) < epsilon) return curveY(t2);
        if (x > x2) t0 = t2;
        else t1 = t2;
        t2 = (t1 - t0) * .5 + t0;
      }

      // Failure
      return curveY(t2);
    };
};








