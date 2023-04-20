import React from 'react'
import YoutubeEmbed from '../components/YoutubeEmbed'
import '../sassStyles/prediction.scss'
import RelatedNews from '../components/RelatedNews'
import AddComment from '../components/AddComment'
import { useParams } from 'react-router-dom'
import no_image from "../assets/images/no-image.png"
// const related_articless = [
//   { id: '0', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', title: 'Messi dsfds fds  sdf sdf', rating: "U-20", starRating: "2.2", date: '2022', genre: "football", runtime: "1h 32m", cast: "Messi, Pele" },
//   { id: '1', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', title: 'Ronaldo sdf sdf dsf s', rating: "U-20", starRating: "1.2", date: '2014', genre: "drama", runtime: "3h 32m", cast: "Ronaldo, Pele" },
//   { id: '2', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', title: 'Mbappe', rating: "U-20", starRating: "1.3", date: '2018', genre: "musical", runtime: "2h 42m", cast: "Messi, Mbappe" },
//   { id: '3', image: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg', title: 'Pele', rating: "U-20", starRating: "2.1", date: '1959', genre: "action", runtime: "2h 31m", cast: "Maradona, Pele" },
// ]

// const articles = {
//   "id": 2,
//   "feature": "text",
//   "headlines": "sCOA gives OVP highest audit rating for third successive year",
//   "summary": "MANILA, Philippines — For the third consecutive year, the office of Vice President Leni Robredo received the highest audit rating from the Commission on Audit (COA).\nThe Office of the Vice President (OVP) said that state auditors gave an “unqualified opinion” on its financial report for the fiscal year 2020.\nADVERTISEMENTAccording to COA, an “unqualified opinion” rating is considered the best opinion that a government agency can receive.\nCOA gives such a rating when a government office has fairly presented its financial position and has its financial statements in order, in accordance with the Philippine Public Sector Accounting Standards.\nThe OVP also received an “unqualified opinion” from state auditors for the fiscal years 2018 and 2019.",
//   "news_img": null,
//   "news_link": null,
//   "date": "2023-01-16",
//   "keywords": "rating opinion ovp audit year office coa “ unqualified ”",
//   "authors": "GMA Networks",
//   "verdict": "false",
//   "fuzzy_store": "32.5, 15.94, 13.3, 24.97, 2.65, 10.63",
//   "reason": null,
//   "sentiment": {
//     "id": 2,
//     "sentiment": "neutral",
//     "sentiment_pos": "0.036",
//     "sentiment_neg": "0.0",
//     "sentiment_nuetral": "0.964"
//   },
//   "linguistic": {
//     "id": 2,
//     "lang": "en",
//     "uppercase_count": "53",
//     "lowercase_count": "550",
//     "num_counts": "12",
//     "at_count": "0",
//     "question_count": "0",
//     "slash_count": "0",
//     "hashtag_count": "0",
//     "word_count": "112",
//     "char_count": "639",
//     "sentence_count": "5",
//     "avg_word_length": "5.71",
//     "avg_sentence_length": "22.4"
//   },
//   "file": null,
//   "created_at": "2023-01-16T01:50:01.627925Z",
//   "update_at": "2023-01-16T01:50:01.859422Z",
//   "author": null,
//   "comments": []
// }

import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonImage from '../components/Skeleton/SkeletonImage'
import SkeletonTitle from '../components/Skeleton/SkeletonTitle'
import SkeletonSummary from '../components/Skeleton/SkeletonSummary'
import SkeletonRelated from '../components/Skeleton/SkeletonRelated'
import DataReport from '../assets/images/illustrations/data-report-animate.svg';
import TweetGraph from '../components/TweetGraph'
import HighlightSentences from '../components/HighlightSentences'

import { TwitterTweetEmbed } from 'react-twitter-embed';
const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/prediction/"
});




