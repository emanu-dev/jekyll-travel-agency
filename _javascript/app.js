/*===============================
=            Imports            =
===============================*/

import mobileMenu from './modules/mobile.menu.module';
import slider from './modules/slider.module';
import testimonials from './modules/testimonials.module';
import scrollView from './modules/scroll.view.module';
import navMenu from './modules/nav.menu.module';
import form from './modules/form.module';
import placesGallery from './modules/places.gallery.module';
import attrToBg from './modules/attrbg.module';

/*=====  End of Imports  ======*/


/*=================================
=            Polyfills            =
=================================*/

// Overwrites native 'firstElementChild' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
;(function(constructor) {
    if (constructor &&
        constructor.prototype &&
        constructor.prototype.firstElementChild == null) {
        Object.defineProperty(constructor.prototype, 'firstElementChild', {
            get: function() {
                var node, nodes = this.childNodes, i = 0;
                while (node = nodes[i++]) {
                    if (node.nodeType === 1) {
                        return node;
                    }
                }
                return null;
            }
        });
    }
})(window.Node || window.Element);

/*=====  End of Polyfills  ======*/

mobileMenu();
slider();
testimonials();
navMenu();
form();
placesGallery();

window.onload = () => {

	const bgElements = [].slice.call(document.querySelectorAll('.attr-bg'));

	if (bgElements.length > 0) {
		bgElements.forEach((element) => {
			attrToBg(element);
		});
	}	
	
	const myLazyLoad = new LazyLoad({
		elements_selector: ".lazy",
	    load_delay: 250
	});

	const section = window.location.hash.substring(2);

	if (document.getElementById(section)) {
		document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
};
