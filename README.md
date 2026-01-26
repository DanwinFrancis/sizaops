# AR Automation - Landing Page

A clean, modern landing page for the AR Automation beta program signup using EmailJS for client-side email handling.

## Features

- 🎨 Modern, responsive design
- 📧 Email confirmation for users (via EmailJS)
- 🔔 Admin notification emails (via EmailJS)
- ✅ Form validation
- 🚀 Simple deployment (works as static site or with Node.js server)

## Setup Instructions

### 1. Install Dependencies (Optional - only if using Node.js server)

```bash
npm install
```

### 2. Set Up EmailJS

EmailJS handles all email functionality client-side, so no backend email configuration is needed!

1. **Sign up for EmailJS**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a free account (200 emails/month free)

2. **Create an Email Service**
   - Go to **Email Services** in the dashboard
   - Click **Add New Service**
   - Choose your email provider (Gmail, Outlook, SendGrid, etc.)
   - Follow the setup instructions for your provider
   - Note your **Service ID**

3. **Create Email Templates**

   You'll need to create **two templates**:

   **Template 1: User Confirmation Email**
   - Go to **Email Templates** → **Create New Template**
   - Template Name: "User Confirmation"
   - Subject: `Welcome to AR Automation Beta Program`
   - Content (HTML):
     ```html
     <!DOCTYPE html>
     <html>
     <head>
       <meta charset="UTF-8">
       <style>
         body {
           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
           line-height: 1.6;
           color: #333333;
           max-width: 600px;
           margin: 0 auto;
           padding: 20px;
           background-color: #f5f5f5;
         }
         .container {
           background-color: #ffffff;
           border-radius: 8px;
           padding: 40px;
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
         }
         .header {
           text-align: center;
           margin-bottom: 30px;
         }
         .logo {
           font-size: 28px;
           font-weight: bold;
           color: #2563eb;
           margin-bottom: 10px;
         }
         .greeting {
           font-size: 18px;
           color: #1f2937;
           margin-bottom: 20px;
         }
         .content {
           color: #4b5563;
           margin-bottom: 30px;
         }
         .features {
           background-color: #f9fafb;
           border-left: 4px solid #2563eb;
           padding: 20px;
           margin: 25px 0;
           border-radius: 4px;
         }
         .features ul {
           margin: 0;
           padding-left: 20px;
         }
         .features li {
           margin-bottom: 10px;
           color: #374151;
         }
         .highlight {
           color: #2563eb;
           font-weight: 600;
         }
         .footer {
           margin-top: 30px;
           padding-top: 20px;
           border-top: 1px solid #e5e7eb;
           text-align: center;
           color: #6b7280;
           font-size: 14px;
         }
         .signature {
           margin-top: 25px;
           color: #1f2937;
         }
         .signature-name {
           font-weight: 600;
           color: #2563eb;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <div class="header">
           <div class="logo">🚀 AR Automation</div>
         </div>
         
         <div class="greeting">
           Hi {{to_name}},
         </div>
         
         <div class="content">
           <p>Thank you for signing up to be an early adopter of our <span class="highlight">AR automation platform</span>!</p>
           
           <p>We're excited to have you on board. You've successfully registered for our beta program, and we'll be in touch soon with more details about early access.</p>
           
           <div class="features">
             <p style="margin-top: 0; font-weight: 600; color: #1f2937;">In the meantime, here's what you can expect:</p>
             <ul>
               <li><strong>Automated follow-up system</strong> that runs on autopilot</li>
               <li><strong>WhatsApp and email reminders</strong> with smart escalation</li>
               <li><strong>Clear audit trail</strong> of every follow-up</li>
               <li><strong>More time</strong> for your team to focus on high-value work</li>
             </ul>
           </div>
           
           <p>We'll notify you as soon as the beta program launches!</p>
           
           {{#message}}
           <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 4px;">
             <p style="margin: 0; color: #1e40af;"><strong>Note:</strong> {{message}}</p>
           </div>
           {{/message}}
         </div>
         
         <div class="signature">
           <p>Best regards,<br>
           <span class="signature-name">{{from_name}}</span><br>
           The AR Automation Team</p>
         </div>
         
         <div class="footer">
           <p>This email was sent to {{to_email}}</p>
         </div>
       </div>
     </body>
     </html>
     ```
   - Use variables: `{{to_email}}`, `{{to_name}}`, `{{from_name}}`, `{{message}}`
   - Note your **Template ID**

   **Template 2: Admin Notification Email**
   - Go to **Email Templates** → **Create New Template**
   - Template Name: "Admin Notification"
   - Subject: `New Beta Signup - AR Automation`
   - Content (HTML):
     ```html
     <!DOCTYPE html>
     <html>
     <head>
       <meta charset="UTF-8">
       <style>
         body {
           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
           line-height: 1.6;
           color: #333333;
           max-width: 600px;
           margin: 0 auto;
           padding: 20px;
           background-color: #f5f5f5;
         }
         .container {
           background-color: #ffffff;
           border-radius: 8px;
           padding: 40px;
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
         }
         .header {
           text-align: center;
           margin-bottom: 30px;
         }
         .logo {
           font-size: 28px;
           font-weight: bold;
           color: #2563eb;
           margin-bottom: 10px;
         }
         .alert-badge {
           display: inline-block;
           background-color: #2563eb;
           color: #ffffff;
           padding: 8px 16px;
           border-radius: 20px;
           font-size: 14px;
           font-weight: 600;
           margin-bottom: 20px;
         }
         .content {
           color: #4b5563;
           margin-bottom: 30px;
         }
         .info-box {
           background-color: #f9fafb;
           border-left: 4px solid #2563eb;
           padding: 20px;
           margin: 25px 0;
           border-radius: 4px;
         }
         .info-row {
           margin-bottom: 15px;
           padding-bottom: 15px;
           border-bottom: 1px solid #e5e7eb;
         }
         .info-row:last-child {
           margin-bottom: 0;
           padding-bottom: 0;
           border-bottom: none;
         }
         .info-label {
           font-weight: 600;
           color: #1f2937;
           margin-bottom: 5px;
           font-size: 14px;
           text-transform: uppercase;
           letter-spacing: 0.5px;
         }
         .info-value {
           color: #374151;
           font-size: 16px;
         }
         .highlight {
           color: #2563eb;
           font-weight: 600;
         }
         .footer {
           margin-top: 30px;
           padding-top: 20px;
           border-top: 1px solid #e5e7eb;
           text-align: center;
           color: #6b7280;
           font-size: 14px;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <div class="header">
           <div class="logo">🚀 AR Automation</div>
           <div class="alert-badge">New Beta Signup</div>
         </div>
         
         <div class="content">
           <p>A new user has signed up for the beta program:</p>
           
           <div class="info-box">
             <div class="info-row">
               <div class="info-label">Name</div>
               <div class="info-value highlight">{{fullName}}</div>
             </div>
             <div class="info-row">
               <div class="info-label">Email</div>
               <div class="info-value">{{user_email}}</div>
             </div>
             <div class="info-row">
               <div class="info-label">Signup Date</div>
               <div class="info-value">{{signup_date}}</div>
             </div>
           </div>
           
           {{#message}}
           <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 4px;">
             <p style="margin: 0; color: #1e40af;"><strong>Note:</strong> {{message}}</p>
           </div>
           {{/message}}
         </div>
         
         <div class="footer">
           <p>This notification was sent to {{to_email}}</p>
         </div>
       </div>
     </body>
     </html>
     ```
   - Use variables: `{{to_email}}`, `{{fullName}}`, `{{user_email}}`, `{{signup_date}}`, `{{message}}`
   - Note your **Template ID**