const Prediction = () => {
  const { id } = useParams();

  const [article, setArticle] = useState([]);
  const [related_articles, setRelatedArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [linguistic, setLinguistic] = useState([]);
  const [fuzzy_score, setFuzzyScore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [sentences, setSentences] = useState([]);




  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      let response = await client.get(id,);
      console.log(response)
      console.log(response.data)
      console.log(response.data.prediction.comments)
      console.log('sentiments', response.data.prediction.sentiment)
      console.log('linguistic', response.data.prediction.linguistic)
      console.log('graph', response.data.graph)
      console.log('nodes', response.data.graph.nodes)
      console.log('edges', response.data.graph.edges)
      setArticle(response.data.prediction);
      setRelatedArticles(response.data.related_news)
      setNodes(response.data.graph.nodes)
      setEdges(response.data.graph.edges)
      setSentences(response.data.sentences)
      setComments(response.data.prediction.comments)
      setSentiment(response.data.prediction.sentiment)
      setLinguistic(response.data.prediction.linguistic)
      setFuzzyScore(response.data.prediction.fuzzy_store.split(','))
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  // const sentences1 = [
  //   {
  //     id: 1,
  //     verdict: 'False',
  //     sentence: 'The moon is made of cheese.',
  //     score: 5
  //   },
  //   {
  //     id: 2,
  //     verdict: 'Pants-on-Fire',
  //     sentence: 'Aliens have infiltrated the government.',
  //     score: 0
  //   },
  //   {
  //     id: 3,
  //     verdict: 'Mostly-False',
  //     sentence: 'Vaccines cause autism.',
  //     score: 20
  //   },
  //   {
  //     id: 4,
  //     verdict: 'Half-True',
  //     sentence: 'Eating too much sugar causes diabetes.',
  //     score: 60
  //   },
  //   {
  //     id: 5,
  //     verdict: 'True',
  //     sentence: 'The sun rises in the east and sets in the west.',
  //     score: 90
  //   },
  //   {
  //     id: 6,
  //     verdict: 'Mostly-True',
  //     sentence: 'Regular exercise can improve overall health.',
  //     score: 80
  //   },
  //   {
  //     id: 7,
  //     verdict: 'Mostly-False',
  //     sentence: 'The COVID-19 pandemic is a hoax.',
  //     score: 15
  //   },
  //   {
  //     id: 8,
  //     verdict: 'False',
  //     sentence: 'The earth is the center of the universe.',
  //     score: 5
  //   },
  //   {
  //     id: 9,
  //     verdict: 'Half-True',
  //     sentence: 'Coffee can increase alertness, but also cause jitters.',
  //     score: 50
  //   },
  //   {
  //     id: 10,
  //     verdict: 'True',
  //     sentence: 'Water freezes at 0 degrees Celsius.',
  //     score: 90
  //   },
  //   {
  //     id: 11,
  //     verdict: 'Mostly-True',
  //     sentence: 'Reading is a great way to improve cognitive function.',
  //     score: 80
  //   },
  //   {
  //     id: 12,
  //     verdict: 'Mostly-False',
  //     sentence: 'Climate change is a hoax.',
  //     score: 20
  //   },
  //   {
  //     id: 13,
  //     verdict: 'Half-True',
  //     sentence: 'Taking vitamin C can help prevent colds, but wont cure them.',
  //     score: 50
  //   },
  //   {
  //     id: 14,
  //     verdict: 'True',
  //     sentence: 'The human body has 206 bones.',
  //     score: 90
  //   },
  //   {
  //     id: 15,
  //     verdict: 'False',
  //     sentence: 'The earth is only 5,000 years old.',
  //     score: 10
  //   },
  //   {
  //     id: 16,
  //     verdict: 'Mostly-True',
  //     sentence: 'Meditation can help reduce stress and anxiety.',
  //     score: 80
  //   },
  //   {
  //     id: 17,
  //     verdict: 'Half-True',
  //     sentence: 'Red wine can have health benefits when consumed in moderation.',
  //     score: 60
  //   },
  //   {
  //     id: 18,
  //     verdict: 'Mostly-False',
  //     sentence: 'Chemtrails are a government conspiracy to control the population.',
  //     score: 15
  //   },
  //   {
  //     id: 19,
  //     verdict: 'False',
  //     sentence: 'Gravity is a myth.',
  //     score: 10
  //   },
  //   {
  //     id: 20,
  //     verdict: 'True',
  //     sentence: 'The speed of light is approximately 299,792,458 meters per second.',
  //     score: 90
  //   }
  // ]


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 dark:bg-gray-900 dark:text-gray-100">
        <main className=" col-span-9 py-6 px-4 sm:p-6 md:py-10 md:px-8">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Result {id}</h1>
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
            <div className="relative p-3 col-start-2 sm:col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
              <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">{loading ? <SkeletonTitle /> : article.headlines}</h1>
              <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">HEADLINE</p>
            </div>
            <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
              {loading ? <SkeletonImage /> : <img src={article.news_img !== null ? article.news_img : no_image} alt="" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy" />}
            </div>
            <dl className="col-start-2 sm:col-start-1 mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
              <dt className="sr-only">Reviews</dt>
              <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
                <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
                  <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{article.fuzzy_store} <span className="text-slate-400 font-normal">({article.verdict})</span></span>
              </dd>
              <dt className="sr-only">Location</dt>
              <dd className="flex items-center">
                <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
                  <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                  <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                </svg>
                {article.authors}
              </dd>
            </dl>
            <div className="mt-4 col-start-2 sm:col-start-1 row-start-3 self-center sm:mt-0 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-4 lg:row-end-4">
              <a href={article.news_link !== null ? `${article.news_link}` : 'No Available Link'} target="_blank" type="button" className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Read More</a>
            </div>

            <p className="mt-4 text-sm leading-6 col-start-1 col-span-2 dark:text-slate-400">
              {loading ? <SkeletonSummary /> : <HighlightSentences sentences={sentences} fuzzy_score={fuzzy_score} article_verdict = {article.verdict}/>}
            </p>
            <p className="mt-4 text-sm leading-6 col-start-1 col-span-2 dark:text-slate-400"><span className="font-semibold">Keywords:</span>  {article.keywords}</p>
            <div className="my-4 leading-6 col-start-1 col-span-2 dark:text-slate-400">
              <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white my-5">Prediction Report Details</h1>
              <p className='text-normal text-gray-300 antialiased'>We provide a detailed report on the predicted authenticity of a news article or statement using sentiment analysis and linguistic feature analysis, including predicted authenticity, sentiment breakdown, linguistic features summary, confidence score, context and explanation, and timestamp of the analysis.</p>
            </div>

            {loading ? <div className="flex col-span-2 dark:bg-gray-900 dark:text-gray-100">
              <div className="m-auto">

                <div className="text-center flex align-middle items-center">
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <div className='font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent'>Generating Report ...</div>
                </div>
                <img src={DataReport} alt="Loading" />

              </div>
            </div> : <div className="col-span-2">
              {/* Confidence Score table */}
              <div className="mt-4 col-span-2 sm:col-span-2 relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Confidence Scores
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      This expresses the confidence level of a prediction as a percentage value, where 100% represents the highest level of confidence and 0% the lowest, allowing users to easily evaluate the reliability of the results and compare the confidence level of different predictions.
                    </p>
                  </caption>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Label
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Prediction Percentage (%)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Label
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Prediction Percentage (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900  dark:text-white">
                        True
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {fuzzy_score[0]}%
                      </td>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        False
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {fuzzy_score[4]}%
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Mostly-True
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {fuzzy_score[1]}%
                      </td>
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Mostly-False
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {fuzzy_score[3]}%
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Half-True
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {fuzzy_score[2]}%
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Pants on Fire!
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {fuzzy_score[5]}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Linguistic table */}
              <div className="mt-4 col-span-2 sm:col-span-2 sm:col-start-1 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  text-center text-gray-500 dark:text-gray-400">
                  <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Linguistic Scores
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      To classify news as a basis for news journalistic integrity assumption and analyze the truth value of fake texts, Linguistic Feature analyzes and investigates the content structure and style of news articles based on their linguistic characteristics.
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
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Language
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.lang}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Uppercase Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.uppercase_count}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Lowercase Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.lowercase_count}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Number# Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.num_counts}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        @ Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.at_count}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Question Mark(?) Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.question_count}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Slash(/) Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.slash_count}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Hashtag(#) Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.hashtag_count}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Word Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.word_count}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Character Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.char_count}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Sentence Count
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.sentence_count}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Average Word Length
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.avg_word_length}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Average Sentence Length
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {linguistic.avg_sentence_length}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
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
                        {sentiment.sentiment}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Positive Score
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {sentiment.sentiment_pos}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Negative Score
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {sentiment.sentiment_neg}
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Neutral Score
                      </th>
                      <td className="px-6 py-4 dark:text-gray-300">
                        {sentiment.sentiment_nuetral}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='col-span-2 sm:col-span-2 mt-5'>
                <TweetGraph nodes={nodes} edges={edges} />
              </div>

            </div>}


            {/* <div className='col-span-2 sm:col-span-2 mt-5'>
              <HighlightSentences sentences={sentences1} fuzzy_score={fuzzy_score} article_verdict = 'True'/>
            </div> */}



          </div>
          <AddComment comments={comments} />
        </main>
        <aside className="p-2 self-start sticky top-1 col-span-3">
          {/* <!-- Card --> */}
          <div className="bg-gray-800 rounded-lg p-1">
            {/* <!-- Header --> */}
            <div className="grid grid-cols-3 text-gray-200 items-center px-5 pt-5">
              {/* <!-- Header Title --> */}
              <div className="col-span-2 flex flex-row gap-3 items-center">
                <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1">
                  <svg className="w-8 h-8 inline " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                </button>
                <p className="font-bold"> Disclaimer </p>
              </div>
            </div>
            {/* <!-- Content --> */}
            <a href="#" className="">
              <p className="text-gray-200 font-light hover:bg-gray-700 delay-50 duration-100 p-2 rounded-lg my-4 mx-3">
                The machine learning model <span className="font-semibold">does not</span>  have 100% accuracy. Please always <span className="font-semibold">practice fact checking </span> on your own to verify the integrity of the news article.
              </p>
            </a>
          </div>
          <div className="bg-gray-800 rounded-lg p-1 my-3">
            {loading ? <SkeletonRelated /> : <RelatedNews articles={related_articles} />}
          </div>
          <div className="h-24 my-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 flex justify-center items-center p-3 rounded-xl  shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
            <div className="text-center">
              <div>iNEWS</div>
              <div className="font-mono text-xs">Combat fake news with our automatic detection tool.</div>
            </div>
          </div>
          <YoutubeEmbed embedId="AkwWcHekMdo" />
        </aside>
      </div>

    </>
  )
}

export default Prediction