import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[490px] md:h-[550px] rounded-lg shadow-2xl overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
