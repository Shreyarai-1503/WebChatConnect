import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import generateTokenAndCookie from "../utils/generateToken.js";

const signUp = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res
                .status(400)
                .json({ error: "User already exists" });
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        /*****************************************************************************************/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "Male" ? boyProfilePic : girlProfilePic
        });

        if (!newUser) {
            return res
                .status(400)
                .json({ error: "Invalid user data" });
        }

        generateTokenAndCookie(newUser._id, res);
        await newUser.save();

        res
            .status(201)
            .json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });


    } catch (error) {
        console.log("Error in User SignUp controller ", error.message);
        return res
            .status(500)
            .json({ error: "Internal server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: "Invalid Credentials" });
        }

        generateTokenAndCookie(user._id, res);

        res
            .status(200)
            .json({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                profilePic: user.profilePic
            });


    } catch (error) {
        console.log("Error in User Login controller ", error.message);
        return res
            .status(500)
            .json({ error: "Internal server Error" });
    }

}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res
            .status(200)
            .json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in User Logout controller ", error.message);
        return res
            .status(500)
            .json({ error: "Internal server Error" });
    }
}

export { signUp, login, logout }