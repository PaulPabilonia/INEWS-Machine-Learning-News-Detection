import React from 'react'
import NewsArticle from '../components/NewsArticle'
import { useEffect, useState } from "react";
import axios from "axios";
import Broadcast from '../assets/images/illustrations/broadcast-animate.svg';

const client = axios.create({
  baseURL: "https://newsapi.org/v2/top-headlines?country=ph&apiKey=9cd453b9a7344b4d95e90263abb33e89"
});


const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      let response = await client.get();
      console.log(response.data)
      setArticles(response.data.articles);
    };
    getArticles();
  }, []);

  return (
    <div className=" dark:bg-gray-900 dark:text-gray-100 p-10">
      <div className=" border border1 border-gray-500 rounded-xl w-full lg:max-w-full lg:flex">
        <div className="h-48 lg:h-auto lg:w-64 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden blac-bg" title="Mountain">
          <img src={Broadcast} alt="" />
        </div>
        <div className="sm:w-screen  lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-100 flex items-center">
              <svg className="fill-current text-gray-100 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Today's News
            </p>
            <div className="text-gray-200 font-bold text-xl mb-2">Top headlines in the Philippines</div>
            <div className="text-gray-100 text-base">
              Searching and retrieving live Philippines articles from all over the web.
              <span>can help you answer questions like:</span>
              <ul>What is top news that is happening right now?</ul>
              <ul>What new articles were published about Politics today?</ul>
              <ul>Has any news about the government published today?</ul>
            </div>
          </div>
          <div>
            <a href="https://news.google.com/home?hl=en-PH&gl=PH&ceid=PH:en" target="_blank" className="rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="rounded-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                Read More
              </span>
            </a>
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Top News in the Philippines</h1>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {articles.map((article) => (
              <NewsArticle key={article.id} headline={article.title} url={article.url} date={article.publishedAt} author={article.author} image={article.urlToImage} source={article.source.name} />
            ))}

          </div>
        </div>
      </section>

    </div>
  )
}

export default NewsFeed