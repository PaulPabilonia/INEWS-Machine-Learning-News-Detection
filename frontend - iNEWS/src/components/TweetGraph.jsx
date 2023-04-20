import './init'
import Graph from "react-graph-vis";
import React, { useEffect, useState } from "react";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import ReactDOM from "react-dom";
import Tweets from './Tweets';
import axios from "axios";


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#7122D0"
  }
};

const TweetGraph = ({ nodes, edges }) => {
  const [tweetId, setTweetID] = useState('');

  console.log('Graph: ', nodes, edges)


  const [state, setState] = useState({
    graph: {
      nodes: nodes,
      edges: edges
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes[0]);
        console.log("Selected edges:");
        console.log(edges);
        const selectedNode = state.graph.nodes.find(node => node.id === nodes[0])
        setTweetID(selectedNode.twitter_id)
        console.log("Selected twitter: " + selectedNode.twitter_id);
      }
    }
  })

  const { graph, events } = state;
  return (
    <div className='flex col-span-1 sm:col-span-2 text-center'>
      <div className=' w-full col-span-1'>
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >Graph
        </h1>
        <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
      </div>
      <div className='w-1/2 col-span-1'>
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >Tweets
        </h1>
        <Tweets key={tweetId} tweetId={tweetId} />
      </div>
    </div>

  )
}

export default TweetGraph