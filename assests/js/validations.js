document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form[data-netlify="true"], form[netlify]');

    if (form) {
        // Add novalidate attribute to prevent HTML5 validation
        form.setAttribute('novalidate', '');

        // Form elements
        const nameInput = form.querySelector('#sender-name');
        const emailInput = form.querySelector('#sender-email');
        const messageInput = form.querySelector('#sender-subject');
        const submitButton = form.querySelector('[type="submit"]');

        // Error elements
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        // Form feedback element (create if doesn't exist)
        let formFeedback = form.querySelector('.form-feedback');
        if (!formFeedback) {
            formFeedback = document.createElement('div');
            formFeedback.className = 'form-feedback';
            form.appendChild(formFeedback);
        }

        // Clear all errors and feedback
        function clearErrors() {
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';

            // Remove error classes from inputs
            nameInput.closest('.data-container').classList.remove('error');
            emailInput.closest('.data-container').classList.remove('error');
            messageInput.closest('.data-container').classList.remove('error');
        }

        // Validate name field
        function validateName() {
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                nameInput.closest('.data-container').classList.add('error');
                return false;
            }
            return true;
        }

        // Validate email field
        function validateEmail() {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                emailInput.closest('.data-container').classList.add('error');
                return false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.closest('.data-container').classList.add('error');
                return false;
            }
            return true;
        }

        // Validate message field
        function validateMessage() {
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required';
                messageInput.closest('.data-container').classList.add('error');
                return false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message should be at least 10 characters';
                messageInput.closest('.data-container').classList.add('error');
                return false;
            }
            return true;
        }

        // Validate entire form
        function validateForm() {
            clearErrors();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            return isNameValid && isEmailValid && isMessageValid;
        }

        // Real-time validation on input
        nameInput.addEventListener('input', function () {
            clearErrors();
            validateName();
        });

        emailInput.addEventListener('input', function () {
            clearErrors();
            validateEmail();
        });

        messageInput.addEventListener('input', function () {
            clearErrors();
            validateMessage();
        });

        // Form submission handler
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                // Show loading state
                submitButton.disabled = true;
                submitButton.classList.add('loading');

                // Create a FormData object
                const formData = new FormData(form);

                // For Netlify Forms, we need to add the form-name attribute
                if (!formData.has('form-name')) {
                    const formName = form.getAttribute('name') || 'contact';
                    formData.append('form-name', formName);
                }

                // Submit to Netlify
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                })
                    .then(response => {
                        if (response.ok) {
                            // Success
                            form.reset();
                            formFeedback.textContent = 'Thank you for your message! We will get back to you soon.';
                            formFeedback.classList.add('success');

                            // Hide success message after 5 seconds
                            setTimeout(() => {
                                formFeedback.classList.remove('success');
                                formFeedback.textContent = '';
                            }, 5000);
                        } else {
                            throw new Error('Network response was not ok');
                        }
                    })
                    .catch(error => {
                        // Error
                        formFeedback.textContent = 'There was a problem submitting your form. Please try again later.';
                        formFeedback.classList.add('error');
                        console.error('Form submission error:', error);
                    })
                    .finally(() => {
                        // Reset button state
                        submitButton.disabled = false;
                        submitButton.classList.remove('loading');
                    });
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });

        // Add form-name field if not present (required for Netlify)
        if (!form.querySelector('[name="form-name"]')) {
            const formName = form.getAttribute('name') || 'contact';
            const formNameInput = document.createElement('input');
            formNameInput.type = 'hidden';
            formNameInput.name = 'form-name';
            formNameInput.value = formName;
            form.appendChild(formNameInput);
        }
    }
});