const mobileMenu = () => {
	const mobileMenu = document.getElementById('mobile-menu');
	const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

	mobileMenuToggle.addEventListener('click', () => {
		mobileMenu.classList.toggle('--active');
		mobileMenuToggle.classList.toggle('--active');
		document.body.classList.toggle('--locked');
	});	

	window.addEventListener('resize', function(){
	   if(window.innerWidth > 800){
			mobileMenu.classList.remove('--active');
			mobileMenuToggle.classList.remove('--active');	   	
	      document.body.classList.remove('--locked');
	   }
	});

};

export default mobileMenu;
