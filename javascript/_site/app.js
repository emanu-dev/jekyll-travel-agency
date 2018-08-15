'use strict';

var _test = require('modules/test.module');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
