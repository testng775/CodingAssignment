class PassengerPage{
constructor(page){
this.page=page;
this.emailField = 'role=textbox[name="email"]';
this.passwordField = 'role=textbox[name="password"]';
this.loginButton='button:has-text("Log in")';


}


async ryanairLoginSection(email, password)
{
//click Login Section
await this.page.getByRole('button', { name: 'Log in' }).click();

//Enter Email
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'email@email.com' }).click();
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'email@email.com' }).fill(email);
await this.page.waitForTimeout(5000);

//Enter Password
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Password' }).click();
await this.page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Password' }).fill(password);
await this.page.waitForTimeout(5000);

//Click Login Button
await this.page.locator('iframe').contentFrame().getByRole('button', { name: 'Log in' }).click();
await this.page.waitForTimeout(5000);

}

}
module.exports = PassengerPage;  
