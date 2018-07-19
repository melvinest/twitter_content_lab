import React from 'react';

//placeholder when feed is empty
const FeedPlaceHolder = () => {
  return (
    <div className="placeholder">
      <div className="placeholder-text">Feed Empty...</div>
      <div className="placeholder-text">Please Enter Hashtags to Fetch Tweets</div>
    </div>
  );
};

export default FeedPlaceHolder;