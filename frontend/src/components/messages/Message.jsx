import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../hooks/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBg = fromMe ? "bg-blue-400" : "";
  const formattedTime = extractTime(message.createdAt);

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>

        <div className={`chat-bubble text-white ${bubbleBg} ${shakeClass}`}>
          {message.message}
        </div>
        <div className="chat-footer text-gray-800">{formattedTime}</div>
      </div>
    </>
  );
};

export default Message;

function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${min}`;
}
