const { callbackPromise } = require("nodemailer/lib/shared");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy





passport.use(new GoogleStrategy({
    clientID: "996319350911-mmnqdh02j1l5uc464eeehbdck0k8psui.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://www.example.com/auth/google/callback",
    scope:['email','profile']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
passport.serializeUser((user,done)=>{
    done(null ,user)
})
passport.deserializeUser((user,done)=>{
    done(null ,user)
})