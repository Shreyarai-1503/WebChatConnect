import { CgLogOut } from "react-icons/cg";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto text-2xl text-white">
      {!loading ? (
        <CgLogOut className="cursor-pointer" onClick={logout} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
