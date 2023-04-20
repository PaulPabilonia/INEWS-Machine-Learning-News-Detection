import React from 'react'
import { Link } from 'react-router-dom'


const Page404 = () => {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent sm:text-5xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
          <Link rel="noopener noreferrer" to="/" className="px-8 py-3 rounded border border-blue-600 bg-blue-600 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">Back to homepage</Link>
        </div>
      </div>
    </section>
  )
}

export default Page404