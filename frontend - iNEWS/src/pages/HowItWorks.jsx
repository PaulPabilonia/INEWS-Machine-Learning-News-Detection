import { number } from 'prop-types'
import React from 'react'
import Steps from '../components/Steps'
import Alert from '../components/Alert'
import training from '../assets/images/how/barbell-50.png';
import data from '../assets/images/how/data-50.png';
import deployment from '../assets/images/how/deployment-50.png';
import evaluation from '../assets/images/how/evaluation-50.png';
import gears from '../assets/images/how/gears-50.png';
import search from '../assets/images/how/search-50.png';

const steps = [
  {
    id: '1',
    image: data,
    title: 'DATA GATHERING/PREPROCESSING',
    content: 'Collecting and preprocessing the data: This step involves collecting a large dataset of news articles and preprocessing them to prepare them for analysis. This might include cleaning the data to remove any formatting or other issues, as well as tokenizing the text to split it up into individual words or phrases.'
  },
  {
    id: '2',
    image: search,
    title: 'FEATURE EXTRACTION',
    content: 'Feature extraction: In this step, the data is converted into a format that can be used by machine learning algorithms. This typically involves extracting features from the text, such as the presence of certain keywords or phrases, the use of certain punctuation, or the length of the article. In Our case we have Sentiment, Linguistic and Vectorizer Features.'
  },
  {
    id: '3',
    image: training,
    title: 'TRAINING',
    content: 'Training a machine learning model: In this step, a machine learning algorithm is trained on the preprocessed data. The algorithm is typically trained to classify news articles as True, Mostly-True, Half-True, Mostly-False,False or Pants-of-Fire, based on the features that were extracted in the previous step.'
  },
  {
    id: '4',
    image: evaluation,
    title: 'EVALUATING THE MODEL',
    content: 'Evaluating the model: Once the model has been trained, it is evaluated to see how well it performs. This might involve using a separate dataset of news articles that the model has not seen before, and comparing the model predictions to the known labels (True, Mostly-True, Half-True,Mostly-False,False or Pants - of - Fire ) of those articles.'
  },
  {
    id: '5',
    image: gears,
    title: 'FINE-TUNING',
    content: 'Fine-tuning the model: If the model performance is not satisfactory, it can be fine-tuned by adjusting the parameters of the algorithm or by using a different type of machine learning model. This process is repeated until the model achieves the desired level of performance.'
  },
  {
    id: '6',
    image: deployment,
    title: 'INTEGRATION/DEPLOYMENT',
    content: 'Integrate the model: Once the model has been trained and fine-tuned, it can be deployed in a production environment, where it can be used to automatically classify new news articles as they are published.'
  },
]
const HowItWorks = () => {
  return (
    <div className='dark:bg-gray-900 dark:text-gray-100'>
      <div className="mx-auto max-w-screen-xl lg:flex  lg:items-center">
        <div className="mx-auto max-w-7xl text-center lg:w-screen">
          <div className='pt-16'>
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              How It Works!
            </h1>

            <div className='mx-3'>
              <Alert title={"Disclaimer"} description={"The machine learning model does not have 100% accuracy. Please always practice fact checking on your own to verify the integrity of the news article."} />
            </div>

          </div>
        </div>

      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="container px-5 py-10 mx-auto flex flex-wrap">

              {steps.map((step) => (
                <Steps key={step.id} number={step.id} title={step.title} content={step.content} image={step.image} />
              ))}


            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks