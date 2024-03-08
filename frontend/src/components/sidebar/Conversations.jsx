import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("CONVERSATIONS: ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversations._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
