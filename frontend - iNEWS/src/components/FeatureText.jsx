import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import ButtonLoading from './ButtonLoading';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/prediction/',
});

const FeatureText = () => {
  const [headline, setHeadline] = useState('');
  const [authors, setAuthors] = useState('');
  const [summary, setSummary] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState([]);
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
      predictNews(headline, authors, summary);
    } else {
      setLoading(true);
      predictNewsNoUser(headline, authors, summary);
    }

  };

  // POST with User
  const predictNews = async (headline, authors, summary) => {
    try {
      let response = await client.post('', {
        "feature": "text",
        "headlines": headline,
        "summary": summary,
        "authors": authors
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem('authTokens')}`,
        },
      });
      console.log(response.data)
      setArticles([response.data, ...articles])
      setHeadline('');
      setAuthors('');
      setSummary('');
      setLoading(false);
      navigate('Prediction/' + id)
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };
  // POST without User
  const predictNewsNoUser = async (headline, authors, summary) => {
    try {
      let response = await client.post('', {
        "feature": "text",
        "headlines": headline,
        "summary": summary,
        "authors": authors
      });
      console.log(response.data)
      setArticles([response.data, ...articles])
      setHeadline('');
      setAuthors('');
      setSummary('');
      setLoading(false);
      navigate('Prediction/' + id)
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };

  return (
    <div>
      <form className="mt-6 " onSubmit={handleSubmit}>
        <div className="mb-2 ">
          <label>
            <span className="text-gray-100">Headline</span>
            <input
              type="text"
              name="name"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="
                w-full
                block px-2.5 py-2 mt-2
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50

                dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-white 
                dark:focus:ring-blue-500 
                dark:focus:border-blue-500
              "
              placeholder="Headline"
              required
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            <span className="text-gray-100">Authors or Sources</span>
            <input
              name="email"
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="
                block
                w-full
                mt-2 px-2.5 py-2
                border-gray-300
                rounded-md
                shadow-sm
                focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50

                dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-white 
                dark:focus:ring-blue-500 
                dark:focus:border-blue-500
              "
              placeholder="Author/s or Source/s"
              required
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            <span className="text-gray-100">Content</span>
            <textarea
              name="message"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="
              block
              w-full
              mt-2 px-2.5 py-2
              border-gray-300
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50

              dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-white 
                dark:focus:ring-blue-500 
                dark:focus:border-blue-500
            "
              rows="5"
              placeholder="Write the News Content here..."
              required
            ></textarea>
          </label>
        </div>

        <div className="mb-6">
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
          </button>}
        </div>
      </form>
    </div>
  )
}

export default FeatureText