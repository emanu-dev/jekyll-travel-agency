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
		    }, 800);

		    window.location.hash = `/${sectionList[currentSection].getAttribute('id')}`;
		    document.getElementById(sectionList[currentSection].getAttribute('id')).scrollIntoView({ behavior: 'smooth', block: 'start' });

	    }


	});


	// window.addEventListener('touchstart', (e) => {
	// 	startY = e.touches[0].clientY;
	// });

	// window.addEventListener('touchmove', (e) => {
	//     if (canScroll) {
	//     	canScroll = false;
	// 	    let currentY = e.touches[0].clientY;

	// 	    if (currentY > startY){
	// 	        currentSection = Math.max(min, Math.min(currentSection - 1, max));
	// 	    }else if(currentY < startY){
	// 	        currentSection = Math.max(min, Math.min(currentSection + 1, max));
	// 	    }

	// 	    console.log(Math.sign(currentY - startY));
		    
	// 	    setTimeout(()=>{
	// 	    	canScroll = true;
	// 	    	console.log(canScroll);
	// 	    }, 800);		    

	// 	    let targetElement = document.getElementById(sectionList[currentSection].getAttribute('id') + '-mobile');
	// 	    if (targetElement == null)  {
	// 	    	targetElement = document.getElementById(sectionList[currentSection].getAttribute('id'));
	// 	    }

	// 		console.log(currentSection, targetElement, (targetElement==null));
	// 		window.location.hash = `/${targetElement.getAttribute('id')}`;
	// 		targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	//     }	    
	// });


};

export default navMenu;