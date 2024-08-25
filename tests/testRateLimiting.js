const MockProvider1 = require('../src/MockProvider1');
const MockProvider2 = require('../src/MockProvider2');
const EmailService = require('../src/EmailService');

const provider1 = new MockProvider1();
const provider2 = new MockProvider2();

const emailService = new EmailService(provider1, provider2);

// First attempt should send the email
emailService.sendEmail('test@example.com');

// Second attempt should hit the rate limit if attempted too quickly
setTimeout(() => {
    emailService.sendEmail('test@example.com');
}, 30000); // 30 seconds (should trigger the rate limit message)

setTimeout(() => {
    let res = emailService.sendEmail('test@example.com');
    if(res == 'Success'){
        console.log("Email Sent!!");
    }
}, 61000); // 61 seconds (should allow sending again)
