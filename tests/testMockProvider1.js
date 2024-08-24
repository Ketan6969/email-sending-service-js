const MockProvider1 = require('../src/MockProvider1');
const provider1 = new MockProvider1();  

for (let i=1;i<11;i++){
    const email = `email${1}@example.com`;
    const result = provider1.sendEmail(email);
    console.log(`Email ${i} send by Provider 1: ${result ? 'Success' : 'Failure'}`);
}