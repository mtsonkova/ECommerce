class LoginPage {
    constructor (page) {
        this.page = page;
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.btnLogin = page.locator('[data-qa="login-button"]');  
           
    }

    async logIn(email, password){
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.btnLogin.click();
    }   
}

module.exports = {LoginPage};