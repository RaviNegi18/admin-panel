
const SignIn = () => {
  return (
    <div className="w-full min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="w-100 min-h-125">
        <form className="bg-slate-700 w-full min-h-125 flex flex-col justify-center p-10 rounded-md gap-6">

          <h1 className="text-3xl font-xl text-black text-center mb-4">
            Create an Account
          </h1>

          <p>
            Create a account to continue
          </p>
          {/* Email */}
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
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-md outline-none bg-white text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;