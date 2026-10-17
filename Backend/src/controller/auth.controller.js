const User = require("../schema/user.schema");
const Role = require("../schema/role.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const crypto = require("crypto");
const sendOtpEmail = require("../utils/sendEmails.js");
const generateOtp = require("../utils/otpGenerator");
const tokenBlacklistModel = require("../schema/blacklist.schema");
 

async function registerUser(req, res) {
    try {
        const { username, email, password, adminSecretKey,role } = req.body;

        //validating data // payload
        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: "Please provide all the required fields." });
        }

        //determine target role based on secret key
        let targetRoleName = role;

        if (adminSecretKey) {
            if (adminSecretKey === process.env.ADMIN_SECRET_KEY) {
                targetRoleName = "admin";
            } else {
                return res.status(403).json({ error: "Invalid admind secret key" });
            }
        }
        else if(role){
            if(role == "creator"){
                targetRoleName = "creator";
            } else if(role ==="admin"){
                res.status(403).json({error:"Admin role requires a valid key;"});
            }
        }

        //find the role in mongodb to get its object id

        const roleDoc = await Role.findOne({ name: targetRoleName });
        if (!roleDoc) {
            return res.status(500).json({ error: "Role not found." });
        }


        //check if user already exist

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser && existingUser.username === username &&existingUser.isVerified ) {
            return res.status(400).json({ error: "this username already exist" });
            
        } else if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ error: "Email already exist" });
        }

        //1.checking both field simultaneuly // paralled check

        const [userWithUserName, userWithEmail] = await Promise.all([
            User.findOne({ username }),
            User.findOne({ email })
        ]);


        //1. check if verified account hold either identifier
        if (userWithUserName && userWithUserName.isVerified) {
            return res.status(400).json({ error: "This username is already taken" });
        }
        if (userWithEmail && userWithEmail.isVerified) {
            return res.status(400).json({ error: "This email is already taken" });
        }

        //2. checing if unverified registration hold either verification
        if (userWithUserName && userWithUserName.email !== email) {
            return res.status(400).json({ error: "This username is pending verification by another user." });
        }
        if (userWithEmail && userWithEmail.username !== username) {
            return res.status(400).json({ error: "This email is pending verification with a different username." });
        }
        const existingUnverifiedUser = userWithEmail || userWithUserName;


        //hash otp
        const { rawOtp, hashedOtp } = generateOtp();
        const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 min

        //sending otp

        await sendOtpEmail(email, rawOtp);

        //hash the password
        const saltRound = 11;
        const hashedPassword = await bcrypt.hash(password, saltRound);


        // create the new user and assign the roleObjectId
        let targetUser;
        //reregistration 
        if (existingUnverifiedUser) {
            existingUnverifiedUser.password = hashedPassword;
            existingUnverifiedUser.role = roleDoc._id;
            existingUnverifiedUser.otp = hashedOtp;
            existingUnverifiedUser.otpExpires = otpExpire;
            targetUser = await existingUnverifiedUser.save();

        } else {
            targetUser = await User.create({
                username,
                email,
                password: hashedPassword,
                role: roleDoc._id,
                otp: hashedOtp,
                isVerified: false,
                otpExpires: otpExpire
            });

            res.status(200).json({
                message: `Verification code sent to your email.`,
                email: targetUser.email,
                username,
                role:targetRoleName
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function verifyOtp(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required." });
        }

        const cleanEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: cleanEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: "Account is already verified. Please log in." });
        }

        if (!user.otpExpires || user.otpExpires < new Date()) {
            console.log(user.otpExpires, new Date());
            return res.status(400).json({ error: "OTP has expired. Please register or request a new code." });
        }

        //compare hash
        // const {rawOtp , hashedOtp} = generateOtp();
        const hashedInputOtp = crypto.createHash('sha256').update(otp).digest('hex');
        if (hashedInputOtp !== user.otp) {
            return res.status(400).json({ error: "Invalid verification code." });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({
            message: "Account verified and registered successfully!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate("role");


        if (!user) {
            return res.status(404).json({
                message: "user not found. Register first."
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const tokenPayLoad = {
            user: user._id,
            role: user.role.name,
            username: user.username
        }

        const token = jwt.sign(
            tokenPayLoad, process.env.JWT_SECRET, { expiresIn: "1d" }
        )

        //send token via cookie (or json response)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "user logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role.name
            }
        })
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ message: error.message || "Internal server error" })
    }

}

function getCurrentUser(req, res) {
    const { user, username, role } = req.user;

    return res.status(200).json({
        user: { id: user, username, role }
    });
}

async function googleAuth(req, res) {
    try {
        const { token } = req.body;   //token sent via frontend

        //verify google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const PayLoad = ticket.getPayload();
        const { email, name, sub: googleId } = PayLoad;
        console.log(email, name, googleId);

        let user = await User.findOne({ email }).populate("role");
        //track if  this is a new user
        let isNewUser = false;
        if (!user) {
            // new user ,find the default "user" role id
            const defaultRole = await Role.findOne({ name: "user" });
            if (!defaultRole) {
                return res.status(500).json({ error: "Default role not configured." });
            }

            //create a password less acount
            user = await User.create({
                username: name,
                email,
                role: defaultRole._id,
                googleId
            });


            //populate the role for jwt payload

            user = await User.findById(user._id).populate("role");
            isNewUser = true;
        }
        const tokenPayLoad = {
            user: user._id,
            role: user.role.name,
            username: user.username
        }


        const jwttoken = jwt.sign(
            tokenPayLoad, process.env.JWT_SECRET, { expiresIn: "1d" }
        )

        //send token via cookie (or json response)

        res.cookie("token", jwttoken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });

        const message = isNewUser ? `${user.username} Google account has been created successfully! and you are logged in` : `Welcome, ${user.username}!`;
        res.status(200).json({
            message,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role.name
            }
        })

    } catch (error) {
        console.error("DETAILED ERROR:", error.message);
        res.status(401).json({ error: "Google authentication failed." });

    }

}

async function logout(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({ token })
        }

        res.clearCookie("token");

        res.status(200).json({
            message: "User logged out seccessfully"
        })
    } catch(error){
        return res.status(500).json({ message: 'Logout failed', error: error.message });
    }


}

async function resetPassword(req,res){
    
} 



module.exports = {
    registerUser, loginUser, getCurrentUser, googleAuth, verifyOtp, logout
};