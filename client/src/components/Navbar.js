import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleOnClick() {
    if (authorized) dispatch(logout());

    navigate("/login");
  }

  return (
    <div className="flex bg-indigo-900 py-4 justify-between w-full">
      <div className="px-2 mx-2">
        <span className="font-bold text-white">Shopping List</span>
      </div>
      <div className="text-white pr-5 cursor-pointer" onClick={handleOnClick}>
        {authorized ? "Logout" : "LogIn"}
      </div>
    </div>
  );
}
