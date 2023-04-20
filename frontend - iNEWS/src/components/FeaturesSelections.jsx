import React from 'react'
import FeatureURL from './FeatureURL';
import FeatureText from './FeatureText';
import FeatureDocument from './FeatureDocument';

const FeaturesSelections = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const color = "blue"
  return (
    <>
      <div className="bg-gray-900 flex flex-wrap">
        <div className="w-full ">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center m-2">
              <a
                className={
                  "block w-full rounded-lg border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto" +
                  (openTab === 1
                    ? " bg-" + color + "-600"
                    : "text-" + color + "-600 ")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                URL
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center m-2">
              <a
                className={
                  "block w-full rounded-lg border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto" +
                  (openTab === 2
                    ? " bg-" + color + "-600"
                    : "text-" + color + "-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                TEXT
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center m-2">
              <a
                className={
                  "block w-full rounded-lg border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto" +
                  (openTab === 3
                    ? " bg-" + color + "-600"
                    : "text-" + color + "-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Documents
              </a>
            </li>
          </ul>

          <div className="relative flex flex-col min-w-0 break-word text-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space max-w-fit mx-auto">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <p>
                    This feature allows users to input a link to an article and receive a report on whether the article is likely to be
                    <br />
                    <strong> True, Mostly-True, Half-True, Mostly-False, False or Pants-of-Fire</strong>.
                  </p>
                  <FeatureURL />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>
                    This feature allows users to input a block of text and receive a report on whether the text is likely to be
                    <br />
                    <strong> True, Mostly-True, Half-True, Mostly-False, False or Pants-of-Fire</strong>.
                  </p>
                  <FeatureText />
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <p>
                    This feature allows users to upload a document (e.g. a PDF or Word document) and receive a report on whether the document is likely to be
                    <br />
                    <strong> True, Mostly-True, Half-True, Mostly-False, False or Pants-of-Fire</strong>.
                  </p>
                  <FeatureDocument />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturesSelections


