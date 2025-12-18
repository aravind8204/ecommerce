const userModel = require("../models/userModel.js");
const { TryCatch } = require("../middlewares/TryCatch.js");
const { hashPassword, comparePassword } = require("../utils/hashing.js");
const { sendOtp } = require("../utils/sendOtp.js");
const otpModel = require("../models/otpModel.js");
const jwt = require("jsonwebtoken");

// ------------------------------------------------------------
// Create User
// ------------------------------------------------------------
const createUser = TryCatch(async (req, res) => {
    const { name, email, mobileNumber, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
        name,
        email,
        mobileNumber,
        password: hashedPassword
    });

    return res.status(201).json({ message: "User created successfully", userData: user });
});

// ------------------------------------------------------------
// Login
// ------------------------------------------------------------
const userLogin = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const checkPassword = await comparePassword({
        userPassword: password,
        dbPassword: user.password
    });

    if (!checkPassword) {
        return res.status(401).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"});

    return res.status(200).json({ token, message: "Login successful" });
});

// ------------------------------------------------------------
// Find User
// ------------------------------------------------------------
const getUser = TryCatch( async(req, res) => {
    const {userId} = req.user;

    const user = await userModel.findById({_id:userId});

    res.status(200).json({user,message:"user found"});
})

// ------------------------------------------------------------
// Send OTP
// ------------------------------------------------------------
const sendOTP = TryCatch( async(req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(Math.random() * 1000000);

    // remove old OTP
    await otpModel.deleteOne({ email });

    await sendOtp({
        name: user.name,
        email,
        subject: "store",
        otp
    });

    await otpModel.create({ email, otp });

    return res.status(200).json({ message: "OTP sent successfully" });
});

// ------------------------------------------------------------
// Verify OTP
// ------------------------------------------------------------
const verifyOTP = TryCatch( async(req, res) => {
    const { email, otp } = req.body;

    const OTP = await otpModel.findOne({ email });

    if (!OTP) {
        return res.status(404).json({ message: "OTP not found" });
    }

    if (OTP.otp === parseInt(otp,10)) {
        return res.status(200).json({ message: "OTP verified successfully" });
    }

    return res.status(401).json({ message: "Verification failed" });
});

// ------------------------------------------------------------
// Update Password
// ------------------------------------------------------------
const updatePassword = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await hashPassword(password);

    await userModel.updateOne(
        { email },
        { $set: { password: hashedPassword } }
    );

    return res.status(200).json({ message: "Password updated" });
});

// ------------------------------------------------------------
// Delete User
// ------------------------------------------------------------
const deleteUser = TryCatch(async (req, res) => {
    const {userId} = req.user;

    await userModel.deleteOne({ _id: userId });

    return res.status(200).json({ message: "User deleted" });
});

module.exports = {
    createUser,
    userLogin,
    deleteUser,
    sendOTP,
    verifyOTP,
    updatePassword,
    getUser
};
