import React from 'react'
import YoutubeEmbed from '../components/YoutubeEmbed'
import '../sassStyles/prediction.scss'
import Card from '../components/Card'
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileDropdown from '../components/profile/ProfileDropdown';
import userImage from '../assets/images/icons/user-50.png';
import SkeletonPosts from '../components/Skeleton/SkeletonPosts'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/prediction/"
});





const Community = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log(loading)
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      let response = await client.get();
      setLoading(false);
      console.log(response.data)
      setArticles(response.data, ...articles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 dark:bg-gray-900 dark:text-gray-100">

      <aside className="p-2 self-start hidden md:grid md:sticky lg:sticky top-1 col-span-2">
        <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
          <button className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded ">
            <svg className="fill-stroke " width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link to='/Home' className="text-base leading-4 ">Home</Link>
          </button>
          <button className="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
            <svg className="fill-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link to='/Profile' className="text-base leading-4 ">Profile</Link>
          </button>
        </div>
        <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
          <button className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  ">
            <p className="text-sm leading-5  uppercase">Profile Overview</p>
            <svg id="icon1" className="transform" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div id="menu1" className="flex justify-start  flex-col w-full md:w-auto items-start pb-1 ">
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <svg className="fill-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base leading-4  ">Messages</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.85 12.15L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 5L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 8L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base leading-4  ">Security</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Link to='/Settings' className="text-base leading-4  ">Settings</Link>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base leading-4  ">Notifications</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base leading-4  ">Passwords</p>
            </button>
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 21H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 21V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 4L19 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base leading-4  ">Goals</p>
            </button>
          </div>
        </div>

      </aside>

      <main className='col-span-7'>
        <div className=" dark:bg-gray-900 dark:text-gray-100 p-8">

          <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Community Forum</h1>
              <div className='mb-5'>Have a question or concern about fake news that you want to discuss with others? Our community forum is a place for users to share their experiences and get feedback and support from the community. Join the conversation today!</div>



              {loading ? <SkeletonPosts /> : articles.map((article) => (<Card key={article.id} article={article} />))}


            </div>
          </section>

        </div>
      </main>

      <aside className="p-2 self-start sticky top-1 col-span-3">

        <div className="bg-gray-800 rounded-lg p-1 ">

          {/* <!-- Header --> */}
          <div className="grid grid-cols-3 text-gray-200 items-center px-5 pt-5">

            {/* <!-- Header Title --> */}
            <div className="col-span-2 flex flex-row gap-3 items-center">
              <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
              </button>
              <p className="font-bold"> Disclaimer </p>
            </div>


          </div>

          {/* <!-- Content --> */}
          <a href="#" className="">
            <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-4 mx-3">
              The machine learning model <span className="font-semibold">does not</span>  have 100% accuracy. Please always <span className="font-semibold">practice fact checking </span> on your own to verify the integrity of the news article.
            </p>
          </a>

        </div>




        <div className="bg-gray-800 rounded-2xl mt-4">
          <h1
            className="text-white text-md font-bold p-3 border-b border-dim-200">
            Who to follow
          </h1>

          <div className="text-blue-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
            <div className="flex flex-row justify-between p-2">
              <div className="flex flex-row">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                  alt="Joe Biden"
                />
                <div className="flex flex-col ml-2">
                  <h1 className="text-white font-bold text-sm">Joe Biden</h1>
                  <p className="text-gray-400 text-sm">@JoeBiden</p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center h-full text-white">
                  <a
                    href="#"
                    className="text-xs font-bold text-blue-400 px-4 py-1 rounded-full border-2 border-blue-400"
                  >Follow</a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-blue-400 text-sm font-normal p-3 border-b border-dim-200 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
            <div className="flex flex-row justify-between p-2">
              <div className="flex flex-row">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                  alt="Joe Biden"
                />
                <div className="flex flex-col ml-2">
                  <h1 className="text-white font-bold text-sm">Joe Biden</h1>
                  <p className="text-gray-400 text-sm">@JoeBiden</p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center h-full text-white">
                  <a
                    href="#"
                    className="text-xs font-bold text-blue-400 px-4 py-1 rounded-full border-2 border-blue-400"
                  >Follow</a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-blue-400 text-sm font-normal p-3 hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out"
          >
            Show more
          </div>
        </div>

        <div className="h-24 my-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 flex justify-center items-center p-3 rounded-xl  shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
          <div className="text-center">
            <div>iNEWS</div>
            <div className="font-mono text-xs">Combat fake news with our automatic detection tool.</div>
          </div>
        </div>

        <YoutubeEmbed embedId="AkwWcHekMdo" />


      </aside>
    </div>
  )
}

export default Community