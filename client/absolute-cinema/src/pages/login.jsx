import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleCredentialResponse(response) {
    try {
      // console.log("Encoded JWT ID token: " + response.credential);
      const { data } = await axios({
        method: "POST",
        url: "https://absolute-cinema.habibmufti.online/google-login",
        headers: {
          google_token: response.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "416693996743-tg2t33nnf8rcrt0hk92eadfiabcthufh.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    ); // also display the One Tap dialog

    google.accounts.id.prompt();
  }, []);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img className="w-8 h-8 mr-2" src="../assets/logo.svg" alt="logo" /> */}
          Absloute Cinema
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login to your account</h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={async function formOnSubmit(event) {
                event.preventDefault();
                try {
                  const response = await axios({
                    method: "POST",
                    url: "https://absolute-cinema.habibmufti.online/login",
                    data: {
                      email: email,
                      password: password,
                    },
                  });
                  localStorage.access_token = response.data.access_token;
                  navigate("/");
                } catch (error) {
                  const errMsg = error.response.data.message;
                  Swal.fire({
                    title: "Error!",
                    text: errMsg,
                    icon: "error",
                  });
                }
              }}
            >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <div className="flex justify-center">
                <div id="buttonDiv"></div>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
