import React from 'react'
import logo from '../assets/images/inews_logo.png';
import url from '../assets/images/icons/website-50.png';
import txt from '../assets/images/icons/txt-50.png';
import doc from '../assets/images/icons/doc-50.png';
import how from '../assets/images/icons/how-50.png';
import feed from '../assets/images/icons/feed-50.png';
import forum from '../assets/images/icons/forum-50.png';

import Service from './Service';

const services = [
  {
    id: '1',
    icon: url,
    title: 'Predict News Using URL',
    description: 'This feature allows users to input a link to an article and receive a report on whether the article is likely to be True, Mostly-True, Half-True, Mostly-False, False or Pants-of-Fire',
  },
  {
    id: '2',
    icon: txt,
    title: 'Predict News Using TEXT',
    description: 'This feature allows users to input a block of text and receive a report on whether the text is likely to be True, Mostly-True, Half-True, Mostly-False, False or Pants-of-Fire',
  },
  {
    id: '3',
    icon: doc,
    title: 'Predict News Using Documents',
    description: 'This feature allows users to upload a document (e.g. a PDF or Word document) and receive a report on whether the document is likely to be True, Mostly-True, Half-True, Mostly-False, False or Pants-of-Fire',
  },
  {
    id: '4',
    icon: how,
    title: 'How It Works',
    description: 'Do you want to know how our models work? Our How It Work Page will break the steps and process on how our automatic fake news prediction developed. Maybe you can make your own model! Read and see how it works!',
  },
  {
    id: '5',
    icon: feed,
    title: 'NewsFeed',
    description: 'Stay up-to-date on the latest fake news and misinformation with our news feed feature. Our algorithm continuously scans the web for articles and information that may be fake, and displays the most recent ones in the feed below. Each item in the feed includes a summary of the article or information, as well as a report on its credibility.',
  },
  {
    id: '6',
    icon: forum,
    title: 'Community/Forum',
    description: 'Have a question or concern about fake news that you want to discuss with others? Our community forum is a place for users to share their experiences and get feedback and support from the community. Join the conversation today!',
  },
]

const Services = () => {
  return (
    <section className="bg-gray-900 pt-10 lg:pt-[120px] pb-12 lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
              <span className="font-semibold text-lg text-white mb-2 block">
                Our Services
              </span>
              <h2
                className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent
                  mb-4
                  "
              >
                What We Offer
              </h2>
              <p className="text-base text-white">
                There are many variations of passages of iNEWS available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 " >
          {(services.map((service) => (
            <Service key={service.id} title={service.title} description={service.description} icon={service.icon} />
          )))}
        </div>
      </div>
    </section>
  )
}

export default Services