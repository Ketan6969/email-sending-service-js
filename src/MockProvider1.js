class MockProvider1 {
    sendEmail(email){
        return Math.random() < 0.7;
    }
}
module.exports = MockProvider1;