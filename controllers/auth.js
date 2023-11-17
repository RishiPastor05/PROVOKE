const User= require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signupController=async(req,res)=>{
    try {
        const {name,email,password}= req.body;

        if(!name || !email || !password){
            return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
        }

        const existingUser = await User.findOne({ email:email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData= await User.create({
            name, email,password:hashedPassword
        })

        return res.status(200).json({
			success: true,
            userData,
			message: "User registered successfully",
		});
    } catch (error) {
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}

exports.loginController=async(req,res)=>{
    try {
        // get data from request body
        const { email, password } = req.body;

        // validation of data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }
        // user check if exist or not
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            });
        }

           // match password using compare method of bcrypt if match then create JWT token
           if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const token = jwt.sign(payload, process.env.jwt_token, {
                expiresIn: "24h",
            });
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure, please try again",
        });
    }
}

exports.auth=async(req,res,next)=>{
    try {
        const token = req.cookies.token 
        || req.body.token 
        || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

          //verify the token
          try{
            const decode =  jwt.verify(token, process.env.jwt_token);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}
