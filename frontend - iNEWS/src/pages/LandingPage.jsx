import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LandingImage from '../assets/images/news-animate.svg'
import Services from '../components/Services';
import ProfileDropdown from '../components/profile/ProfileDropdown';

const LandingPage = () => {
  const [isLogin, setLogin] = useState(() => localStorage.getItem('authTokens') ? true : false);
  console.log('is Login?', isLogin)

  return (
    <div>
      <section className="bg-gray-900 text-white p-1">
        <div className='flex justify-end mt-3 mx-4'>
          <ProfileDropdown isLogin={isLogin} />
        </div>

        <div className="grid max-w-screen-xl px-4  mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-12">

          <div className="mx-auto max-w-screen-xl px-4  lg:flex lg:items-center lg:col-span-7">
            <div className="mx-auto max-w-3xl text-center">

              <h1
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                iNEWS : A Website for
                <span className="sm:block"> Fake News Detection </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
                Combat fake news with our automatic detection tool.
                <span className="sm:block"> Accurate, fast, and easy to use!</span>
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                  to="/Home">
                  Try It Now
                </Link>

                <Link
                  className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                  to="/About">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:mt-0 lg:col-span-5 lg:flex">
            <img src={LandingImage} alt="mockup" />
          </div>
        </div>
      </section>
      <Services />
    </div>
  )
}

export default LandingPage