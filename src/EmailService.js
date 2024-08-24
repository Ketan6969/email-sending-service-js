class EmailService {
    constructor(Provider1, Provider2) {
        this.Provider1 = Provider1;
        this.Provider2 = Provider2;
        this.sentEmails = new Set(); // Capitalized Set
    }

    async sendEmail(email) {
        if (this.sentEmails.has(email)) {
            console.log(`Email ${email} already sent!!`);
            return false;
        }

        this.sentEmails.add(email); // Corrected method call

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
        if (this.Provider1.sendEmail(email)) {
            return true;
        }

        if (this.Provider2.sendEmail(email)) {
            return true;
        }

        return false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = EmailService;
