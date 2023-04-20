import React from 'react'

const Service = ({title, description, icon}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mx-2 sm:mx-0">
      <div
        className="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               bg-gray-800
               shadow-md
               hover:shadow-lg
               mb-8
               "
      >
        <div
          className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  bg-primary
                  rounded-2xl
                  mb-8
                  "
        >
         <img src={icon} alt="" />
        </div>
        <h4 className="font-semibold text-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
          {title}
        </h4>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Service