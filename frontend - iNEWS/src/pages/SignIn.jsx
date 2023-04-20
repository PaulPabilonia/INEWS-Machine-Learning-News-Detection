import React, { useState, useEffect } from 'react';
import logo from '../assets/images/inews_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import LandingImage from '../assets/images/news-animate.svg'
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/login/',
});


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate()
  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  // POST with Axios
  const signIn = async (email, password) => {
    try {
      let response = await client.post('', {
        "username": email,
        "password": password
      });
      console.log(response.data.token)
      localStorage.setItem('authTokens', response.data.token)
      console.log(localStorage.getItem('authTokens'))
      setUser([response.data, ...user])
      setEmail('');
      setPassword('');
      navigate('/Home', { replace: true })
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="dark:bg-gray-900 grid  lg:gap-8 xl:gap-0  lg:grid-cols-12">
        <div className="bg-gray-900 mx-auto max-w-screen-xl   lg:flex lg:h-screen lg:items-center lg:col-span-6">
          <div className="bg-gray-900 flex flex-col items-center justify-center mx-auto lg:py-0">

            <div className="w-full bg-white rounded-lg shadow dark:border mt-16 sm:mt-0 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-3 sm:p-8">

                <div className="flex justify-between">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login In Your Account
                  </h1>
                  <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                  </Link>
                </div>

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required />
                  </div>
                  <div className="flex justify-between">
                    <div></div>
                    <div className="text-sm">
                      <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                        <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Forgot your password?</a>
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign In</button>

                  <div className="flex items-center justify-center space-x-2 my-5">
                    <span className="h-px w-36 bg-gray-100"></span>
                    <span className="text-gray-300 font-normal">or</span>
                    <span className="h-px w-36 bg-gray-100"></span>
                  </div>

                  <div className="flex justify-center gap-5 w-full ">

                    <button type="submit" className="w-full flex space-x-2 items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500">
                      <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> <span>Login with Google</span>
                    </button>

                  </div>


                  <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">Have No account? <Link to="/SignUp"
                    className="text-primary-600 hover:underline dark:text-primary-500 font-medium inline-flex space-x-1 items-center"><span>Sign Up Here </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg></span></Link></p>

                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 lg:mt-0 lg:col-span-6 lg:flex h-screen w-auto">
          <img src={LandingImage} alt="mockup" />
        </div>

      </div>
    </section>




  )
}

export default SignIn