
const EmailService = require('../src/EmailService');
const MockProvider1 = require('../src/MockProvider1');
const MockProvider2 = require('../src/MockProvider2');

const provider1 = new MockProvider1();
const provider2 = new MockProvider2();
const emailService = new EmailService(provider1,provider2);

(async () => {
    const email = 'test@example.com';
    const result = emailService.sendEmail(email);
    console.log(`Email sending result: ${result ? 'Success' : 'Failure'}`);
})();
