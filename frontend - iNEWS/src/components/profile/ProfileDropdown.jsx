import React, { useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import userImage from '../../assets/images/icons/user-50.png';
import { Fragment } from 'react'
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/get-details/',
});


const ProfileDropdown = ({ isLogin }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState('');
  console.log('ProfileComponent', isLogin)

  // GET with user
  useEffect(() => {
    getUser();
    console.log(user)
  }, []);

  const getUser = async () => {
    try {
      let response = await client.get('',{
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem('authTokens')}`,
        },
      });
      console.log(response.data)
      setUser(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  let logoutUser = () => {
    localStorage.removeItem('authTokens')
    navigate('/SignIn', { replace: true })
  }

  return (
    <div>
      {!isLogin ? <div className='inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
        <Link
          className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          to="/SignIn">
          Sign In
        </Link>
        <Link
          className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          to="/SignUp">
          Sign Up
        </Link>
      </div> :
        <div className="inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex justify-center items-center  space-x-2">

                <div>
                  <Menu.Button className="hidden sm:flex justify-start flex-col items-start">
                    <p className="cursor-pointer text-sm leading-5 text-white">{user.first_name} {user.last_name}</p>
                    <p className="cursor-pointer text-xs leading-3 text-gray-300">{user.email}</p>
                  </Menu.Button>
                </div>
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.pictures == null ? userImage: user.pictures}
                      alt="user image"
                    />

                  </Menu.Button>
                </div>
              </div>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/Profile"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/Settings"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type='button'
                      onClick={logoutUser}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>}
    </div>
  )
}

export default ProfileDropdown