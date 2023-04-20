import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ButtonLoading from './ButtonLoading';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/prediction/',
});

const FeatureURL = () => {

  const [url, setURL] = useState('');
  const [articles, setArticles] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // GET with Axios
  useEffect(() => {
    const getArticle = async () => {
      let response = await client.get('');
      console.log(response.data);
      console.log(response.data.length + 1);
      setId(response.data.length + 1);
    };
    getArticle();
  }, []);
  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem('authTokens')) {
      setLoading(true);
      predictNews(url);
    } else {
      setLoading(true);
      predictNewsNoUser(url);
      setLoading(false);
    }
  };

  // POST with User
  const predictNews = async (url) => {
    try {
      let response = await client.post('', {
        "feature": "url",
        "news_link": url
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem('authTokens')}`,
        },
      });
      console.log(response.data)
      setArticles([response.data, ...articles])
      setURL('');
      setLoading(false);
      navigate('Prediction/' + id)
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };

  // POST with No User
  const predictNewsNoUser = async (url) => {
    try {
      let response = await client.post('', {
        "feature": "url",
        "news_link": url
      });
      console.log(response.data)
      setArticles([response.data, ...articles])
      setURL('');
      setLoading(false);
      navigate('Prediction/' + id)
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };

  return (
    <div className='lg:w-full mt-5'>

      <form onSubmit={handleSubmit} className="flex items-center">
        <label htmlFor="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input
            type="text"
            id="voice-search"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            className="
          bg-gray-50 border 
          border-gray-300 
          text-gray-900 
          text-sm rounded-lg 
          focus:ring-blue-500
          focus:border-blue-500 
          block w-full pl-10 p-2.5  
          dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Copy & Paste URL here..."
            required>
          </input>
          <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
          </button>
        </div>

        {loading ? <ButtonLoading /> : <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg aria-hidden="true"
            className="w-5 h-5 mr-2 -ml-1"
            fill="none" stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">

            <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
            </path>

          </svg>
          Predict
        </button>
        }
      </form>

    </div>
  )
}

export default FeatureURL