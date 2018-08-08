/*===================================
=            Mobile Menu            =
===================================*/

const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

mobileMenuToggle.addEventListener('click', ()=>{
	mobileMenu.classList.toggle('--active');
	mobileMenuToggle.classList.toggle('--active');
});

/*=====  End of Mobile Menu  ======*/
