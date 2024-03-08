import { User } from "../models/user.model.js";

const getUsers = async (req, res) => {  //for sidbar
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");  //all the ids not equal to logged in user id

        res
            .status(200)
            .json(filteredUsers);


    } catch (error) {
        console.log("Error in User controller (for side bar) ", error.message);
        return res
            .status(500)
            .json({ error: "Internal server Error" });
    }
}

export { getUsers };