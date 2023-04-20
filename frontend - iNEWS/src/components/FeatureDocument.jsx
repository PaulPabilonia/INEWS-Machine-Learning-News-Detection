import React, { useState, useEffect } from 'react';

import axios from 'axios';
import UploadImage from '../assets/images/uploading-animate.svg'
import { useNavigate } from 'react-router-dom'
import ButtonLoading from './ButtonLoading';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/prediction/',
  headers: { "Content-Type": "multipart/form-data" }
});

const FeatureDocument = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [authors, setAuthors] = useState('');
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
  const handleSubmit = async (e) => {
    console.log("fileUpload:",fileUpload);
    e.preventDefault();
    const formData = new FormData();
    formData.append('feature', 'document');
    formData.append('authors', authors);
    formData.append('file', fileUpload);
    console.log(formData)
    if (localStorage.getItem('authTokens')) {
      setLoading(true);
      predictNews(formData)
    } else {
      setLoading(true);
      predictNewsNoUser(formData);
    }
  };

  const handleFileSelect = (event) => {
    console.log('handleFile:',event.target.files)
    setFileUpload(event.target.files[0])
  }

  // POST with User
  const predictNews = async (formData) => {
    console.log(formData.get('file'))
    try {
      let response = await client.post('', {
        "feature": 'document',
        "authors": formData.get('authors'),
        "file": formData.get('file')
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${localStorage.getItem('authTokens')}`,
        },
      });
      console.log(response.data)
      setArticles([response.data, ...articles])
      setAuthors('');
      setFileUpload('')
      setLoading(false);
      navigate('Prediction/' + id)
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };

  // POST with no User
  const predictNewsNoUser = async (formData) => {
    console.log(formData.get('file'))
    try {
      let response = await client.post('', {
        "feature": 'document',
        "authors": formData.get('authors'),
        "file": formData.get('file')
      });
      console.log(response.data)
      setArticles([response.data, ...articles])
      setAuthors('');
      setFileUpload('')
      setLoading(false);
      navigate('Prediction/' + id)
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };


  return (
    <div className='flex items-center justify-center mt-2 text-white'>
      <div className="sm:max-w-lg w-full p-10 bg-gray-900 rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-white">
            File Upload!
          </h2>
          <p className="mt-2 text-sm text-white">Predict News Documents.</p>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-white tracking-wide">Source</label>
            <input className="text-base p-2
                border dark:bg-gray-700 
                dark:border-gray-600 
                dark:placeholder-gray-400 
                dark:text-white 
                dark:focus:ring-blue-500 
                dark:focus:border-blue-500
                border-gray-700 rounded-lg 
                focus:outline-none 
                focus:border-indigo-500"
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="Ex. Facebook Posts"
              required />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-white tracking-wide">Attach Document</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed dark:border-gray-600 w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <img className="has-mask h-36 object-center" src={UploadImage} alt="freepik image" />
                  </div>
                  <p className="pointer-none text-white "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                  <div>File name:
                    <span
                      href=""
                      id=""
                      className="text-blue-600 hover:underline"
                    > {fileUpload !== null ? fileUpload.name : "Upload a File!"}
                    </span>
                  </div>
                  <div>File size:
                    <span
                      href=""
                      id=""
                      className="text-blue-600 hover:underline"
                    > {fileUpload !== null ? fileUpload.size + "kb" : "Upload a File!"}
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden" />
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: doc,pdf,types of images</span>
          </p>
          <div>
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
    </div>
  )
}

export default FeatureDocument