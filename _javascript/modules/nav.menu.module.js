const scrollView = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const navMenu = () => {
	let menuItems = [].slice.call(document.querySelectorAll('.header__menu-item'));
	let currentSection = 0;
	const sectionList = [].slice.call(document.getElementById('main').querySelectorAll('.sec'));
	const min = 0;
	const max = (sectionList.length - 1);
	let canScroll = true;	

	if (window.location.pathname.split( '/' ).length < 3) {

		menuItems.forEach((item, index) => {
			item.firstElementChild.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				
				scrollView(item.getAttribute('data-section'));
				currentSection = index;
				window.location.hash = `/${item.getAttribute('data-section')}`;
			});
		});
	}

	window.addEventListener('wheel', (e) => {
	    e.preventDefault();
	
	    console.log(canScroll);

	    if (canScroll) {
	    	canScroll = false;
		    if (e.deltaY < 0) {
		        currentSection = Math.max(min, Math.min(currentSection - 1, max));
		        
		    }
		    if (e.deltaY > 0) {
		        currentSection = Math.max(min, Math.min(currentSection + 1, max));
		    }

		    setTimeout(()=>{
		    	canScroll = true;
		    	console.log(canScroll);
		    }, 800);

		    console.log(sectionList[currentSection].getAttribute('id'));
		    window.location.hash = `/${sectionList[currentSection].getAttribute('id')}`;
		    document.getElementById(sectionList[currentSection].getAttribute('id')).scrollIntoView({ behavior: 'smooth', block: 'start' });



	    }


	});


	window.addEventListener('touchmove', (e) => {
	    e.preventDefault();
	    var currentY = e.originalEvent.touches[0].clientY;
	    if(currentY > lastY){
	        console.log('scrolling up');
	        console.log('Samuel L. Jackson says: Go down MOTHERFUCKER');
	        currentSection = Math.max(min, Math.min(currentSection - 1, max));
	    }else if(currentY < lastY){
	        console.log('scrolling down');
	        console.log('Samuel L. Jackson says: Go up MOTHERFUCKER');
	        currentSection = Math.max(min, Math.min(currentSection + 1, max));
	    }
	    lastY = currentY;

	    console.log(currentSection);
	    window.location.hash = `/${sectionList[currentSection].getAttribute('id')}`;
	    document.getElementById(sectionList[currentSection].getAttribute('id')).scrollIntoView({ behavior: 'smooth', block: 'start' });
	});


};

export default navMenu;