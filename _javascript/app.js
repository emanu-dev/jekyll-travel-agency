/*=================================
=            Polyfills            =
=================================*/

// Overwrites native 'firstElementChild' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
;(function(constructor) {
    if (constructor &&
        constructor.prototype &&
        constructor.prototype.firstElementChild == null) {
        Object.defineProperty(constructor.prototype, 'firstElementChild', {
            get: function() {
                var node, nodes = this.childNodes, i = 0;
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

const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

mobileMenuToggle.addEventListener('click', () => {
	mobileMenu.classList.toggle('--active');
	mobileMenuToggle.classList.toggle('--active');
	document.body.classList.toggle('--locked');
});

/*=====  End of Mobile Menu  ======*/

//TODO: Clean Up
/*==============================
=            Slider            =
==============================*/

const slider = document.getElementById('main-slider');

if (slider) {

	const slides = [].slice.call(slider.querySelectorAll('.slider__list-item'));
	const slideQty = parseInt(slides.length);
	const slideNav = document.getElementById('slider-nav');

	let activeSlide = 0;
	let interval = null;

	slides.forEach(()=>{
		slideNav.insertAdjacentHTML('beforeend','<div class=\'slider__nav-item\'></div>');
		slideNav.firstElementChild.classList.add('--active');
		slideNav.lastChild.addEventListener('click', (e) => {
			let allItems = [].slice.call(slideNav.childNodes);
			
			allItems.forEach((item, index) => {
				if (item == e.currentTarget) {
					item.classList.add('--active');
					activeSlide = index;
				} else {
					item.classList.remove('--active');
				}
			});

			slider.firstElementChild.style.left = ((activeSlide * 100) * -1).toString() + 'vw';
		});
	});


function slideAnimation() {
	let allItems = [].slice.call(slideNav.childNodes);
	activeSlide < allItems.length - 1 ? activeSlide += 1 : activeSlide = 0;
	
	let currentSlide = allItems[activeSlide];

	allItems.forEach((item)=>{
		if (item == currentSlide) {
			item.classList.add('--active');
		} else {
			item.classList.remove('--active');
		}
	});

	slider.firstElementChild.style.left = ((activeSlide * 100) * -1).toString() + 'vw';	
}

interval = setInterval(() => {
	slideAnimation();
}, 3000);


slider.addEventListener('mouseover', () =>{
	if (interval != null) {
		clearInterval(interval);
		interval = null;
	}	
});

slider.addEventListener('mouseleave', () =>{
	if (interval == null) {
		interval = setInterval(() => {
			slideAnimation();
		}, 3000);
	}	
});

}

/*=====  End of Slider  ======*/


/*==============================
=      Testimonials Slider    =
==============================*/
const testimonialSection = document.getElementById('testimonials-section');
if (testimonialSection) {

	const testimonialList = document.getElementById('testimonial-list');
	const testimonials = [].slice.call(testimonialList.querySelectorAll('.testimonials__item'));
	const testimonialsNav = document.getElementById('testimonials-nav');
	const testimonialsQty = parseInt(testimonials.length);

	let activeTestimonial = 0;
	let testimonialInterval = null;

	function testimonialAnimation() {
		testimonialList.style.left = ((activeTestimonial * 100) * -1).toString() + 'vw';	
	}

	testimonialInterval = setInterval(() => {
		activeTestimonial = (activeTestimonial < testimonialsQty - 1) ? activeTestimonial + 1 : 0;
		testimonialAnimation();
	}, 3000);


	testimonialSection.addEventListener('mouseover', (e) =>{
		e.stopImmediatePropagation();
		e.preventDefault();
		if (testimonialInterval != null) {
			clearInterval(testimonialInterval);
			testimonialInterval = null;
		}	
	});

	testimonialSection.addEventListener('mouseleave', (e) =>{
		e.stopImmediatePropagation();
		e.preventDefault();
		if (testimonialInterval == null) {
			testimonialInterval = setInterval(() => {
				activeTestimonial = (activeTestimonial < testimonialsQty - 1) ? activeTestimonial + 1 : 0;
				testimonialAnimation();
			}, 3000);
		}	
	});

	testimonialsNav.querySelector('.--right').addEventListener('click', () => {
		activeTestimonial = (activeTestimonial < testimonialsQty - 1) ? activeTestimonial + 1 : 0;
		testimonialAnimation();	
	});

	testimonialsNav.querySelector('.--left').addEventListener('click', () => {
		activeTestimonial = (activeTestimonial > 0) ? activeTestimonial - 1 : testimonialsQty - 1;
		testimonialAnimation();	
	});

}

/*=====  End of Testimonials Slider  ======*/



//TO DO: Clean Up
/*=======================================
=            Menu Navigation            =
=======================================*/

let menuItems = [].slice.call(document.querySelectorAll('.header__menu-item'));

if (window.location.pathname.split( '/' ).length < 3) {

	menuItems.forEach((item) => {
		item.firstElementChild.addEventListener('click', (e) => {
			e.stopPropagation();
			e.preventDefault();
			
			scrollView(item.getAttribute('data-section'));
		});
	});

	function scrollView(sectionId) {
	    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

/*=====  End of Menu Navigation  ======*/

//TO DO: Clean Up
/*=======================================
=            Form Validation            =
=======================================*/

VMasker(document.getElementById('input-phone')).maskPattern('(99) 999999999');

const submitBtn = document.getElementById('form-submit');

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const contactForm = document.getElementById('contact-form');

	cleanHighlightInput('contact-form');

	let formData = getData(contactForm);
	let verifyResponse = verifyData(formData);

	document.getElementById('form-hint').textContent = verifyResponse.message;
	
	if (verifyResponse.valid == false) {
		document.getElementById('form-hint').classList.add('--warning');
	}

});

function getData(form) {
	if (!form || form.nodeName !== "FORM") {
		return;
	}
	let group = {};
	let i, j, q = [];
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
    let valid = false;
    let message = ['Insira '];
    let response = {};

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
	const input = document.getElementById(id);
	input.classList.add('--warning');
}

function cleanHighlightInput(formid) {
	const formInputs = [].slice.call(document.getElementById(formid).childNodes);

	formInputs.forEach((element) => {
		if (element.nodeName != '#text') element.classList.remove('--warning');
	});
}

const fakeLabel = document.getElementById('fake-label');
const fakeLabelInput = document.getElementById('input-msg');

fakeLabelInput.addEventListener('input', (e) => {
	if (e.currentTarget.value.replace(/\s/g, '').length) {
		fakeLabel.style.visibility = 'hidden';
	}
});

fakeLabelInput.addEventListener('blur', (e) => {
	if (!e.currentTarget.value.replace(/\s/g, '').length) {
		fakeLabel.style.visibility = 'visible';
	}
});

/*=====  End of Form Validation  ======*/
