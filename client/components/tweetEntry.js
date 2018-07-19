import React from 'react';
import moment from 'moment';

const TweetEntry = ({ tweet, isLoading }) => {
  return (
    <div className={`tweet-container ${isLoading ? 'loading' : ''}`}>
      <div className="pic-container">
        <img className="profile-pic" src={tweet.user.profile_image_url_https}/>
      </div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="cont-head-item name">{tweet.user.name}</div>
          <div className="cont-head-item screen-name">@{tweet.user.screen_name}</div>
          <div className="cont-head-item date-created">{moment(tweet.created_at).format('MMM DD')}</div>
        </div>
        <div className="tweet-text">{tweet.text}</div>
        <div className="content-footer">
          <div className="footer-item">
            <i className="fas fa-retweet"></i>
            {tweet.retweet_count}
          </div>
          <div className="footer-item">
            <i className="fas fa-heart"></i>
            {tweet.favorite_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetEntry;

