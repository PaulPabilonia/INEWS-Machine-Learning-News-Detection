import React from 'react'
import '../sassStyles/about.scss'
import team1 from '../assets/images/team/team1.jpg'
import team2 from '../assets/images/team/team2.png'
import team3 from '../assets/images/team/team3.jpg'
import facebook from '../assets/images/social/facebook-50.png';
import instagram from '../assets/images/social/instagram-50.png';
import twitter from '../assets/images/social/twitter-50.png';

const TeamSection = () => {
  return (
    <div className=" p-6 mx-auto">

      <section className="mb-32 text-gray-800 text-center">
        <div className='mb-32'>
          <h2
            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            OUR TEAM
          </h2>
        </div>

        <div className="grid gap-x-6 lg:gap-x-12 md:grid-cols-3">
          <div className="mb-24 md:mb-0">
            <div className="rounded-lg shadow-lg h-full block bg-white">
              <div className="flex justify-center">
                <div className="imageTeam flex justify-center">
                  <img
                    src={team1}
                    className="rounded-full mx-auto shadow-lg"
                    alt="">
                  </img>
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-lg font-bold mb-4">Paul Wilfred V. Pabilonia</h5>
                <p className="mb-6">Leader / Developer</p>
                <ul className="list-inside flex mx-auto justify-center">
                  <a href="https://www.facebook.com/Paulwilfred12" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={facebook} alt="" />
                  </a>
                  <a href="https://twitter.com/PaulPabilonia12" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={twitter} alt="" />
                  </a>
                  <a href="https://www.instagram.com/paulpabilonia/" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={instagram} alt="" />
                  </a>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-24 md:mb-0">
            <div className="rounded-lg shadow-lg h-full block bg-white">
              <div className="flex justify-center">
                <div className="imageTeam flex justify-center">
                  <img
                    src={team2}
                    className="rounded-full mx-auto shadow-lg"
                    alt="" >
                  </img>
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-lg font-bold mb-4">Ermchales P. Pailan</h5>
                <p className="mb-6">Member / Designer</p>
                <ul className="list-inside flex mx-auto justify-center">
                  <a href="https://www.facebook.com/Em06.pailan" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={facebook} alt="" />
                  </a>
                  <a href="https://twitter.com/Emmeem06" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={twitter} alt="" />
                  </a>
                  <a href="https://www.instagram.com/ermcharles/" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={instagram} alt="" />
                  </a>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-24 md:mb-0">
            <div className="rounded-lg shadow-lg h-full block bg-white">
              <div className="flex justify-center">
                <div className="imageTeam flex justify-center">
                  <img
                    src={team3}
                    className="rounded-full mx-auto shadow-lg"
                    alt="" >
                  </img>
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-lg font-bold mb-4">Jessa May D. Ubaldo</h5>
                <p className="mb-6">Member / Documentation</p>
                <ul className="list-inside flex mx-auto justify-center">
                  <a href="https://www.facebook.com/jmcut" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={facebook} alt="" />
                  </a>
                  <a href="https://twitter.com/jessamaeubaldo" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={twitter} alt="" />
                  </a>
                  <a href="https://www.instagram.com/essang.jm/" target="_blank" className="px-2">
                    <img className="w-5 h-5" src={instagram} alt="" />
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default TeamSection