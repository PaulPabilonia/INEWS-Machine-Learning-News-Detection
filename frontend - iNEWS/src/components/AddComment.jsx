import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Comments from './Comments'
import { useParams } from 'react-router-dom'

// const comments = [
//   { id: '0', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', username: 'Messi ',  date: "1h 32m", text: "Messi, Pele23123 12312" },
//   { id: '1', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', username: 'Ronaldo ', date: "3h 32m", text: "Ronaldo, Pele 2131312 3123" },
//   { id: '2', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', username: 'Mbappe', date: "2h 42m", text: "Messi, Mbappe 12321312 3" },
//   { id: '3', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', username: 'Pele',  date: "2h 31m", text: "Maradona, Pele12313123 12" },
// ]

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/comment/',
});


const AddComment = ({comments}) => {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [comment, setComment] = useState('');
  const [token, setToken] = useState('');
  const [prediction, setPrediction] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(id, comment);
    console.log(comment)
  };

  // // POST with Axios
  const addComment = async (id, comment) => {
    try {
      let response = await client.post('', {
        "predictionID": id,
        "comment": comment
    }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem('authTokens')}`,
        },
      });
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mt-4'>
      <div>
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Discussion</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full my-4 border border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2  rounded-t-lg dark:bg-gray-800">

              <label htmlFor="comment" className="sr-only">Your comment</label>
              <textarea
                id="comment"
                rows="4"
                className="p-2.5 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required></textarea>

            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
              <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Post comment
              </button>
              <div className="flex pl-0 space-x-1 sm:pl-2">
                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Attach file</span>
                </button>
                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Set location</span>
                </button>
                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </form>
        <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

      </div>

     
      {comments.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
      
    </div>
  )
}

export default AddComment