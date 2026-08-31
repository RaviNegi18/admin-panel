import { useState } from "react";
import { loginUser } from "../redux/authSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../redux/store"
import type { RootState } from "../redux/store";
const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {success,isloading,iserror}=useSelector((state:RootState)=>state.auth)

const navigate=useNavigate()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
  };


  if(success){
    navigate("/dashboard")
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="w-full min-h-screen  flex items-center justify-center">
      <div className="w-100 min-h-125">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-700 w-full min-h-125 flex flex-col justify-center p-10 rounded-md gap-6"
        >
          <h1 className="text-3xl font-xl text-black text-center mb-4">
            Create an Account
          </h1>

          <p>Create an account to continue</p>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-white font-medium"
            >
              Email address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-md outline-none bg-white text-black"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-white font-medium"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-md outline-none bg-white text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
         {isloading ? "Loading...." : "SignIn"}
          </button>


          <button onClick={()=>navigate("/sign-up")}>
            signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;