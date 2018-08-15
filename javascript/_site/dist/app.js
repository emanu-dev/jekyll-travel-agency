// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"app.js":[function(require,module,exports) {
'use strict';

var _test = require('modules/test.module');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/*=================================
=            Polyfills            =
=================================*/

// Overwrites native 'firstElementChild' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
;(function (constructor) {
	if (constructor && constructor.prototype && constructor.prototype.firstElementChild == null) {
		Object.defineProperty(constructor.prototype, 'firstElementChild', {
			get: function get() {
				var node,
				    nodes = this.childNodes,
				    i = 0;
				while (node = nodes[i++]) {
					if (node.nodeType === 1) {
						return node;
					}
				}
				return null;
			}
		});
	}
})(window.Node || window.Element);

/*=====  End of Polyfills  ======*/

//TODO: Clean Up
/*===================================
=            Mobile Menu            =
===================================*/

var mobileMenu = document.getElementById('mobile-menu');
var mobileMenuToggle = document.getElementById('mobile-menu-toggle');

mobileMenuToggle.addEventListener('click', function () {
	mobileMenu.classList.toggle('--active');
	mobileMenuToggle.classList.toggle('--active');
	document.body.classList.toggle('--locked');
});

/*=====  End of Mobile Menu  ======*/

//TODO: Clean Up
/*==============================
=            Slider            =
==============================*/

var slider = document.getElementById('home');

if (slider) {
	var slideAnimation = function slideAnimation() {
		var allItems = [].slice.call(slideNav.childNodes);
		activeSlide < allItems.length - 1 ? activeSlide += 1 : activeSlide = 0;

		var currentSlide = allItems[activeSlide];

		allItems.forEach(function (item) {
			if (item == currentSlide) {
				item.classList.add('--active');
			} else {
				item.classList.remove('--active');
			}
		});

		slider.firstElementChild.style.left = (activeSlide * 100 * -1).toString() + 'vw';
	};

	var slides = [].slice.call(slider.querySelectorAll('.slider__list-item'));
	var slideQty = parseInt(slides.length);
	var slideNav = document.getElementById('slider-nav');

	var activeSlide = 0;
	var interval = null;

	slides.forEach(function () {
		slideNav.insertAdjacentHTML('beforeend', '<div class=\'slider__nav-item\'></div>');
		slideNav.firstElementChild.classList.add('--active');
		slideNav.lastChild.addEventListener('click', function (e) {
			var allItems = [].slice.call(slideNav.childNodes);

			allItems.forEach(function (item, index) {
				if (item == e.currentTarget) {
					item.classList.add('--active');
					activeSlide = index;
				} else {
					item.classList.remove('--active');
				}
			});

			slider.firstElementChild.style.left = (activeSlide * 100 * -1).toString() + 'vw';
		});
	});

	interval = setInterval(function () {
		slideAnimation();
	}, 3000);

	slider.addEventListener('mouseover', function () {
		if (interval != null) {
			clearInterval(interval);
			interval = null;
		}
	});

	slider.addEventListener('mouseleave', function () {
		if (interval == null) {
			interval = setInterval(function () {
				slideAnimation();
			}, 3000);
		}
	});
}

/*=====  End of Slider  ======*/

/*==============================
=      Testimonials Slider    =
==============================*/
var testimonialSection = document.getElementById('testimonials');
if (testimonialSection) {
	var testimonialAnimation = function testimonialAnimation() {
		testimonialList.style.left = (activeTestimonial * 100 * -1).toString() + 'vw';
	};

	var testimonialList = document.getElementById('testimonial-list');
	var testimonials = [].slice.call(testimonialList.querySelectorAll('.testimonials__item'));
	var testimonialsNav = document.getElementById('testimonials-nav');
	var testimonialsQty = parseInt(testimonials.length);

	var activeTestimonial = 0;
	var testimonialInterval = null;

	testimonialInterval = setInterval(function () {
		activeTestimonial = activeTestimonial < testimonialsQty - 1 ? activeTestimonial + 1 : 0;
		testimonialAnimation();
	}, 3000);

	testimonialSection.addEventListener('mouseover', function (e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		if (testimonialInterval != null) {
			clearInterval(testimonialInterval);
			testimonialInterval = null;
		}
	});

	testimonialSection.addEventListener('mouseleave', function (e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		if (testimonialInterval == null) {
			testimonialInterval = setInterval(function () {
				activeTestimonial = activeTestimonial < testimonialsQty - 1 ? activeTestimonial + 1 : 0;
				testimonialAnimation();
			}, 3000);
		}
	});

	testimonialsNav.querySelector('.--right').addEventListener('click', function () {
		activeTestimonial = activeTestimonial < testimonialsQty - 1 ? activeTestimonial + 1 : 0;
		testimonialAnimation();
	});

	testimonialsNav.querySelector('.--left').addEventListener('click', function () {
		activeTestimonial = activeTestimonial > 0 ? activeTestimonial - 1 : testimonialsQty - 1;
		testimonialAnimation();
	});
}

/*=====  End of Testimonials Slider  ======*/

//TO DO: Clean Up
/*=======================================
=            Menu Navigation            =
=======================================*/

var menuItems = [].slice.call(document.querySelectorAll('.header__menu-item'));

