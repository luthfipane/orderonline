### Prerequisites

install cypress via npm
  ```sh
  cd /your/project/path
  ```
  ```sh
  npm install cypress --save-dev
  ```

### Running the cypress
To run a command, you'll need to prefix each command in order to properly locate the cypress executable.

    npx cypress open

* click E2E Testing
* select Chrome
* click Start E2E Testing In Chrome
* there is 5 List scenario and you can click one of them

### List of feature :
1. Login (Login.cy.js)
2. Register (RegisterActivate.cy.js)
3. Forgot Password (ForgotPassword.cy.js)
4. Onboarding - Regular User (OnboardingRegularUser.cy.js)
5. Onboarding - Corporate User (OnboardingCorpAccount.cy.js)

### API: 
- Register (/API/Regist.cy.js)
- Login (/API/Login.cy.js)
- Reset Password (/API/ResetPassword.cy.js)
#### Negative Case
- Using Unregister Email For Login (WrongEmailLogin.cy.js)
- Register Account Using Email Already Exist (RegistUsingExistingAccount.cy.js)