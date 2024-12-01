const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyEmail,
  reSendverify,
} = require("../../controllers/auth/auth-controller");
const passport = require("passport");
const { validationMiddleware } = require("../../controllers/Middleware/Validation.middleware");
const { signUpSchema, signinSchema } = require("../../controllers/auth/auth-validation");

const router = express.Router();

router.post("/register" ,registerUser);
router.get("/verify-email", verifyEmail);
router.post("/reVerify", reSendverify);

router.post("/login", validationMiddleware(signinSchema),loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});
//googel router ===>

router.get('/googel/callback', passport.authenticate("google",{
  successRedirect:process.env.CLIENT_URL,
  failureRedirect:"/login/faild"

}))
router.get("/google",passport.authenticate("google",["profile","email"]))
router.get("logout",(req,res)=>{
  req.logOut()
  res.redirect(process.env.CLIENT_URL)
})

module.exports = router;
