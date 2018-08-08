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