if (window.location.pathname.split('/').length < 3) {
	var scrollView = function scrollView(sectionId) {
		document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	menuItems.forEach(function (item) {
		item.firstElementChild.addEventListener('click', function (e) {
			e.stopPropagation();
			e.preventDefault();

			scrollView(item.getAttribute('data-section'));
			window.location.hash = '/' + item.getAttribute('data-section');
		});
	});
}

/*=====  End of Menu Navigation  ======*/

//TO DO: Clean Up
/*=======================================
=            Form Validation            =
=======================================*/

VMasker(document.getElementById('input-phone')).maskPattern('(99) 999999999');

var submitBtn = document.getElementById('form-submit');

submitBtn.addEventListener('click', function (e) {
	e.preventDefault();
	var contactForm = document.getElementById('contact-form');

	cleanHighlightInput('contact-form');

	var formData = getData(contactForm);
	var verifyResponse = verifyData(formData);

	document.getElementById('form-hint').textContent = verifyResponse.message;

	if (verifyResponse.valid == false) {
		document.getElementById('form-hint').classList.add('--warning');
	}
});

function getData(form) {
	if (!form || form.nodeName !== "FORM") {
		return;
	}
	var group = {};
	var i = void 0,
	    j = void 0,
	    q = [];
	for (i = form.elements.length - 1; i >= 0; i = i - 1) {
		if (form.elements[i].name === "") {
			continue;
		}
		switch (form.elements[i].nodeName) {
			case 'INPUT':
				switch (form.elements[i].type) {
					case 'text':
					case 'email':
					case 'hidden':
					case 'password':
					case 'button':
					case 'reset':
					case 'submit':
						q.push(form.elements[i].name + "=" + form.elements[i].value);
						group[form.elements[i].name] = form.elements[i].value;
						break;
					case 'checkbox':
					case 'radio':
					case 'file':
						break;
				}
				break;
			case 'TEXTAREA':
				group[form.elements[i].name] = form.elements[i].value;
				break;
			case 'SELECT':
				switch (form.elements[i].type) {
					case 'select-one':
						group[form.elements[i].name] = form.elements[i].value;
						break;
					case 'select-multiple':
						for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
							if (form.elements[i].options[j].selected) {
								group[form.elements[i].name] = form.elements[i].options[j].value;
							}
						}
						break;
				}
				break;
			case 'BUTTON':
				break;
		}
	}

	return group;
}

function verifyData(formData) {
	var valid = false;
	var message = ['Insira '];
	var response = {};

	if (!formData['name'].replace(/\s/g, '').length) {
		highlightInput('input-name');
		message.push('seu nome');
		message.push(', ');
		valid = false;
	}

	if (!formData['email'].replace(/\s/g, '').length) {
		highlightInput('input-email');
		message.push('seu email');
		message.push(', ');
		valid = false;
	} else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
		highlightInput('input-email');
		message.push('um email valido');
		message.push(', ');
		valid = false;
	}

	if (!formData['phone'].replace(/\s/g, '').length) {
		highlightInput('input-phone');
		message.push('seu telefone');
		message.push(', ');
		valid = false;
	}

	if (!formData['type'].replace(/\s/g, '').length) {
		highlightInput('input-type');
		message.push('o tipo do evento');
		message.push(', ');
		valid = false;
	}

	message.pop();
	if (message.length > 3) message[message.length - 2] = ' e ';
	message = message.join('');

	response['valid'] = valid;
	response['message'] = message;

	return response;
}

function highlightInput(id) {
	var input = document.getElementById(id);
	input.classList.add('--warning');
}

function cleanHighlightInput(formid) {
	var formInputs = [].slice.call(document.getElementById(formid).childNodes);

	formInputs.forEach(function (element) {
		if (element.nodeName != '#text') element.classList.remove('--warning');
	});
}

var fakeLabel = document.getElementById('fake-label');
var fakeLabelInput = document.getElementById('input-msg');

fakeLabelInput.addEventListener('input', function (e) {
	if (e.currentTarget.value.replace(/\s/g, '').length) {
		fakeLabel.style.visibility = 'hidden';
	}
});

fakeLabelInput.addEventListener('blur', function (e) {
	if (!e.currentTarget.value.replace(/\s/g, '').length) {
		fakeLabel.style.visibility = 'visible';
	}
});

/*=====  End of Form Validation  ======*/

/*===============================
=            Gallery            =
===============================*/

var galleryItems = document.getElementById('place-gallery');

if (galleryItems) {
	galleryItems = [].slice.call(galleryItems.children);
	galleryItems.forEach(function (item) {
		item.addEventListener('click', function (e) {
			var lightbox = basicLightbox.create('\n\t\t\t\t<img src="' + e.currentTarget.getAttribute('data-media') + '">\n\t\t\t');
			lightbox.show();
		});
	});
}

/*=====  End of Gallery  ======*/

/*===============================================
=            Attribute to Background            =
===============================================*/

var bgElements = [].slice.call(document.querySelectorAll('.attr-bg'));

if (bgElements.length > 0) {
	bgElements.forEach(function (element) {
		attrToBg(element);
	});
}

function attrToBg(element) {
	var bgPath = element.getAttribute('data-bg');
	element.style.backgroundImage = 'url(' + bgPath + ')';
}

/*=====  End of Attribute to Background  ======*/

window.onload = function () {

	var myLazyLoad = new LazyLoad({
		elements_selector: ".lazy",
		load_delay: 250
	});

	var section = window.location.hash.substring(2);

	if (document.getElementById(section)) {
		document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
};
//# sourceMappingURL=app.js.map
},{}],"../../../.nvm/versions/node/v10.4.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55211' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.nvm/versions/node/v10.4.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.map