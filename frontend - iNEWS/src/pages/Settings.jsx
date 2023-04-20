import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import ButtonLoading from '../components/ButtonLoading';
import userImage from '../assets/images/icons/default_profile.png';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/get-details/',
});

const Settings = () => {
  const [user, setUser] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [b_day, setBday] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // GET with Axios
  useEffect(() => {
    getUser();
    console.log(user)
    console.log('first_name',first_name)
  }, []);


  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(first_name, last_name, gender, contact_no, email, b_day)
  };


  const getUser = async () => {
    try {
      let response = await client.get('', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem('authTokens')}`,
        },
      });
      console.log(response.data)
      setUser(response.data)
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setGender(response.data.gender)
      setContactNo(response.data.contact_no)
      setEmail(response.data.email)
      setBday(response.data.b_day)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Update with User
  const updateUser = async (first_name, last_name, gender, contact_no, email, b_day) => {
    setLoading(true);
    try {
      let response = await client.put('', {
        "first_name": first_name,
        "last_name": last_name,
        "gender": gender,
        "contact_no": contact_no,
        "email": email,
        "b_day": b_day
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem('authTokens')}`,
        },
      });
      console.log(response.data)
      setUser(response.data)
      setLoading(false);
      navigate('/Profile')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 bg-gray-900">
      <div className="md:flex no-wrap md:-mx-2 ">
        {/* <!-- Left Side --> */}
        <div className="w-full md:w-3/12 md:mx-2">
          {/* <!-- Profile Card --> */}
          <div className="bg-gray-900 p-3 border-t-4 border-blue-400">
            <img
              className=" mx-auto h-60 w-60 rounded-full object-cover"
              src={user.pictures == null ? userImage : user.pictures}
              alt="user image"
            />
            <h1 className="text-gray-400 font-bold text-xl leading-8 my-1">{user.first_name} {user.last_name}</h1>
            <h3 className="text-gray-400 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
            <p className="text-sm text-gray-400 hover:text-gray-400 leading-6">Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
            <ul
              className="bg-gray-800 text-gray-100 hover:text-gray-100 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto"><span
                  className="bg-blue-700 py-1 px-2 rounded text-white text-sm">Active</span></span>
              </li>
              <li className="flex items-center py-3">
                <span>Email</span>
                <span className="ml-auto">{user.email}</span>
              </li>
            </ul>
          </div>
          {/* <!-- End of profile card --> */}
          <div className="my-4"></div>

        </div>
        {/* <!-- Right Side --> */}
        <div className="w-full md:w-9/12 mx-2 h-64">
          {/* <!-- Profile tab --> */}
          {/* <!-- About Section --> */}
          <div className="bg-gray-900 p-3 shadow-sm rounded-sm">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-2 font-semibold text-gray-400 leading-8">
                <span clas="text-blue-500">
                  <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-400">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2 my-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <input
                      className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={user.first_name}
                      value={first_name}
                      onChange={(e) => e.target.value ? setFirstName(e.target.value) : setFirstName(e.target.placeholder)}>
                    </input>
                  </div>
                  <div className="grid grid-cols-2 my-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <input
                      className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={user.last_name}
                      value={last_name}
                      onChange={(e) => e.target.value ? setLastName(e.target.value) : setLastName(e.target.placeholder)}>
                    </input>
                  </div>
                  <div className="grid grid-cols-2 my-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <input
                      className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={user.gender}
                      value={gender}
                      onChange={(e) => e.target.value ? setGender(e.target.value) : setGender(e.target.placeholder)}>
                    </input>
                  </div>
                  <div className="grid grid-cols-2 my-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <input
                      className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={user.contact_no}
                      value={contact_no}
                      onChange={(e) => e.target.value ? setContactNo(e.target.value) : setContactNo(e.target.placeholder)}>
                    </input>
                  </div>
                  <div className="grid grid-cols-2 my-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <input
                      className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={user.email}
                      value={email}
                      onChange={(e) => e.target.value ? setEmail(e.target.value) : setEmail(e.target.placeholder)}>
                    </input>
                  </div>
                  <div className="grid grid-cols-2 my-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <input
                      className="px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={user.b_day}
                      value={b_day}
                      onChange={(e) => e.target.value ? setBday(e.target.value) : setBday(e.target.placeholder)}>
                    </input>
                  </div>
                </div>
              </div>

              <div className='mt-3'>
                {loading ? <ButtonLoading /> : <button
                  type="submit"
                  className="rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span className="rounded-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                    Save Information
                  </span>
                </button>
                }
              </div>
            </form>
          </div>
          {/* <!-- End of about section --> */}

          <div className="my-4"></div>

          {/* <!-- Experience and education --> */}
          <div className="bg-gray-900 p-3 shadow-sm rounded-sm">

            <div className="grid grid-cols-2 my-2">
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-400 leading-8 mb-3">
                  <span clas="text-blue-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">Experience</span>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <div className="text-blue-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-400 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-blue-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-400 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-blue-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-400 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-blue-600">Owner at Her Company Inc.</div>
                    <div className="text-gray-400 text-xs">March 2020 - Now</div>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-400 leading-8 mb-3">
                  <span clas="text-blue-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path fill="#fff"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </span>
                  <span className="tracking-wide">Education</span>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <div className="text-blue-600">Masters Degree in Oxford</div>
                    <div className="text-gray-400 text-xs">March 2020 - Now</div>
                  </li>
                  <li>
                    <div className="text-blue-600">Bachelors Degreen in LPU</div>
                    <div className="text-gray-400 text-xs">March 2020 - Now</div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- End of Experience and education grid --> */}
          </div>
          {/* <!-- End of profile tab --> */}
        </div>
      </div>
    </div>
  )
}

export default Settings