const scrollView = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const navMenu = () => {
	let menuItems = [].slice.call(document.querySelectorAll('.header__menu-item'));

	if (window.location.pathname.split( '/' ).length < 3) {

		menuItems.forEach((item) => {
			item.firstElementChild.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				
				scrollView(item.getAttribute('data-section'));
				window.location.hash = `/${item.getAttribute('data-section')}`;
			});
		});
	}
};

export default navMenu;