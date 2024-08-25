const MockProvider1 = require('../src/MockProvider1');
const MockProvider2 = require('../src/MockProvider2');
const EmailService = require('../src/EmailService');

const provider1 = new MockProvider1();
const provider2 = new MockProvider2();

const emailService = new EmailService(provider1, provider2);

emailService.sendEmail('test@example.com').then(() => {
    console.log('Status:', emailService.getStatus('test@example.com'));
});

setTimeout(() => {
    emailService.sendEmail('test@example.com').then(() => {
        console.log('Status after rate limit:', emailService.getStatus('test@example.com'));
    });
}, 30000); // 30 seconds
