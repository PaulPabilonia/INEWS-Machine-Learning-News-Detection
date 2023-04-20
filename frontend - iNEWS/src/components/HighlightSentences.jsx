import React, { useState, useEffect } from 'react';
import '../sassStyles/HighlightSentences.scss';
import axios from 'axios';


const HighlightSentences = ({ sentences, fuzzy_score, article_verdict }) => {
  const [showVerdict, setShowVerdict] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [tooltipId, setTooltipId] = useState(null);
  const [rangeValue, setRangeValue] = useState(50);
  const [predictSentence, setPredictSentence] = useState(null);
  const [googleArticles, setGoogleArticles] = useState([]);
  const [isFactcheck, setIsFactcheck] = useState(false);
  const [urls, setUrls] = useState([]);

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search`;

  const handleOnclick = (sentence) => {
    setPredictSentence(sentence);
    console.log(predictSentence)
    try {
      //get the news links getRelatedArticles(sentence.sentence);
      if (googleArticles) {
        getArticle(sentence.sentence);
      } else {
        getUrls(sentence.sentence)
      }

    } catch (error) {
      console.log(error)
    }

    setIsFactcheck(true);
  }

  const getArticle = async (query) => {
    try {
      let response = await axios.get(url, {
        params: {
          query,
          key: apiKey
        }
      });
      console.log(response.data.claims)
      setGoogleArticles(response.data.claims)

    } catch (error) {
      setIsFactcheck(false);
      console.log(error);
    }
  };

  const getUrls = async (query) => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/news-search/?query=${query}`);
      console.log('urls:', response.data)
      setUrls(response.data)

    } catch (error) {
      setIsFactcheck(false);
      console.log(error);
    }
  };



  return (
    <div className='text-justify'>

      <div className="my-4 leading-6 col-start-1 col-span-2 dark:text-slate-400 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white my-5"
        >Model Verdict: <span className='text-green-400'>{article_verdict}</span>
        </h1>
      </div>

      <div className="rounded-lg p-2 shadow-lg">

        <div className='verdict-buttons my-4 text-sm leading-6 col-start-1 col-span-2 pl-4'>
          <button
            id='all'
            className='relative cursor-pointer button text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            onClick={() => setShowVerdict('all')}
            onMouseEnter={() => setTooltipId('all')}
            onMouseLeave={() => setTooltipId(null)}
          >
            <span className={`absolute w-[250px] bottom-full -left-2 bg-gray-800 rounded-lg p-1 my-3 
            ${tooltipId === 'all' ? 'block' : 'hidden'}`} >
              {/* <!-- Header --> */}
              <span className="grid grid-cols-3 text-gray-200 items-center px-2 pt-3">
                {/* <!-- Header Title --> */}
                <span className="col-span-2 flex flex-row gap-3 items-center">
                  <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                    <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  </button>
                  <p className="font-bold"> All</p>
                </span>
              </span>
              {/* <!-- Content --> */}
              <a href="#" target='_blank' className="cursor-point">
                <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-2 mx-3">
                  Click to see all of the highlighted sentences in this article.
                </p>
              </a>
            </span>
            All
          </button>

          <button
            className='relative cursor-pointer button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            onClick={() => setShowVerdict('true')}
            onMouseEnter={() => setTooltipId('true')}
            onMouseLeave={() => setTooltipId(null)}
          >
            <span className={`absolute w-[250px] bottom-full -left-2 bg-gray-800 rounded-lg p-1 my-3 
            ${tooltipId === 'true' ? 'block' : 'hidden'}`} >
              {/* <!-- Header --> */}
              <span className="grid grid-cols-3 text-gray-200 items-center px-2 pt-3">
                {/* <!-- Header Title --> */}
                <span className="col-span-2 flex flex-row gap-3 items-center">
                  <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                    <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  </button>
                  <p className="font-bold">True</p>
                </span>
              </span>
              {/* <!-- Content --> */}
              <a href="#" target='_blank' className="cursor-point">
                <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-2 mx-3">
                  The statement is accurate and supported by verifiable facts.
                </p>
              </a>
            </span>
            True ( {fuzzy_score[0]}% )
          </button>

          <button
            className='relative cursor-pointer button text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            onClick={() => setShowVerdict('mostly-true')}
            onMouseEnter={() => setTooltipId('mostly-true')}
            onMouseLeave={() => setTooltipId(null)}
          >
            <span className={`absolute w-[250px] bottom-full -left-2 bg-gray-800 rounded-lg p-1 my-3 
            ${tooltipId === 'mostly-true' ? 'block' : 'hidden'}`} >
              {/* <!-- Header --> */}
              <span className="grid grid-cols-3 text-gray-200 items-center px-2 pt-3">
                {/* <!-- Header Title --> */}
                <span className="col-span-2 flex flex-row gap-3 items-center">
                  <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                    <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  </button>
                  <p className="font-bold">Mostly-true</p>
                </span>
              </span>
              {/* <!-- Content --> */}
              <a href="#" target='_blank' className="cursor-point">
                <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-2 mx-3">
                  The statement is mostly accurate, but may contain some minor errors or omissions that do not significantly alter the overall meaning or accuracy of the statement.
                </p>
              </a>
            </span>
            Mostly-True ( {fuzzy_score[1]}% )
          </button>

          <button
            className='relative cursor-pointer button text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            onClick={() => setShowVerdict('half-true')}
            onMouseEnter={() => setTooltipId('half-true')}
            onMouseLeave={() => setTooltipId(null)}
          >
            <span className={`absolute w-[250px] bottom-full -left-2 bg-gray-800 rounded-lg p-1 my-3 
            ${tooltipId === 'half-true' ? 'block' : 'hidden'}`} >
              {/* <!-- Header --> */}
              <span className="grid grid-cols-3 text-gray-200 items-center px-2 pt-3">
                {/* <!-- Header Title --> */}
                <span className="col-span-2 flex flex-row gap-3 items-center">
                  <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                    <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  </button>
                  <p className="font-bold">Half-True</p>
                </span>
              </span>
              {/* <!-- Content --> */}
              <a href="#" target='_blank' className="cursor-point">
                <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-2 mx-3">
                  The statement contains some truth, but also some significant inaccuracies or omissions that could potentially mislead readers or viewers.
                </p>
              </a>
            </span>
            Half-True ( {fuzzy_score[2]}% )
          </button>

          <button className='relative cursor-pointer button text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            onClick={() => setShowVerdict('mostly-false')}
            onMouseEnter={() => setTooltipId('mostly-false')}
            onMouseLeave={() => setTooltipId(null)}
          >
            <span className={`absolute w-[250px] bottom-full -left-2 bg-gray-800 rounded-lg p-1 my-3 
            ${tooltipId === 'mostly-false' ? 'block' : 'hidden'}`} >
              {/* <!-- Header --> */}
              <span className="grid grid-cols-3 text-gray-200 items-center px-2 pt-3">
                {/* <!-- Header Title --> */}
                <span className="col-span-2 flex flex-row gap-3 items-center">
                  <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                    <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  </button>
                  <p className="font-bold"> Mostly-False</p>
                </span>
              </span>
              {/* <!-- Content --> */}
              <a href="#" target='_blank' className="cursor-point">
                <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-2 mx-3">
                  The statement is mostly inaccurate, but may contain some elements of truth that could potentially mislead readers or viewers.
                </p>
              </a>
            </span>
            Mostly-False ( {fuzzy_score[3]}% )
          </button>

          <button
            className='relative cursor-pointer button text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            onClick={() => setShowVerdict('false')}
            onMouseEnter={() => setTooltipId('false')}
            onMouseLeave={() => setTooltipId(null)}
          >
            <span className={`absolute w-[250px] bottom-full -left-2 bg-gray-800 rounded-lg p-1 my-3 
            ${tooltipId === 'false' ? 'block' : 'hidden'}`} >
              {/* <!-- Header --> */}
              <span className="grid grid-cols-3 text-gray-200 items-center px-2 pt-3">
                {/* <!-- Header Title --> */}
                <span className="col-span-2 flex flex-row gap-3 items-center">
                  <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                    <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  </button>
                  <p className="font-bold"> False</p>
                </span>
              </span>
              {/* <!-- Content --> */}
              <a href="#" target='_blank' className="cursor-point">
                <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-2 mx-3">
                  The statement is completely inaccurate and not supported by verifiable facts
                </p>
              </a>
            </span>
            False ( {fuzzy_score[4]}% )
          </button>

          <button
            className='relative cursor-pointer button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            onClick={() => setShowVerdict('pants-fire')}
            onMouseEnter={() => setTooltipId('pants-of-fire')}
            onMouseLeave={() => setTooltipId(null)}
          >
            <span className={`absolute w-[250px] bottom-full -left-2 bg-gray-800 rounded-lg p-1 my-3 
            ${tooltipId === 'pants-of-fire' ? 'block' : 'hidden'}`} >
              {/* <!-- Header --> */}
              <span className="grid grid-cols-3 text-gray-200 items-center px-2 pt-3">
                {/* <!-- Header Title --> */}
                <span className="col-span-2 flex flex-row gap-3 items-center">
                  <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                    <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  </button>
                  <p className="font-bold"> Pants-of-Fire</p>
                </span>
              </span>
              {/* <!-- Content --> */}
              <a href="#" target='_blank' className="cursor-point">
                <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-2 mx-3">
                  The statement is not only completely false, but also intentionally deceptive or fraudulent, and is likely to significantly mislead or deceive readers or viewers.
                </p>
              </a>
            </span>
            Pants-of-Fire ( {fuzzy_score[5]}% )
          </button>
        </div>


        <div className="price-range p-4">
          <span className="text-sm"></span>
          <div className="text-sm">Truthfulness: {rangeValue}%</div>
          <input className="w-full h-2 appearance-none bg-gradient-to-r from-red-600 to-green-600 outline-none rounded-full"
            type="range"
            name="slider"
            value={rangeValue}
            min="0"
            max="100"
            onChange={(e) => setRangeValue(e.target.value)} />
          <div className="-mt-2 flex w-full justify-between">
            <span className="text-sm text-red-600">0</span>
            <span className="text-sm text-green-600">100</span>
          </div>
        </div>
      </div>


      {sentences.map(sentence => {
        if (sentence.verdict.toLowerCase() === showVerdict.toLowerCase() || showVerdict.toLowerCase() === 'all') {
          const minScore = rangeValue - 10;
          const maxScore = +rangeValue + 10;
          const score = parseInt(sentence.score, 10);

          const highlightColor =
            score >= minScore && score <= maxScore ? 'highlight' : `color-${sentence.verdict.toLowerCase()}`;
          return (
            <>
              <span
                className={` relative cursor-pointer sentence  ${highlightColor}`}
                key={sentence.id}
                onMouseEnter={() => setHoveredId(sentence.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span
                  onClick={() => handleOnclick(sentence)}
                  className={`absolute w-[150px] inline-flex animate-bounce items-center justify-center border-2 border-white -top-2 -right-2 dark:border-gray-900  bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300 
                  ${hoveredId !== null && sentence.id === hoveredId ? 'block' : 'hidden'}`}>
                  <span className='rounded-full bg-indigo-500 uppercase px-1 text-xs font-bold mr-3'>{sentence.score}</span>
                  <span>Fact Check</span>
                  <svg className="fill-current opacity-75 h-[20px] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                </span>

                {sentence.sentence}&nbsp;
              </span>

            </>
          );
        }
        else {
          const minScore = rangeValue - 10;
          const maxScore = +rangeValue + 10;
          const score = parseInt(sentence.score, 10);

          const highlightColor =
            score >= minScore && score <= maxScore ? 'highlight' : `color-gray`;
          return (
            <span
              className={` relative  cursor-pointer sentence  ${highlightColor}`}
              key={sentence.id}
              onMouseEnter={() => setHoveredId(sentence.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span
                onClick={() => handleOnclick(sentence)}
                className={`absolute w-[130px] inline-flex animate-bounce items-center justify-center border-2 border-white -top-2 -right-2 dark:border-gray-900  bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300 
                  ${hoveredId !== null && sentence.id === hoveredId ? 'block' : 'hidden'}`}>
                <span className='rounded-full bg-indigo-500 uppercase px-1 text-xs font-bold mr-3'>{sentence.score}</span>
                <span>Fact Check</span>
                <svg className="fill-current opacity-75 h-[20px] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
              </span>

              {sentence.sentence}&nbsp;
            </span>
          );
        }
      })}

      {isFactcheck ?

        <div className='flex col-span-1 sm:col-span-2 text-center m-2'>
          <div className=' w-full col-span-1 mr-3'>
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >Sentence details
            </h1>


            {/* <div className="bg-gray-800 text-left rounded-lg p-5 my-3">


              <h6>"{predictSentence.sentence}"</h6>
              <h6>Model Verdict: {predictSentence.verdict}</h6>
              <h6>Percentage Score: {predictSentence.score} %</h6>

            </div> */}

            {/* Sentence table */}
            <div className="mt-4 col-span-2 sm:col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  "{predictSentence.sentence}"
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                      Model Verdict
                    </th>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {predictSentence.verdict}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Score
                    </th>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {predictSentence.score}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* Sentiment table */}
            <div className="mt-4 col-span-2 sm:col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  Sentiment Analysis Scores
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Classifying the polarity of our model texts or sentences as positive or negative is the fundamental task of applying the sentiment analysis features. To identify deceptive news text sentiment features and classify those sets of news article.
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Feature name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Scores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                      Sentiment Polarity
                    </th>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {predictSentence.sentiment.sentiment}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Positive Score
                    </th>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {predictSentence.sentiment.sentiment_pos}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Negative Score
                    </th>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {predictSentence.sentiment.sentiment_neg}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Neutral Score
                    </th>
                    <td className="px-6 py-4 dark:text-gray-300">
                      {predictSentence.sentiment.sentiment_neu}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div className='w-full col-span-1'>
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >Related Fact Checks
            </h1>

            <div>
              {googleArticles !== undefined ? googleArticles.map(googleArticle => {
                return (
                  <div className="bg-gray-800 rounded-lg p-1 my-3" key={googleArticle.claimReview[0].url}>
                    {/* <!-- Header --> */}
                    <div className="grid grid-cols-3 text-gray-200 items-center px-5 pt-5">
                      {/* <!-- Header Title --> */}
                      <div className="col-span-2 flex flex-row gap-3 items-center">
                        <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                          <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        </button>
                        <p className="font-bold"> {googleArticle.claimReview[0].textualRating} </p>
                      </div>
                    </div>
                    {/* <!-- Content --> */}
                    <a href={googleArticle.claimReview[0].url} target='_blank' className="cursor-point">
                      <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-4 mx-3">
                        {googleArticle.text}
                      </p>
                      <p>
                        by {googleArticle.claimReview[0].publisher.name}
                      </p>
                    </a>
                  </div>
                );
              }) : <div><p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-4 mx-3">
                No Related Fact Check Found.
              </p>
                Instead Related Urls Found.
                {urls.map(url => {
                  return (<div className="text-gray-200 font-light cursor-pointer hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-4 mx-3">
                    <a href={url} target='_blank' >
                      {url}
                    </a>
                  </div>)
                })}
              </div>}
            </div>

          </div>
        </div>
        : <span></span>}

    </div>
  );
};

export default HighlightSentences;
