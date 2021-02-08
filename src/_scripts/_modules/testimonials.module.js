const testimonials = () => {

	const testimonialSection = document.getElementById('testimonials');
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

};

export default testimonials;