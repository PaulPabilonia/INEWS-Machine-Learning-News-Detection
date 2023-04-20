import React, { useState, useEffect } from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/inews_logo.png';
import userImage from '../assets/images/icons/user-50.png';
import ProfileDropdown from './profile/ProfileDropdown';
import '../sassStyles/navBar.scss'

const navigation = [
  { name: 'Home', href: '/Home', current: false },
  { name: 'Community', href: '/Community', current: false },
  { name: 'NewsFeed', href: '/NewsFeed', current: false },
  { name: 'How It Works', href: '/HowItWorks', current: false },
  { name: 'About', href: '/About', current: false },
]

const user = {
  'first_name': 'Paul',
  'last_name': 'Pabilonia',
  'email': 'Paul@gmail.com',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  const [isLogin, setLogin] = useState(() => localStorage.getItem('authTokens') ? true : false);
  console.log('is Login?', isLogin)
  const navigate = useNavigate()
  

  let logoutUser = () => {
    localStorage.removeItem('authTokens')
    navigate('/SignIn', { replace: true })
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>

                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <ProfileDropdown isLogin={isLogin}/>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar