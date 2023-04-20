import React from 'react'
import no_image from "../assets/images/no-image.png"
import { Link } from 'react-router-dom'

const Card = ({ article }) => {
  const author = [article.author];

  return (
    <div className="flex flex-col mt-5">

      <header className="flex flex-row gap-3 items-center">
        <img src="https://picsum.photos/30/30" className="rounded-full" />
        <div> {author[0] == null ? article.authors:author[0].email}</div>
        <div className="text-sm text-gray-500">{article.date}</div>
      </header>

      <content className="grid grid-cols-4 gap-3">

        <div className="col-span-3 flex flex-col">
          <subject className="font-bold text-lg pt-3">
            {article.headlines}
          </subject>

          <div className="font-light text-sm pt-2">
            
          </div>
        </div>

        <div className="flex items-center">
          <img src={article.news_img !== null ? article.news_img : no_image} />
        </div>

      </content>

      <footer className="flex flex-row pt-7 gap-3 items-center">

        <Link to={`/Home/Prediction/${article.id}`} className="hover:bg-blue-900 delay-100 duration-100 bg-blue-600 rounded-full py-1 px-2 text-xs">
          View Details
        </Link>

        <div className="text-gray-500 text-xs">
          {article.verdict}
        </div>

        <div className="text-gray-500 text-xs">
          {article.fuzzy_store}
        </div>

      </footer>

      <hr className="mt-5" />

    </div>
  )
}

export default Card