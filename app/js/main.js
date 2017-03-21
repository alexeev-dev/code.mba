var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();











var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

function loadElements(list) {
  for (var name in list) {
    var selector = list[name];
    if (typeof selector === 'string') {
      list[name] = $(selector);
    } else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
      loadElements(list[name]);
    }
  }
}

function inAC(s) {
    s.draw('80% - 240', '80%', 0.3, {
        delay: 0.1,
        callback: function callback() {
            inAC2(s);
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
        callback: function callback() {
            inB2(s);
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
        callback: function callback() {
            outAC2(s);
        }
    });
}

function outAC2(s) {
    s.draw('20% - 240', '20%', 0.3, {
        callback: function callback() {
            outAC3(s);
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

var MobileMenu = {
    offcut: [80, 320],
    icon: ['pathD', 'pathE', 'pathF'],
    segments: [],

    init: function init() {
        this.createSegments();
    },
    createSegments: function createSegments() {
        var _this = this;

        this.icon.forEach(function (icon) {
            var path = document.getElementById(icon);

            var _offcut = slicedToArray(_this.offcut, 2),
                start = _offcut[0],
                end = _offcut[1];

            _this.segments.push(new Segment(path, start, end));
        });
    },
    animate: function animate(anim) {
        var segments = this.segments;
        segments.forEach(function (segment, index) {
            return anim[index](segment);
        });
    },
    animateClose: function animateClose() {
        this.animate([inAC, inB, inAC]);
    },
    animateOpen: function animateOpen() {
        this.animate([outAC, outB, outAC]);
    }
};

var DonutChart = {
  data: {
    labels: ["Изучение теории и методологии", "Выполнение домашних заданий", "Адаптивная верстка дизайна из PSD", "Cоздание лендинга с нуля"],
    datasets: [{
      data: [40, 31, 20, 9],
      backgroundColor: ["#4cc2c0", "#f15b26", "#fcb03b", "#3cb878"]
    }]
  },

  context: $("#myChart")[0],

  init: function init() {
    var _this = this;

    var data = this.data;

    var _$$waypoint = $("#myChart").waypoint(function (direction) {
      var chart = new Chart(_this.context, {
        type: "doughnut",
        data: data,
        options: {
          legend: { display: false }
        },
        animation: {
          animateScale: true
        }
      });
      wp.destroy();
    }, { offset: "75%" }),
        _$$waypoint2 = slicedToArray(_$$waypoint, 1),
        wp = _$$waypoint2[0];
  }
};

var AuthorSlider = function ($) {
  /* Подключаемся к DOM-слайдера */
  var elements = {
    content: $(".author-slider__content"),
    slides: $(".author-slider__item"),
    dots: $(".author-slider__dots")
  };

  var slidesCount = elements.slides.length;

  function makeDot() {
    var isFirst = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var dot = $('<div class="author-slider__dot">');

    if (isFirst) {
      dot.addClass("author-slider__dot_current");
    }

    return dot;
  }

  function slideTo(index) {
    var offset = 0 - index * (100 / slidesCount);
    var content = elements.content;

    content.css("transform", "translateX(" + offset + "%)");
  }

  /* Экспортируем модуль из замыкания */
  return {
    init: function init() {
      var contentWidth = 100 * slidesCount;
      var slideWidth = 100 / slidesCount;
      var content = elements.content,
          slides = elements.slides,
          dots = elements.dots;

      content.css("width", contentWidth + "%");
      slides.css("width", slideWidth + "%");

      for (var i = 0; i < slidesCount; i++) {
        if (i === 0) {
          dots.append(makeDot(true));
        } else {
          dots.append(makeDot());
        }
      }

      $(".author-slider__dot").each(function (index, dot) {
        $(dot).click(function (event) {
          $(".author-slider__dot").removeClass("author-slider__dot_current");
          $(dot).addClass("author-slider__dot_current");
          slideTo(index);
        });
      });
    }
  };
}(jQuery);

function AnimateParticle() {
	particlesJS("particle-js", {
		"particles": {
			"number": {
				"value": 90,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.5997616736507331,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 3,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "grab"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 227.75766584354238,
					"line_linked": {
						"opacity": 0.8336705787130719
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});

	particlesJS("particle1-js", {
		"particles": {
			"number": {
				"value": 90,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.5997616736507331,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 3,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "grab"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 227.75766584354238,
					"line_linked": {
						"opacity": 0.8336705787130719
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});
}

var modalTriggerBts = $('a[data-type="cd-modal-trigger"]');
var coverLayer = $('.cd-cover-layer');

var duration = 600;
var epsilon = 1000 / 60 / duration / 4;
var firstCustomMinaAnimation = bezier(.63, .35, .48, .92, epsilon);

function initModal(modalTrigger) {
  var modalTriggerId = modalTrigger.attr('id'),
      modal = $('.cd-modal[data-modal="' + modalTriggerId + '"]'),
      svgCoverLayer = modal.children('.cd-svg-bg'),
      paths = svgCoverLayer.find('path'),
      pathsArray = [];
  //store Snap objects
  pathsArray[0] = Snap('#' + paths.eq(0).attr('id')), pathsArray[1] = Snap('#' + paths.eq(1).attr('id')), pathsArray[2] = Snap('#' + paths.eq(2).attr('id'));

  //store path 'd' attribute values
  var pathSteps = [];
  pathSteps[0] = svgCoverLayer.data('step1');
  pathSteps[1] = svgCoverLayer.data('step2');
  pathSteps[2] = svgCoverLayer.data('step3');
  pathSteps[3] = svgCoverLayer.data('step4');
  pathSteps[4] = svgCoverLayer.data('step5');
  pathSteps[5] = svgCoverLayer.data('step6');

  //open modal window
  modalTrigger.on('click', function (event) {
    event.preventDefault();
    modal.addClass('modal-is-visible');
    coverLayer.addClass('modal-is-visible');
    animateModal(pathsArray, pathSteps, duration, 'open');
  });

  //close modal window
  modal.on('click', '.modal-close', function (event) {
    event.preventDefault();
    modal.removeClass('modal-is-visible');
    coverLayer.removeClass('modal-is-visible');
    animateModal(pathsArray, pathSteps, duration, 'close');
  });
}

function animateModal(paths, pathSteps, duration, animationType) {
  var path1 = animationType == 'open' ? pathSteps[1] : pathSteps[0],
      path2 = animationType == 'open' ? pathSteps[3] : pathSteps[2],
      path3 = animationType == 'open' ? pathSteps[5] : pathSteps[4];
  paths[0].animate({ 'd': path1 }, duration, firstCustomMinaAnimation);
  paths[1].animate({ 'd': path2 }, duration, firstCustomMinaAnimation);
  paths[2].animate({ 'd': path3 }, duration, firstCustomMinaAnimation);
  console.log("modal is animationg", paths, pathSteps, duration, animationType);
}

function bezier(x1, y1, x2, y2, epsilon) {
  //https://github.com/arian/cubic-bezier
  var curveX = function curveX(t) {
    var v = 1 - t;
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
  };

  var curveY = function curveY(t) {
    var v = 1 - t;
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
  };

  var derivativeCurveX = function derivativeCurveX(t) {
    var v = 1 - t;
    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
  };

  return function (t) {

    var x = t,
        t0,
        t1,
        t2,
        x2,
        d2,
        i;

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
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
    while (t0 < t1) {
      x2 = curveX(t2);
      if (Math.abs(x2 - x) < epsilon) return curveY(t2);
      if (x > x2) t0 = t2;else t1 = t2;
      t2 = (t1 - t0) * .5 + t0;
    }

    // Failure
    return curveY(t2);
  };
}

function SvgPopups() {
  modalTriggerBts.each(function () {
    initModal($(this));
  });
}

var ReviewsCarousel = function ($) {
  var carousel = {
    content: $(".testi-1 .carousel__content"),
    items: $(".testi-1 .carousel-item"),
    dots: $(".testi-1 .carousel-dots")
  };

  var itemsCount = carousel.items.length;

  function slideTo(index) {
    var offset = 0 - index * (100 / itemsCount);
    var content = carousel.content,
        items = carousel.items;

    content.css("transform", "translateX(" + offset + "%)");
    items.addClass("carousel-item--gone");
    items.eq(index).removeClass("carousel-item--gone");
  }

  function newDot(index) {
    var dot = $('<li><a href="#"></a></li>');
    if (index === 0) {
      dot.addClass("active");
    }

    dot.click(function (event) {
      event.preventDefault();
      carousel.dots.find("li").removeClass("active");
      $(event.target).parent().addClass("active");
      slideTo(index);
    });

    return dot;
  }

  function makeDots() {
    var dots = carousel.dots;

    for (var i = 0; i < itemsCount; i++) {
      dots.append(newDot(i));
    }
  }

  return {
    init: function init() {
      var content = carousel.content,
          items = carousel.items;

      var contentWidth = 100 * itemsCount;
      var itemsWidth = 100 / itemsCount;
      content.css("width", contentWidth + "%");
      items.css("width", itemsWidth + "%");
      items.not(":first-child").addClass("carousel-item--gone");
      makeDots();
    }
  };
}(jQuery);

var Counter = function ($) {
  var stepsCount = 300;
  var duration = 1500;
  var currentStep = 0;
  var endValues = [];
  var tickTime = duration / stepsCount;
  var counter = $(".counter-red");
  var numbers = $(".counter-item span");

  function counterTick() {
    numbers.each(function (index, number) {
      var value = Math.round(currentStep * endValues[index] / stepsCount);
      $(number).text(value);
    });

    if (++currentStep < stepsCount) {
      setTimeout(counterTick, tickTime);
    }
  }

  return {
    init: function init() {
      numbers.each(function (index, number) {
        endValues[index] = parseInt($(number).text());
        $(number).text("0");
      });

      var _counter$waypoint = counter.waypoint(function (direction) {
        counterTick();
        wp.destroy();
      }, { offset: "75%" }),
          _counter$waypoint2 = slicedToArray(_counter$waypoint, 1),
          wp = _counter$waypoint2[0];
    }
  };
}(jQuery);

var animation = { "open": ["M33.8,690l-188.2-300.3c-0.1-0.1,0-0.3,0.1-0.3l925.4-579.8c0.1-0.1,0.3,0,0.3,0.1L959.6,110c0.1,0.1,0,0.3-0.1,0.3 L34.1,690.1C34,690.2,33.9,690.1,33.8,690z", "M-329.3,504.3l-272.5-435c-0.1-0.1,0-0.3,0.1-0.3l925.4-579.8c0.1-0.1,0.3,0,0.3,0.1l272.5,435c0.1,0.1,0,0.3-0.1,0.3 l-925.4,579.8C-329,504.5-329.2,504.5-329.3,504.3z", "M476.4,1013.4L205,580.3c-0.1-0.1,0-0.3,0.1-0.3L1130.5,0.2c0.1-0.1,0.3,0,0.3,0.1l271.4,433.1c0.1,0.1,0,0.3-0.1,0.3 l-925.4,579.8C476.6,1013.6,476.5,1013.5,476.4,1013.4z"], "close": ["M-59.9,540.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L864.8-41c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3L-59.5,540.6 C-59.6,540.7-59.8,540.7-59.9,540.5z", "M-465.1,287.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L459.5-294c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3 l-925.4,579.8C-464.9,287.7-465,287.7-465.1,287.5z", "M341.1,797.5l-0.9-1.4c-0.1-0.1,0-0.3,0.1-0.3L1265.8,216c0.1-0.1,0.3,0,0.3,0.1l0.9,1.4c0.1,0.1,0,0.3-0.1,0.3L341.5,797.6 C341.4,797.7,341.2,797.7,341.1,797.5z"] };
var SvgModal = {
	animation: animation
};

function bezier$1(x1, y1, x2, y2, epsilon) {
  var curveX = function curveX(t) {
    var v = 1 - t;
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
  };

  var curveY = function curveY(t) {
    var v = 1 - t;
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
  };

  var derivativeCurveX = function derivativeCurveX(t) {
    var v = 1 - t;
    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
  };

  return function (t) {

    var x = t,
        t0 = void 0,
        t1 = void 0,
        t2 = void 0,
        x2 = void 0,
        d2 = void 0,
        i = void 0;

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
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
    while (t0 < t1) {
      x2 = curveX(t2);
      if (Math.abs(x2 - x) < epsilon) return curveY(t2);
      if (x > x2) t0 = t2;else t1 = t2;
      t2 = (t1 - t0) * .5 + t0;
    }

    // Failure
    return curveY(t2);
  };
}

/**
 * Модуль Popups.js - здесь находятится весь код всплывающих окон
 * Так как всплывающие окна бывают разных типов, предусмотрена унифицированная
 * система доступа к ним - функция showPopup(). Она позволяет показывать
 * любое зарегистрированное в этом модуле всплывающее окно. Достаточно просто
 * передать имя окна и (опционально) пользовательские данные.
 * Модуль состоит из последовательной регистрации замыканий, в которых находится
 * код каждого отдельно взятого окна.
 */

/**
 * Хэш, в котором будут регистрироваться всплывающие окна
 */

var popups = {};

/**
 * Вспомогательная функция - выполняет регистрацию всплывающего окна
 */

function registerPopup(popupName, popupClosure) {
  popups[popupName] = popupClosure();
}

/**
 * Показывает нужное нам всплывающее окно
 * @param name - имя всплывающего окна (определяется при его регистрации)
 * @param options - дополнительные опции, которые могут быть необязательны, а
 * могут и использоваться разными способами. Всё зависит от типа попапа
 */

function showPopup(name, options) {
  if (typeof popups[name] !== 'undefined') {
    popups[name](options);
  } else {
    console.log('\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u0437\u043E\u0432\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 showPopup:\n    \u041F\u043E\u043F\u0430\u043F \u0441 \u0438\u043C\u0435\u043D\u0435\u043C "' + name + '" \u043D\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D!\n    \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0443\u043A\u0430\u0437\u0430\u043B\u0438\n    \u0438\u043C\u044F \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0433\u043E \u043E\u043A\u043D\u0430. \u041E\u043D\u043E \u043C\u043E\u0436\u0435\u0442 \u043E\u0442\u043B\u0438\u0447\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0435\u0433\u043E id\n    \u0438\u043B\u0438 \u0438\u043C\u0435\u043D\u0438 \u043A\u043B\u0430\u0441\u0441\u0430. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043F\u0430\u043F \u0441 \u0434\u0430\u043D\u043D\u044B\u043C \u0438\u043C\u0435\u043D\u0435\u043C \u0435\u0449\u0451\n    \u043D\u0435 \u0431\u044B\u043B \u0441\u043E\u0437\u0434\u0430\u043D \u0438 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D. \u041F\u043E\u0447\u0438\u0442\u0430\u0439\u0442\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044E\n    \u043A \u043C\u043E\u0434\u0443\u043B\u044E app/js/popups.js \u0434\u043B\u044F \u0431\u043E\u043B\u0435\u0435 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438.');
  }
}

/**
 * Вспомогательная функция-замыкание, для создания всплывающих окон
 * Подключает обработчики событий, создаёт функционал для стандартного
 * отображения всплывающего окна.
 * @param selector - id или класс всплывающего окна в разметке
 * @param classes - хэш с именами классов для стейта visible и селектор
 * для элемента закрывающего попап
 * @param animation – хэш с именами классов для анимации попапав
 * @param isShadow - отображать ли затенение под всплывающем окном
 */

function initPopup(selector, classes, animation$$1, isShadow) {
  var overlayVisible = 'shadow-overlay--visible';
  var target = $('[data-options$="' + selector + '"]');
  var overlay = $('.shadow-overlay');
  var popup = $(selector);
  var visible = classes.visible,
      close = classes.close;
  var aminationIn = animation$$1.aminationIn,
      aminationOut = animation$$1.aminationOut;

  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  function closePopup() {
    overlay.removeClass(overlayVisible);
    popup.addClass(aminationOut).one(animationEnd, function () {
      $(this).removeClass(aminationOut);
      $(this).removeClass(visible);
    });
    overlay.off('click'); // зачем тут .off если .on у тебя нигде не используется? в коде ты исполуешь .click()
    target.removeClass('hideIt');
    popup.find('form').removeClass('sended');
    return false; // вместо твоего .off()
  }

  popup.find('.' + close).click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    closePopup();
    $('body').removeClass('of-hidden');
  });

  return function showPopup() {
    target.addClass('hideIt');
    popup.addClass(visible);
    popup.addClass(aminationIn).one(animationEnd, function () {
      $(this).removeClass(aminationIn);
    });
    if (isShadow) {
      overlay.addClass(overlayVisible);
      overlay.click(function (event) {
        closePopup();
      });
    }
  };
}

/**
 * Универсальное всплывающее окно. Подходит для простых окон.
 * Данный попап очень легко использовать. Для этого сделайте следующее:
 * 1) Создайте разметку всплывающего окна
 * 2) При помощи CSS сделайте его оформление. Пропишите стили для скрытого
 *    и видимого состояния. Там же можно прописать анимации
 * 3) Добавьте к всплывающему окну опции, использую html5 аттрибут
 *    data-options. Синтаксис опций следующий:
 *    data-options="visible:close:aminationIn:aminationOut:shadow",
 *    где visible - класс добавляемый при открытии окна,
 *    close - имя класса элемента, при клике на который вы хотите чтобы
 *    закрывалось окно, shadow - принимает значения true или false,
 *    true - если вы хотите чтобы происходило затемнения экрана
 *    false - если вы этого не желаете.
 * 4) Добавьте класс js-show-popup к тем элементам, при клике на которые
 *    вы хотите, чтобы открывался ваш попап. А затем к этим же элементам
 *    добавьте аттрибут data-options="generic:#idВашегоПопапа", не забывая
 *    указывать id нужного попапа.
 * Вот собственно и всё. Удачи!!!
 */

registerPopup('generic', function () {
  var genericPopups = {};

  function loadOptions(popupId) {
    var optionsString = $(popupId).data('options');
    var visible = void 0,
        close = void 0,
        aminationIn = void 0,
        aminationOut = void 0,
        isShadow = void 0;

    if (typeof optionsString !== 'undefined') {
      var _optionsString$split = optionsString.split(':');

      var _optionsString$split2 = slicedToArray(_optionsString$split, 5);

      visible = _optionsString$split2[0];
      close = _optionsString$split2[1];
      aminationIn = _optionsString$split2[2];
      aminationOut = _optionsString$split2[3];
      isShadow = _optionsString$split2[4];

      visible = visible === '' ? 'active' : visible;
      close = close === '' ? 'close' : close;
      aminationIn = aminationIn === '' ? 'fadeIn' : aminationIn;
      aminationOut = aminationOut === '' ? 'fadeOut' : aminationOut;
      isShadow = isShadow === '' || 'true';
    } else {
      visible = 'visible';
      close = 'close';
      aminationIn = 'fadeIn';
      aminationOut = 'fadeOut';
      isShadow = true;
    }

    return { visible: visible, close: close, aminationIn: aminationIn, aminationOut: aminationOut, isShadow: isShadow };
  }

  return function showPopup(_ref) {
    var _ref2 = slicedToArray(_ref, 1),
        popupId = _ref2[0];

    if (typeof genericPopups[popupId] === 'undefined') {
      var options = loadOptions(popupId);
      var visible = options.visible,
          close = options.close,
          aminationIn = options.aminationIn,
          aminationOut = options.aminationOut,
          isShadow = options.isShadow;

      genericPopups[popupId] = initPopup(popupId, { visible: visible, close: close }, { aminationIn: aminationIn, aminationOut: aminationOut }, isShadow);
    }
    genericPopups[popupId]();
  };
});

/**
 * Всплывающее окно для записи на курсы.
 * Инструкция к использованию:
 * showPopup('price', 'popupId');
 * Вместо 'popupId' - написать id попапа без знака "#"
 */

registerPopup('price', function () {
  var pricePopups = {};

  var classes = {
    visible: 'active',
    close: 'close'
  };

  var animation$$1 = {
    aminationIn: '',
    aminationOut: ''
  };

  $('.price-popup').each(function (index, self) {
    var id = $(self).attr('id');
    pricePopups['#' + id] = initPopup('#' + id, classes, animation$$1, false);
  });

  function showPopup(_ref3) {
    var _ref4 = slicedToArray(_ref3, 1),
        priceId = _ref4[0];

    pricePopups[priceId]();
  }

  return showPopup;
});

/**
 * Всплывающее окно с SVG-анимациями на основе библиотеки
 * Snap.svg (http://snapsvg.io)
 */

registerPopup('svg', function () {
  var duration = 600;
  var popupId = '#svg-modal';
  var overlayVisible = 'active';
  var overlay = $('.svg-modal__overlay');
  var epsilon = 1000 / 60 / duration / 4;
  var easing = bezier$1(0.63, 0.35, 0.48, 0.92, epsilon);

  var classes = {
    visible: 'svg-modal_visible',
    close: 'svg-modal__close'
  };

  var animation$$1 = {
    aminationIn: '',
    aminationOut: ''
  };

  var parentShow = initPopup(popupId, classes, animation$$1, false);

  var path = [1, 2, 3].map(function (id, index) {
    return Snap('#svg-modal-path-' + index);
  });

  $(popupId).find('.' + classes.close).click(function (event) {
    event.preventDefault();
    overlay.removeClass(overlayVisible);
    $(popupId).removeClass(classes.visible);
    animateBackground('close');
  });

  function loadContent(_ref5) {
    var _ref6 = slicedToArray(_ref5, 1),
        content = _ref6[0];

    $('.svg-modal__content').hide();
    $(content).show();
  }

  function animateBackground(direction) {
    var _SvgModal$animation = SvgModal.animation,
        open = _SvgModal$animation.open,
        close = _SvgModal$animation.close;

    var animation$$1 = direction === 'open' ? open : close;
    path.forEach(function (path, index) {
      path.animate({ d: animation$$1 }, duration, easing);
    });
  }

  return function showPopup(content) {
    $('body').addClass('of-hidden');
    loadContent(content);
    overlay.addClass(overlayVisible);
    parentShow();
    animateBackground('open');
  };
});

/**
 * Регулярные выражения для валидации форм
 */

var validationRegEx = {
  name: /^.{2,50}$/,
  phone: /^.{2,50}$/,
  email: /^.{2,50}@.{2,50}$/
};

/**
 * Валидация значения поля
 * @param {String} value - значение поля ввода
 * @param {RegExp} rgx - регулярное выражения для валидации
 */

function validateField(value, rgx) {
  console.log(value, rgx, rgx.test(value));
  return rgx.test(value);
}

/**
 * Производит валидацию формы
 * @param {Object} fields - jQuery коллекция инпутов
 * @return {Object} result - информация о результатах валидации:
 * result.data - объект с извлечёнными данными из формы
 * result.isValid - (true|false) - успешно ли прошла валидация
 * result.failed - массив из полей, которые не прошли валидацию
 */

function validateInput(fields) {
  var result = {
    data: {},
    isValid: true
  };

  fields.each(function (index, input) {
    var field = $(input);
    var name = field.attr('name');
    var isRequired = field.hasClass('js-required');

    if (isRequired && typeof validationRegEx[name] !== 'undefined') {
      if (validateField(field.val(), validationRegEx[name]) === false) {
        result.failed = result.failed || [];
        result.isValid = false;
        result.failed.push({ name: name, field: field });
        return true; /* Переходим к следующему полю */
      }
    }

    result.data[name] = field.val();
  });

  return result;
}

/**
 * Отправляет данные формы на сервер
 * @param {Object} data - данные из формы
 */

function submitForm(form, data) {
  var url = form.attr('action');
  url = 'send-request.php';

  $.post(url, data, function (result) {
    $(window).trigger('form-sent', { form: form, data: data });
  });
}

/**
 * Инициализирует форму
 * @param {Object} form - DOM-элемент инициализируемой формы
 */

function initForm(form) {
  var self = $(form);
  var fields = self.find('input, textarea');

  self.on('submit', function (event) {
    var result = validateInput(fields);
    event.preventDefault();
    if (result.isValid === true) {
      submitForm(self, result.data);
      self.addClass('sended');

      if (self.find('button').hasClass('js-big_show')) {

        self.removeClass('sended');
        $('.order-education').addClass('scaled');

        setTimeout(function () {
          $('body').addClass('of-hidden');
          $('.order-education').addClass('scaled_full');

          setTimeout(function () {
            $('.cd-transition-layer').addClass('visible opening');

            var delay = $('.no-cssanimations').length > 0 ? 0 : 800;

            setTimeout(function () {
              $('.cd-modal').addClass('visible');
              $('.cd-transition-layer').removeClass('opening');
            }, delay);

            setTimeout(function () {
              $('.order-education').removeClass('scaled_full');
              $('.order-education').removeClass('scaled');
              $('.order-education form').removeClass('sended');
            }, 1000);
          }, 800);
        }, 2600);
      }
    } else {
      $(window).trigger('validation-failed', [self, result.failed]);
    }
    return false;
  });
}

/**
 * Экспортируем функцию инициализации модуля.
 * Просто вывозите её - и все формы будут готовы к своей работе
 */

function initAllForms() {
  $(".form").each(function (index, form) {
    return initForm(form);
  });
}

function initFormUx() {
  var messages = {
    name: 'Не верно указано имя!',
    phone: 'Не верно указан номер телефона!',
    email: 'Не верно указан E-mail!',
    other: 'Пожалуйста, заполните это поле!'
  };

  $(window).on('validation-failed', function (event, form, failed) {
    failed.forEach(function (item, index) {
      var name = item.name,
          field = item.field;

      var message = void 0;

      // if (typeof field.data('error') === 'undefined') {
      //   field.data('error', true);
      //   message = $('<span class="err">');
      //   if (typeof messages[name] !== 'undefined') {
      //     message.text(messages[name]);
      //   } else {
      //     message.text(messages[other]);
      //   }
      //   field.after(message);
      // }

      field.addClass('err').keypress(function (event) {
        field.removeClass('err').off('keypress');
      });
    });
  });

  // $(window).on('form-sent', (event, form, data) => {
  //   form.addClass('sent').find('.animate').addClass('active');
  //   form.find('input, textarea').each((index, item) => {
  //     $(item).val('');
  //   });
  // });
}

function initDetails() {
  var DISABLED = false;
  var ACTIVE = true;
  var NONE = false;

  /* Здесь храним состоянии красной, фиолетовой и зелёной кнопок */
  var buttonStates = [DISABLED, DISABLED, DISABLED];

  var buttons = $('.modules-block li');

  var classNames = ['include-intensive', 'include-lvl_up', 'include-coaching', 'include-all'];

  var allClassNames = classNames.join(' ');

  var stateNumber = [1, 3, 2, 4];

  /* Данные для каждого состояния */

  var stateInfo = [{
    className: NONE,
    salary: '28<span>000</span>',
    post: '<b>НАПОЛНЕНИЕ САЙТА</b> на подработке',
    term: '<b>2</b>ч. + <b>1</b> неделя',
    button: ['подтвердить участие', '/registred']
  }, {
    className: 0,
    salary: '64<span>000</span>',
    post: '<b>SENIOR HTML</b>-верстальщик',
    term: '<b>2</b> месяца',
    time: '2',
    button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=14500&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик']
  }, {
    className: 1,
    salary: '92<span>000</span>',
    post: '<b>MIDDLE FRONT-END</b> разработчик',
    term: '<b>5</b> месяцев',
    time: '5',
    button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=39270&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик+3+месяца+FRONT-END+разработчик']
  }, {
    className: 2,
    salary: '79<span>000</span>',
    post: '<b>ДИЗАЙНЕР-ВЕРСТАЛЬЩИК</b> сайтов',
    term: '<b>3</b> месяца',
    time: '3',
    button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=27020&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик+1-месяц+Коучинга']
  }, {
    className: 3,
    salary: '120<span><small>т.</small></span>',
    post: '<b>FULL-STACK</b> разработчик',
    term: '<b>6</b> месяцев',
    time: '6',
    button: ['оплатить участие', 'https://api.gdonate.ru/pay?public_key=4d26d-3054&sum=45660&account=promo_popup&desc=Оплата+участия+в+интенсиве+Профессия+HTML-версильщик+3+месяца+FRONT-END+разработчик+1-месяц+Коучинга']
  }];

  /*
   * Определяет и возвращает порядковый номер состояния,
   * основываясь на комбинациях активных кнопок
   */

  function getStateNumber() {
    var red = buttonStates[0],
        violet = buttonStates[1],
        green = buttonStates[2];

    var stateIndex = 0;

    if (red === DISABLED) {
      return 0;
    } else {
      stateIndex += violet ? 2 : 0;
      stateIndex += green ? 1 : 0;
      return stateNumber[stateIndex];
    }
  }

  /* Вызывается при изменении состояния: обновляем вьюшку */

  function updateDetails() {
    var state = stateInfo[getStateNumber()];

    buttonStates.forEach(function (state, index) {
      var button = buttons.eq(index + 2);
      if (state === DISABLED) {
        button.removeClass('active');
      } else {
        button.addClass('active');
      }
    });

    var className = '';

    if (state.className !== NONE) {
      className = classNames[state.className];
    }

    $('.choose-your-module, .modules-map').removeClass(allClassNames).addClass(className);

    $('.choose-your-module .salary').html(state.salary);
    $('.choose-your-module .post').html(state.post);
    $('.choose-your-module .term').html(state.term);
    $('.choose-your-module .time').html(state.time);
    $('.agreement .submit-button .text').text(state.button[0]);
    $('.agreement .submit-button').attr('href', state.button[1]);
  }

  /* Инициализируем последние три кнопки */
  buttons.each(function (index, item) {

    /* Первые три кнопочки пропускаем */

    if (index < 2) {
      return true;
    }

    /*
     * Делаем так, чтобы нумерация начиналась с 0
     * это необходимо для удобной работы с массивом buttonStates
     */

    var id = index - 2;

    $(item).click(function (event) {
      console.log(id);
      if (id > 0 && buttonStates[id] === DISABLED) {
        buttonStates[0] = ACTIVE; // Required: первая кнопка обязана быть активной
        buttonStates[id] = ACTIVE;
      } else if (buttonStates[id] === DISABLED) {
        buttonStates[id] = ACTIVE;
      } else if (id === 0) {
        buttonStates[0] = DISABLED;
        buttonStates[1] = DISABLED;
        buttonStates[2] = DISABLED;
      } else {
        buttonStates[id] = DISABLED;
      }
      updateDetails();
    });
  });

  $('.agreement .submit-button').addClass('disabled');
  $('.agreement .checkbox-block').click(function (event) {
    $('.agreement .submit-button').toggleClass('disabled');
  });
}

var MainController = {
  /**
   * Перечисляем хуки для выполнения различных действий контроллера
   * Синтаксис: ["хук-класс", "действиеКонтроллера"]
   */
  hooks: [["js-open-search", "openSearch"], ["mobile-menu", "triggerMenu"], ["js-show-popup", "openPopup"], ["js-select-product", "selectProduct"]],

  modules: {
    AnimateParticle: AnimateParticle,
    SvgPopups: SvgPopups
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

  init: function init() {
    var _this = this;

    //MobileMenu.init();
    initAllForms();
    this.movePopups();
    Counter.init();
    DonutChart.init();
    AuthorSlider.init();
    ReviewsCarousel.init();
    initFormUx();
    initDetails();

    for (var module in this.modules) {
      this.modules[module]();
    }

    loadElements(this.el);

    this.hooks.forEach(function (descriptor) {
      var _descriptor = slicedToArray(descriptor, 2),
          hook = _descriptor[0],
          action = _descriptor[1];

      $('.' + hook).click(function (event) {
        _this[action](event);
      });
    });

    this.initSearch();
    this.initTabs();
    // this.initNolbAnimation();
    this.animateAd();
    this.animateAd1();
    this.animateAcc();
    this.animateOrder();
    this.toggleClassMe();

    // this.superClose();

    $('.check_me').each(function (index, self) {
      var checkGroup = $(self);
      var checkBox = checkGroup.find('.checkbox-block');
      var button = checkGroup.siblings('button');
      checkBox.click(function (event) {
        button.toggleClass('disabled');
      });
    });
  },
  initSearch: function initSearch() {
    var _el$search = this.el.search,
        container = _el$search.container,
        form = _el$search.form;

    container.click($.proxy(this.closeSearch, this));
    form.click(function (event) {
      return event.stopPropagation();
    });
  },
  initTabs: function initTabs() {
    var _el$tabs = this.el.tabs,
        tabs = _el$tabs.tabs,
        items = _el$tabs.items;

    tabs.click(function (event) {
      var target = $(event.target);
      var tab = target.parent();
      event.preventDefault();
      tabs.removeClass("active");
      tab.addClass("active");
      items.css("display", "none");
      $(target.attr("href")).css("display", "block");
    });
  },
  openSearch: function openSearch() {
    this.el.search.container.addClass("open");
  },
  closeSearch: function closeSearch() {
    this.el.search.container.removeClass("open");
  },
  triggerMenu: function triggerMenu() {
    if (this.isMenuOpen) {
      MobileMenu.animateOpen();
      this.isMenuOpen = false;
    } else {
      MobileMenu.animateClose();
      this.isMenuOpen = true;
    }
  },
  movePopups: function movePopups() {
    $('.js-show-popup').each(function (index, trigger) {
      var target = $(trigger);
      var params = target.data('options');

      if (typeof params === 'undefined') {
        return true;
      }

      var _params$split = params.split(':'),
          _params$split2 = slicedToArray(_params$split, 2),
          name = _params$split2[0],
          popupId = _params$split2[1];

      var options = $(popupId).data('options');
      var isNomadic = false;
      if (typeof options !== 'undefined') {
        var _options$split = options.split(':');

        var _options$split2 = slicedToArray(_options$split, 6);

        isNomadic = _options$split2[5];
      }
      if (isNomadic === 'true') {
        $(popupId).insertAfter(target);
      }
    });
  },
  openPopup: function openPopup(event) {
    event.preventDefault();
    var params = $(event.target).data('options');

    var _params$split3 = params.split(':'),
        _params$split4 = toArray(_params$split3),
        name = _params$split4[0],
        options = _params$split4.slice(1);

    showPopup(name, options);
  },
  selectProduct: function selectProduct(event) {
    var product = $(event.target).attr("data-id");
    this.el.signInPopup.find("input[name=source]").val('sign-in-' + product);
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

  animateAd: function animateAd() {
    $('.it_education-advantages section').hover(function () {
      $('.it_education-advantages section').removeClass('hideMe').addClass('hideMe');
      $(this).removeClass('hideMe').addClass('showMe');
    }, function () {
      $('.it_education-advantages section').removeClass('hideMe').removeClass('showMe');
    });
  },
  animateAd1: function animateAd1() {
    $('.faq-questions li').hover(function () {
      $('.faq-questions li').removeClass('hideMe').addClass('hideMe');
      $(this).removeClass('hideMe').addClass('showMe');
    }, function () {
      $('.faq-questions li').removeClass('hideMe').removeClass('showMe');
    });
  },
  animateAcc: function animateAcc() {
    $('.faq-questions li a').click(function () {
      $(this).parent('li').toggleClass('active');
      return false;
    });
  },
  animateOrder: function animateOrder() {
    $('.order-education input').focus(function () {
      $('.order-education').addClass('active');
    });
    $('.order-education input').blur(function () {
      $('.order-education').removeClass('active');
    });
  },
  toggleClassMe: function toggleClassMe() {
    $('.modules-block li:eq(2), .modules-block li:eq(3), .modules-block li:eq(4)').click(function () {
      $('.modules-map-popup').toggleClass('roll ball');
    });
  }

  // superClose() {
  //   let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  //   $('.js-super_close').click(function() {

  //       $('.order-education').addClass('animated zoomOut').one(animationEnd, function() {
  //         $(this).removeClass('animated zoomOut');
  //         $('.order-education form').removeClass('sended');
  //         $(this).removeClass('big_show');
  //         $('body').removeClass('of-hidden');
  //       });

  //       return false;
  //   });
  // }

};

MainController.init();
