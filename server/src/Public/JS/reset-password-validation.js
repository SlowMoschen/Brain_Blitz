const form = document.querySelector('form');
const errorBox = document.querySelector('.error-box');
const errorTimeout = 5000;

form.addEventListener('submit', async (e) => {
	try {
		e.preventDefault();
		const formData = new FormData(form);

		// check if passwords match
		if (formData.get('password') !== formData.get('password-confirm')) {
			errorBox.innerHTML = 'Passwörter stimmen nicht überein';
			removeError();
			return;
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
		if (!passwordRegex.test(formData.get('password')) || !passwordRegex.test(formData.get('password-confirm'))) {
			errorBox.innerHTML =
				'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.';
			removeError();
			return;
		}

		const body = {
			userID: formData.get('userID').toString(),
			token: formData.get('token').toString(),
			password: formData.get('password').toString(),
		};

		const response = await fetch(`/auth/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();

		if (response.ok) {
            errorBox.innerHTML = data.data.message;
            errorBox.style.color = 'green';
        } else {
            errorBox.innerHTML = data.message;
        }

        removeError();
	} catch (error) {
		console.log(error);
	} finally {
        form.reset();
    }
});

function removeError() {
	setTimeout(() => {
		errorBox.innerHTML = '';
	}, errorTimeout);
}
