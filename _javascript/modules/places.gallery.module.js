const placesGallery = () => {
	let galleryItems = document.getElementById('place-gallery');

	if (galleryItems) {
		galleryItems = [].slice.call(galleryItems.children);
		galleryItems.forEach((item) => {
			item.addEventListener('click', (e) => {
				const lightbox = basicLightbox.create(`
					<img src="${e.currentTarget.getAttribute('data-media')}">
				`);
				lightbox.show();
			});
		});
	}
};

export default placesGallery;