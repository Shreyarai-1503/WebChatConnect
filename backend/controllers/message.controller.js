import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);  //will run in parallel

        //-------------------SOCKET IO FUNCTIONALITY-------------------
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message controller ", error.message);
        return res
            .status(500)
            .json({ error: "Internal server Error" });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); //return array of messages object

        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessages controller ", error.message);
        return res
            .status(500)
            .json({ error: "Internal server Error" });
    }
}

export { sendMessage, getMessages }