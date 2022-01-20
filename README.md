
# Autheticating user using Passpost.js and OTP.


### Features
1. Autheticate the user using Facebook.
2. Autheticate the user using Gmail.
3. Authenticate the user using 2Factor otp authentication
4. Generate same token for all the above methods to interact with db securely 


### Built using
- NodeJs
- MongoDB

### Dependencies
- Passport.js
- mongoose
- jwt
- passport-facebook
- passport-google-oauth20

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
git clone https://github.com/Manjeete/passport-with-mongoose.git
cd passport-with-mongoose
npm install
```

### create .env file
```
DATABASE=<datbase_url>
FactorAPIKey=<2factor_api_key>
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
FACEBOOK_APP_ID=<facebook_app_id>
FACEBOOK_APP_SECRET=<facebook_app_secret>
JWT_SECRET_KEY=<jwt_secret_key>
```

```
npm start
```




