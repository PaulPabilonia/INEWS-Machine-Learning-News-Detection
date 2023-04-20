import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed';

const Tweets = ({ tweetId }) => {
  console.log('ID twt:',tweetId)
  return (
    <TwitterTweetEmbed
      tweetId={tweetId ? tweetId : '1616179085507702785'}
    />
  )
}

export default Tweets