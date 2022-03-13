const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect from non-logged user
exports.protect = async (req, res, next) => {
  let token;
  // Get token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: err.message });
  }
};

// Only for certain roles
exports.roles = roles => {
  return async (req, res, next) => {
    const user = await User.findById(req.user);
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        status: "fail",
        msg: "You are not authorized to access this page"
      });
    }
    next();
  };
};

// Get User from token
exports.getUserFromToken = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json({ status: "success", data: { user } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "fail", msg: "Server Error" });
  }
};

// Signup
exports.signup = async (req, res) => {
  const { email, password, confirmPassword, role, roleId } = req.body;

  let user = await User.findOne({ email });
  try {
    if (user) {
      return res
        .status(400)
        .json({ status: "error", msg: "User already exists" });
    }
    user = await User.create({
      email,
      password,
      confirmPassword,
      role,
      roleId
    });
    res.status(201).json({ status: "success", data: { user } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password, user.password))) {
      res.status(400).json({
        status: "fail",
        message: "Incorrect Username or Password"
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      status: "success",
      data: {
        token,
        user
      }
    });
  } catch (err) {
    res.status(400).json({ status: "fail", msg: err.message });
  }
};
