document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the form fields
    const name = document.getElementById('sender-name');
    const email = document.getElementById('sender-email');
    const message = document.getElementById('sender-subject');

    // Error message container
    let errorMessage = false;

    // Clear previous error messages
    document.getElementById('name-error').innerText = '';
    document.getElementById('email-error').innerText = '';
    document.getElementById('message-error').innerText = '';

    // Check if the name field is empty
    if (name.value.trim() === '') {
        document.getElementById('name-error').innerText = 'Name is required.';
        errorMessage = true;
    }

    // Check if the email field is empty or if the email format is invalid
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === '') {
        document.getElementById('email-error').innerText = 'Email is required.';
        errorMessage = true;
    } else if (!emailRegex.test(email.value.trim())) {
        document.getElementById('email-error').innerText = 'Please enter a valid email address.';
        errorMessage = true;
    }

    // Check if the message field is empty
    if (message.value.trim() === '') {
        document.getElementById('message-error').innerText = 'Message is required.';
        errorMessage = true;
    }

    // If there are no errors, submit the form
    if (!errorMessage) {
        alert('Form submitted successfully!');
        this.submit();
    }
});
