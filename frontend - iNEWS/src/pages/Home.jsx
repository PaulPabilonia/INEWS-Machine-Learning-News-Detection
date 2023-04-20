import React from 'react'
import FeaturesSelections from '../components/FeaturesSelections'
import Alert from '../components/Alert'

const Home = () => {
  return (
    <div className='bg-gray-900'>
      <section className="py-10 ">
        <div className="mx-auto max-w-screen-xl lg:flex  lg:items-center">
          <div className="mx-auto max-w-7xl text-center lg:w-screen">
            <div>
              <h1
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                iNEWS : A Website for Fake News Detection
              </h1>
              <div className='w-full px-11'>
                <Alert
                  title={"Disclaimer"}
                  description={"The machine learning model does not have 100% accuracy. Please always practice fact checking on your own to verify the integrity of the news article."}
                />
              </div>

            </div>
            <FeaturesSelections />
          </div>

        </div>
      </section>


    </div>

  )
}

export default Home