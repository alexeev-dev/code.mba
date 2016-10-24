function inAC(s) {
  s.draw('80% - 240', '80%', 0.3, {
    delay: 0.1,
    callback: function () {
      inAC2(s)
    }
  });
}

function inAC2(s) {
    s.draw('100% - 545', '100% - 305', 0.6, {
        easing: d3.easeElasticOut
        //easing: ease.ease('elastic-out', 1, 0.3)
    });
}

function inB(s) {
    s.draw(80 - 60, 320 + 60, 0.1, {
        callback: function () {
            inB2(s)
        }
    });
}

function inB2(s) {
    s.draw(80 + 120, 320 - 120, 0.3, {
        easing: d3.easeBounceOut
        //easing: ease.ease('bounce-out', 1, 0.3)
    });
}

function outAC(s) {
    s.draw('90% - 240', '90%', 0.1, {
        easing: d3.easeElasticIn,
        callback: function () {
            outAC2(s)
        }
    });
}

function outAC2(s) {
    s.draw('20% - 240', '20%', 0.3, {
        callback: function () {
            outAC3(s)
        }
    });
}

function outAC3(s) {
    s.draw(80, 320, 0.7, {
        easing: d3.easeElasticOut
    });
}

function outB(s) {
    s.draw(80, 320, 0.7, {
        delay: 0.1,
        easing: d3.easeElasticOut
    });
}

let MobileMenu = {
  offcut: [80, 320],
  icon: ['pathD', 'pathE', 'pathF'],
  segments: [],

  init() {
    this.createSegments();
  },

  createSegments() {
    this.icon.forEach((icon) => {
      let path = document.getElementById(icon);
      let [start, end] = this.offcut;
      this.segments.push(new Segment(path, start, end));
    });
  },

  animate(anim) {
    let segments = this.segments;
    segments.forEach((segment, index) => anim[index](segment));
  },

  animateClose() {
    this.animate([inAC, inB, inAC]);
  },

  animateOpen() {
    this.animate([outAC, outB, outAC]);
  }
}

export {MobileMenu};
