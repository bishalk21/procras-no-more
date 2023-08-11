/* eslint-disable no-unused-vars */
import { useState } from "react";
import { postNewUser } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

/**
 *  Frontend 1
 *      - register page
 *      - form & initialState: fullName, password, confirmPassword, email
 *      - onChange and onSubmit/onClick event in form
 *  Backend 1
 *      - created userRouter with express
 *      - test the api ep with fake data
 *      - call that ep with axios and call the function on handleSubmit
 *      - made schema for user
 *  Frontend 2
 *      - onSubmit send the userInfo excluding confirmPassword
 *  Backend 2
 *      - created user modal to save the user in db
 *      - called the modal function in client req route ep to register him and save him in db
 */

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [registerUserInfo, setRegisterUserInfo] = useState(initialState);
  const [response, setResponse] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterUserInfo({ ...registerUserInfo, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = registerUserInfo;

    if (confirmPassword !== rest.password) {
      return alert("Password and confirm password must be same");
    }

    const { status, message } = await postNewUser(rest);
    setResponse({ status, message });
    toast[status](message);
    status === "success" && setRegisterUserInfo(initialState);
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            {response.message && (
              <div
                className={`px-4 py-3 rounded relative ${
                  response.status === "success"
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-red-100 border border-red-400 text-red-700"
                }`}
                role="alert"
              >
                <strong className="font-bold">{response.message}</strong>

                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            <input
              onChange={handleOnChange}
              value={registerUserInfo.fullName}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullName"
              placeholder="Full Name"
            />

            <input
              onChange={handleOnChange}
              value={registerUserInfo.email}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              onChange={handleOnChange}
              value={registerUserInfo.password}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <input
              onChange={handleOnChange}
              value={registerUserInfo.confirmPassword}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirmPassword"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              onClick={handleOnSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the{" "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>
              and{" "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?{" "}
            <a
              className="no-underline border-b border-blue- text-blue"
              href="/login"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
