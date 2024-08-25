class EmailService {
    constructor(Provider1, Provider2) {
        this.Provider1 = Provider1;
        this.Provider2 = Provider2;
        this.sentEmails = new Set();
        this.lastSentTime = Date.now(); // Track the last sent time
        this.rateLimitInterval = 60000; // 1 minute (60,000 ms) rate limit
    }

    async sendEmail(email) {
        const currentTime = Date.now();

        if (currentTime - this.lastSentTime < this.rateLimitInterval) {
            console.log('Rate limit exceeded. Please wait before sending another email.');
            return false;
        }

        this.lastSentTime = currentTime; // Update the last sent time
        if (this.sentEmails.has(email)) {
            console.log(`Email ${email} already sent!!`);
            return false;
        }

        this.sentEmails.add(email);

        let success = false;
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts && !success) {
            success = await this.trySendEmail(email);
            attempts++;
            if (!success) {
                await this.delay(2 ** attempts * 1000); // Exponential backoff
            }
        }
        return success;
    }

    async trySendEmail(email) {
        if (await this.Provider1.sendEmail(email)) {
            return true;
        }

        if (await this.Provider2.sendEmail(email)) {
            return true;
        }

        return false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = EmailService;
