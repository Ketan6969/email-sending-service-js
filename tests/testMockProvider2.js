const MockProvider2 = require("../src/MockProvider2");
const Provider2 = new MockProvider2();

for (let i = 11;i <= 10; i++){
    const email = `email${i}@example.com`;
    const result = Provider2.sendEmail(email);
    console.log(`Email ${i} sent by Email Provider 2 ${result ? 'Success' : 'Failure'}`);
}