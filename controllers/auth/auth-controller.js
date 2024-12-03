const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const sendEmailServices = require("../../helpers/services/send-email.services");

//register
const registerUser = async (req, res) => {
  // console.log("t");

  const { userName, email, password, role,rePassword } = req.body;

  try {
    console.log(req.body);

    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    // check password ==>
      if(!password)return res.json({
        success: false,
        message: "password is requered",
      });
      if(!rePassword)return res.json({
        success: false,
        message: "rePassword is requered",
      });
      if(rePassword!== password)return res.json({
        success: false,
        message: "rePassword must matching password",
      });

    //CONFIGRATION EMAIL ===>

    //genrate token to verify email

    const userToken =  jwt.sign({ email }, "sdhcbjdhs");

console.log(userToken);

    const isEmailSend = await sendEmailServices({
      to: email,
      subject: "email verification",
      message: `<h2>please clich on this link to verify your email</h2>
              <a href="https://shared-appolonia-regency-9272e2bf.koyeb.app/api/auth/verify-email?token=${userToken}">Verify Email</a>
          `,
    });
    console.log(isEmailSend);
    if (!isEmailSend)
      return res.json({
        success: false,
        message: "Email is not sent , please try again later,or check if your email success",
      });

    //HASH PASSSWORD==>

    const hashPassword = bcrypt.hashSync(
      password,
      +process.env.SALTE_ROUND || 12
    );
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role,
      rePassword
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful , please check verify before login",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured ",
      error:e.errmsg
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first ",
      });

      // check virefy ===>
    const checkUserVerify = await User.findOne({email, isEmailVerified:true });
    if (!checkUserVerify)
      return res.json({
        success: false,
        message: "please chick verify first to login ❤ ",
      });

    const checkPasswordMatch = bcrypt.compareSync(password, checkUser.password);
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
     "s,dmjcbkdhbscjh",
      // { expiresIn: "60m" }
    );
    console.log(token);
    

    //chenge user status
    const updateUserstatus = await User.findOneAndUpdate({ email, isLoggedIn:false },{isLoggedIn:true});

   return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = async(req, res) => {
   //chenge user status
  //  const updateUserstatus = await User.findOneAndUpdate({ email, isLoggedIn:false },{isLoggedIn:true});
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers.cookie);
    
  const {token} = req.cookies;
  console.log( req.cookies);
  console.log( token);
  
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user! token not found",
    });

    //decoded Data

    const decoded = jwt.verify(token,"s,dmjcbkdhbscjh")
 
    
    if(!decoded)res.status(401).json({
      success: false,
      message: "Unauthorised user! some thing roung check verify signther",
    });
    
    req.user = decoded;
    console.log(req.user);
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!...........",
    });
  }
};

//verify email
const verifyEmail = async (req, res) => {
  const { token } = req.query;
// console.log(token);

  const decodedData = jwt.verify(token, "sdhcbjdhs");
  //check user found
  // console.log(decodedData.email);
  

  const isUserfound = await User.findOneAndUpdate(
    { email: decodedData.email, isEmailVerified: false },
    { isEmailVerified: true },
    { new: true }
  );

  if (!isUserfound)
    return res.json({
      success: false,
      message: "<h2>User not found</h2>",
    });

  return res.json({
    success: true,
    message: "email verify successfuly ,please try login ❤ ",
    
  });
};

const reSendverify= async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.json({
      success: false,
      message: "email is requered",
    });
// console.log(token);
  const isUserfound = await User.findOneAndDelete(
    { email, isEmailVerified: false },
    
  );

 if (!isUserfound)
  return res.json({
    success: false,
    message: "User not found",
  });

return res.json({
  success: true,
  message: "Try Register agin To Send Link verifay ❤ ",
  
});
 
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyEmail,
  reSendverify
};