4. **Get Your Public Key**
   - Go to **Account** → **General** → **API Keys**
   - Copy your **Public Key**

5. **Configure the Landing Page**
   - Open `config.js`
   - Replace all placeholder values with your actual EmailJS credentials:
     ```javascript
     const EMAILJS_CONFIG = {
         PUBLIC_KEY: 'your-actual-public-key',
         SERVICE_ID: 'your-actual-service-id',
         TEMPLATE_ID_USER: 'your-user-template-id',
         TEMPLATE_ID_ADMIN: 'your-admin-template-id',
         ADMIN_EMAIL: 'your-admin-email@gmail.com'
     };
     ```

### 3. Run the Landing Page

**Option A: Using Node.js Server (Recommended for development)**
```bash
npm start
```
Then visit `http://localhost:3000`

**Option B: Static File (No server needed!)**
Since EmailJS works client-side, you can simply:
- Open `index.html` directly in a browser, OR
- Deploy to any static hosting (Netlify, Vercel, GitHub Pages, etc.)

## Project Structure

```
sizaops/
├── index.html          # Landing page HTML
├── styles.css          # Styling
├── script.js           # Frontend JavaScript (EmailJS integration)
├── config.js           # EmailJS configuration (UPDATE THIS!)
├── server.js           # Optional Express server for static files
├── package.json        # Dependencies
├── .env.example        # Environment variables template (optional)
└── README.md           # This file
```

## How It Works

1. **User visits landing page** → Sees platform summary and signup form
2. **User submits email** → JavaScript validates and sends via EmailJS
3. **EmailJS sends two emails**:
   - Confirmation email to the user
   - Notification email to admin
4. **User sees success message** → Form resets, ready for next signup

## Customization

### Change Email Templates

Edit your templates in the EmailJS dashboard, or modify the email parameters in `script.js`:
- User confirmation: `userEmailParams` object
- Admin notification: `adminEmailParams` object

### Modify Styling

Edit `styles.css` to change colors, fonts, or layout. CSS variables are defined at the top for easy customization.

### Update Content

Edit `index.html` to change the platform description, pricing, or any other content.

## Deployment

### Option 1: Static Hosting (Easiest!)

Since EmailJS works client-side, you can deploy to any static host:

**Netlify:**
1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Done! Your site is live

**Vercel:**
```bash
npm i -g vercel
vercel
```

**GitHub Pages:**
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch

### Option 2: Node.js Server

**Heroku:**
1. Create a Heroku app
2. Deploy: `git push heroku main`

**Railway/Render:**
1. Connect your repository
2. Deploy automatically

### Option 3: VPS/Cloud Server

1. Clone repository on server
2. Install Node.js and npm
3. Run: `npm start` or use PM2: `pm2 start server.js`

## Troubleshooting

**Email not sending?**
- Verify EmailJS credentials in `config.js` are correct
- Check EmailJS dashboard for service status
- Check browser console for error messages
- Ensure your EmailJS service is properly connected
- Check EmailJS usage limits (200/month on free plan)

**Form submission fails?**
- Check browser console for errors
- Verify `config.js` is loaded before `script.js` in `index.html`
- Ensure EmailJS SDK is loaded (check network tab)
- Verify all EmailJS IDs are correct

**EmailJS Template Variables:**
- Make sure template variables in EmailJS match the parameter names in `script.js`
- Common variables: `{{to_email}}`, `{{to_name}}`, `{{user_email}}`, `{{message}}`

## EmailJS Free Plan Limits

- 200 emails per month
- Perfect for beta signups and early testing
- Upgrade to paid plans for higher limits

## License

ISC
