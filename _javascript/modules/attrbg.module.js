const attrToBg = (element) => {
	const bgPath = element.getAttribute('data-bg');
	element.style.backgroundImage = `url(${bgPath})`;
};

export default attrToBg;