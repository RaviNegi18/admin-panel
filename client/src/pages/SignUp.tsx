import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import type {SignUpFormData} from "../types/formdata"
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { registerUser } from "../redux/authSlice";
const SignUp = () => {
  const dispatch=useDispatch<AppDispatch>()
const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>()


function submitData(data: SignUpFormData) {
  dispatch(registerUser(data));
}
  return (
    <div className="w-full py-8 min-h-screen items-start flex scroll-auto sm:items-center justify-center bg-slate-950">
      <div className=" w-full max-w-md px-4">
        <form onSubmit={handleSubmit(submitData)} className="bg-slate-100 w-full  flex flex-col justify-center p-10 rounded-md gap-6">

          <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="text-3xl font-bold text-black text-center mb-4">
              Create an Account
            </h1>

            <p className="text-center text-lg font-semibold">
              Create a account to continue
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-black font-semibold"
            >
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              {...register("username", { required: true })}
              className="w-full px-4 py-3 rounded-md outline-none bg-slate-200 text-black"
            />
            <p className="text-red-500">
              {
                errors.username && <p>
                  please enter username
                </p>
              }
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-black font-semibold "
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: true
              })}


              className="w-full px-4 py-3 rounded-md outline-none bg-slate-200 text-black"
            />
            <p className="text-red-500">

              {
                errors.email && <p>
                  error in email
                </p>
              }
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-black font-semibold"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              placeholder="Enter password"

              {...register("password", {
                required: true
              })}
              className="w-full px-4 py-3 rounded-md outline-none bg-slate-200 text-black"
            />

            <p className="text-red-500">

              {
                errors.password && <p>

                  password is required
                </p>
              }
            </p>
          </div>



          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Sign Up
          </button>
            <button onClick={()=>navigate("/")}>
            signIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;