//TO DO: Clean Up
/*=======================================
=            Form Validation            =
=======================================*/

const form = () => {
	VMasker(document.getElementById('input-phone')).maskPattern('(99) 999999999');

	const submitBtn = document.getElementById('form-submit');

	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		const contactForm = document.getElementById('contact-form');

		cleanHighlightInput('contact-form');

		let formData = getData(contactForm);
		let verifyResponse = verifyData(formData);

		document.getElementById('form-hint').textContent = verifyResponse.message;
		
		if (verifyResponse.valid == false) {
			document.getElementById('form-hint').classList.add('--warning');
		}

	});

	function getData(form) {
		if (!form || form.nodeName !== "FORM") {
			return;
		}
		let group = {};
		let i, j, q = [];
		for (i = form.elements.length - 1; i >= 0; i = i - 1) {
			if (form.elements[i].name === "") {
				continue;
			}
			switch (form.elements[i].nodeName) {
			case 'INPUT':
				switch (form.elements[i].type) {
				case 'text':
				case 'email':
				case 'hidden':
				case 'password':
				case 'button':
				case 'reset':
				case 'submit':
					q.push(form.elements[i].name + "=" + form.elements[i].value);
					group[form.elements[i].name] = form.elements[i].value;
					break;
				case 'checkbox':
				case 'radio':
				case 'file':
					break;
				}
				break;			 
			case 'TEXTAREA':
				group[form.elements[i].name] = form.elements[i].value;
				break;
			case 'SELECT':
				switch (form.elements[i].type) {
				case 'select-one':
					group[form.elements[i].name] = form.elements[i].value;
					break;
				case 'select-multiple':
					for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
						if (form.elements[i].options[j].selected) {
							group[form.elements[i].name] = form.elements[i].options[j].value;
						}
					}
					break;
				}
				break;
			case 'BUTTON':
				break;
			}
		}

		return group;
	}

	function verifyData(formData) {
	    let valid = false;
	    let message = ['Insira '];
	    let response = {};

	    if (!formData['name'].replace(/\s/g, '').length) {
	        highlightInput('input-name');
	        message.push('seu nome');
	        message.push(', ');
	        valid = false;
	    }

	    if (!formData['email'].replace(/\s/g, '').length) {
	        highlightInput('input-email');
	        message.push('seu email');
	        message.push(', ');
	        valid = false;
	    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
	        highlightInput('input-email');
	        message.push('um email valido');
	        message.push(', ');
	        valid = false;
	    }

	    if (!formData['phone'].replace(/\s/g, '').length) {
	        highlightInput('input-phone');
	        message.push('seu telefone');
	        message.push(', ');
	        valid = false;
	    }

	    if (!formData['type'].replace(/\s/g, '').length) {
	        highlightInput('input-type');
	        message.push('o tipo do evento');
	        message.push(', ');
	        valid = false;
	    }

		message.pop();
	    if (message.length > 3) message[message.length - 2] = ' e ';
	    message = message.join('');

	    response['valid'] = valid;
	    response['message'] = message;

	    return response;

	}

	function highlightInput(id) {
		const input = document.getElementById(id);
		input.classList.add('--warning');
	}

	function cleanHighlightInput(formid) {
		const formInputs = [].slice.call(document.getElementById(formid).childNodes);

		formInputs.forEach((element) => {
			if (element.nodeName != '#text') element.classList.remove('--warning');
		});
	}

	const fakeLabel = document.getElementById('fake-label');
	const fakeLabelInput = document.getElementById('input-msg');

	fakeLabelInput.addEventListener('input', (e) => {
		if (e.currentTarget.value.replace(/\s/g, '').length) {
			fakeLabel.style.visibility = 'hidden';
		}
	});

	fakeLabelInput.addEventListener('blur', (e) => {
		if (!e.currentTarget.value.replace(/\s/g, '').length) {
			fakeLabel.style.visibility = 'visible';
		}
	});
};

export default form;

/*=====  End of Form Validation  ======*/