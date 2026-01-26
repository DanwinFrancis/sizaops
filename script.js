document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
        try {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized successfully');
        } catch (error) {
            console.error('Error initializing EmailJS:', error);
        }
    } else {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS SDK not loaded. Check if the CDN script is accessible.');
        }
        if (typeof EMAILJS_CONFIG === 'undefined') {
            console.error('EmailJS configuration not found. Please check config.js');
        }
    }

    const form = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (!fullName) {
            showMessage('Please enter your full name.', 'error');
            return;
        }
        
        if (!email) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Validate EmailJS is loaded and configured
        if (typeof emailjs === 'undefined') {
            showMessage('Email service is not available. Please refresh the page and try again.', 'error');
            console.error('EmailJS SDK not loaded. Check browser console and network tab.');
            return;
        }

        if (typeof EMAILJS_CONFIG === 'undefined') {
            showMessage('Email service is not configured. Please contact the administrator.', 'error');
            console.error('EMAILJS_CONFIG is undefined. Check if config.js is loaded.');
            return;
        }

        if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            showMessage('Email service is not configured. Please contact the administrator.', 'error');
            console.error('EmailJS Public Key not set. Please update config.js');
            return;
        }

        if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
            showMessage('Email service is not configured. Please contact the administrator.', 'error');
            console.error('EmailJS Service ID not set. Please update config.js');
            return;
        }

        if (!EMAILJS_CONFIG.TEMPLATE_ID_USER || EMAILJS_CONFIG.TEMPLATE_ID_USER === 'YOUR_TEMPLATE_ID_USER') {
            showMessage('Email service is not configured. Please contact the administrator.', 'error');
            console.error('EmailJS User Template ID not set. Please update config.js');
            return;
        }

        // Disable form during submission
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        messageDiv.style.display = 'none';

        try {
            // Send confirmation email to user
            // Note: EmailJS requires the recipient email to be set in the service configuration
            // Make sure your EmailJS service is configured to use template parameters for "To Email"
            const userEmailParams = {
                to_email: email,        // This must match the variable name in your EmailJS service config
                reply_to: email,        // Also set reply_to in case service uses this
                to_name: fullName,
                from_name: 'The SizaOps Team',
                subject: 'Welcome to AR Automation Beta Program',
                message: `Thank you for signing up to be an early adopter of our AR automation platform!

We're excited to have you on board. You've successfully registered for our beta program, and we'll be in touch soon with more details about early access.

In the meantime, here's what you can expect:
- Automated follow-up system that runs on autopilot
- WhatsApp and email reminders with smart escalation
- Clear audit trail of every follow-up
- More time for your team to focus on high-value work

We'll notify you as soon as the beta program launches!

Best regards,
The AR Automation Team`,
            };

            // Send notification email to admin
            const adminEmail = typeof EMAILJS_CONFIG !== 'undefined' ? EMAILJS_CONFIG.ADMIN_EMAIL : 'admin@example.com';
            const adminEmailParams = {
                to_email: adminEmail,    // This must match the variable name in your EmailJS service config
                reply_to: adminEmail,   // Also set reply_to in case service uses this
                to_name: 'Admin',
                from_name: 'AR Automation Signup',
                subject: 'New Beta Signup - AR Automation',
                fullName: fullName,
                user_email: email,
                signup_date: new Date().toLocaleString(),
                message: `A new user has signed up for the beta program:

Name: ${fullName}
Email: ${email}
Date: ${new Date().toLocaleString()}`,
            };

            // Log the parameters being sent (without sensitive data)
            console.log('Email parameters:', {
                userEmail: email.substring(0, 3) + '***',
                adminEmail: adminEmail.substring(0, 3) + '***',
                fullName: fullName
            });

            // Send both emails
            console.log('Sending emails...', {
                serviceId: EMAILJS_CONFIG.SERVICE_ID,
                userTemplate: EMAILJS_CONFIG.TEMPLATE_ID_USER,
                adminTemplate: EMAILJS_CONFIG.TEMPLATE_ID_ADMIN,
                userEmailParams: { ...userEmailParams, to_email: email.substring(0, 3) + '***' }
            });
            
            // IMPORTANT: In your EmailJS dashboard, make sure your Email Service is configured:
            // 1. Go to Email Services → Edit your service
            // 2. In the "To Email" field, use: {{to_email}} (not a static email)
            // 3. Save the service
            
            // Send user confirmation email
            const userEmailResult = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID, 
                EMAILJS_CONFIG.TEMPLATE_ID_USER, 
                userEmailParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            console.log('User confirmation email sent:', userEmailResult);
            
            // Send admin notification email (don't fail if this fails)
            try {
                const adminEmailResult = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID, 
                    EMAILJS_CONFIG.TEMPLATE_ID_ADMIN, 
                    adminEmailParams,
                    EMAILJS_CONFIG.PUBLIC_KEY
                );
                console.log('Admin notification email sent:', adminEmailResult);
            } catch (adminError) {
                console.warn('Admin notification email failed (but user email was sent):', adminError);
                // Don't throw - user email was successful
            }

            showMessage(
                `Thank you, ${fullName}! We've sent a confirmation email to ${email}. Please check your inbox.`,
                'success'
            );
            form.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            
            // Show more specific error message
            let errorMessage = 'Something went wrong while sending the email. Please try again later.';
            
            if (error.text) {
                errorMessage = `Error: ${error.text}`;
                // Provide helpful guidance for common errors
                if (error.text.includes('recipients address is empty') || error.text.includes('recipient')) {
                    errorMessage = `Email configuration error: The recipient email is not set. Please check your EmailJS service configuration. In your EmailJS dashboard, go to Email Services → Edit your service → Set "To Email" field to: {{to_email}}`;
                }
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
                if (error.message.includes('recipients address is empty') || error.message.includes('recipient')) {
                    errorMessage = `Email configuration error: The recipient email is not set. Please check your EmailJS service configuration. In your EmailJS dashboard, go to Email Services → Edit your service → Set "To Email" field to: {{to_email}}`;
                }
            } else if (error.status) {
                errorMessage = `Error ${error.status}: ${error.text || 'Failed to send email'}`;
            }
            
            showMessage(errorMessage, 'error');
        } finally {
            // Re-enable form
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
