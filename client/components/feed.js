import React from 'react';
import TweetEntry from './tweetEntry';

const Feed = ({ tweets, isLoading }) => {
  return (
    <div className="feed-container">
      {tweets.map((tweet) => (<TweetEntry isLoading={isLoading} tweet={tweet} key={tweet.id} />))}
    </div>
  );
};

export default Feed;