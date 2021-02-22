const init = () => {
	const fakeLabel = document.getElementById('fake-label');
	const fakeLabelInput = document.getElementById('input-msg');
	const formSubmit = document.getElementById('form-submit');

	formSubmit.addEventListener('click', (e) => {
		e.preventDefault();
		validate();
	})

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

const validate = () => {
	const contactForm = document.getElementById('contact-form');

	cleanHighlightInput('contact-form');

	let formData = getData(contactForm);
	let verifyResponse = verifyData(formData);

	document.getElementById('form-hint').textContent = verifyResponse.message;
	
	if (verifyResponse.valid === false) {
		document.getElementById('form-hint').classList.add('--warning');
	}else{
		send(formData, contactForm);
	}	
};


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
    let valid = true;
    let message = ['Insert '];
    let response = {};

    if (!formData['name'].replace(/\s/g, '').length) {
        highlightInput('input-name');
        message.push('your name');
        message.push(', ');
        valid = false;
    }

    if (!formData['email'].replace(/\s/g, '').length) {
        highlightInput('input-email');
        message.push('your email');
        message.push(', ');
        valid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
        highlightInput('input-email');
        message.push('a valid email');
        message.push(', ');
        valid = false;
    }

    if (!formData['phone'].replace(/\s/g, '').length) {
        highlightInput('input-phone');
        message.push('your phone');
        message.push(', ');
        valid = false;
    }

    if (!formData['type'].replace(/\s/g, '').length) {
        highlightInput('input-type');
        message.push('the event type');
        message.push(', ');
        valid = false;
    }

	message.pop();
    if (message.length > 3) message[message.length - 2] = ' and ';
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
		if (element.nodeName !== '#text') element.classList.remove('--warning');
	});
}

const send = (contactForm) => {

	contactForm.classList.add('--sending');

	window.setInterval(() => {
		contactForm.classList.remove('--sending');
	}, 1000);

};

export default {init, validate};