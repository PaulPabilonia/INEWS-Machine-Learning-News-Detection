import React from 'react'
import no_image from "../assets/images/no-image.png"

const NewsArticle = ({ image, headline, date, author, url, source }) => {
  return (
    <div className="lg:flex">
      <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={image !== null ? image : no_image} alt="" />
      <div className="flex flex-col justify-between py-1 lg:mx-6">
        <span className="text-sm text-gray-500 dark:text-gray-300">Source: {source}</span>
        <a href={url} className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
          {headline}
        </a>

        <div className='grid grid-cols-2'>
          <div className='col-span-1'>
            <div className="text-sm text-gray-500 dark:text-gray-300">{author}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{date}</div>
          </div>

          <div className='col-span-1'>
            <a href={url} target="_blank" className="rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="rounded-full relative px-3 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                Read More
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewsArticle