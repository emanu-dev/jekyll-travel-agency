//TODO: Clean Up
/*===================================
=            Mobile Menu            =
===================================*/

const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

mobileMenuToggle.addEventListener('click', ()=>{
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
		
		allItems.forEach((item, index)=>{
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

/*=====  End of Slider  ======*/
