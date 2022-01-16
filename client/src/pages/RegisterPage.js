import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../redux/authSlice";
import { addInfoMsg } from "../redux/messagesSlice";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleUserRegistration(e) {
    e.preventDefault();

    if (authorized) return dispatch(addInfoMsg("Please Logout first."));

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (user.password.length < 8) return;

    dispatch(registerUser(user));
    navigate("/");
  }

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleUserRegistration}
        className="w-1/4 mx-auto py-5 my-5 bg-gray-300 text-center rounded-md"
      >
        <div>
          <label className="label justify-center">Name</label>
          <input type="text" className="input" ref={nameRef} />
        </div>

        <div>
          <label className="label justify-center">Email</label>
          <input type="email" className="input" ref={emailRef} />
        </div>

        <div>
          <label className="label justify-center">Password</label>
          <input type="password" className="input" ref={passwordRef} />
        </div>

        <button type="submit" className="btn mt-5">
          Register
        </button>

        <span className="block mt-4 text-sm">
          Already Registered?{" "}
          <Link to="/login" className="underline cursor-pointer">
            Login
          </Link>
        </span>
      </form>
    </>
  );
};

export default RegisterPage;
