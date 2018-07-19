import React from 'react';
import Dropdown from './dropdown';

const AppSettings = (props) => {
  
  const { handleClickSearchButton, 
          handleOptionChange, 
          tweetNumberOptions, 
          handleOnChange, 
          handleKeyPress, 
          input, 
          sortOptions, 
          sortBy, 
          numberOfTweets 
        } = props;

  return (
    <div className="app-settings-container">
      <div className="hashtag-search">
        <input 
          className="hashtag-search-input" 
          type="text" 
          placeholder="enter hashtags..."
          value={input}
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}
        />
        <div 
          className="hashtag-search-button" 
          onClick={handleClickSearchButton}
        >
          enter
        </div>
      </div>
      <Dropdown  // dropdown for sort
        handleOptionChange={handleOptionChange} 
        param="sortBy"
        label="sort by"
        options={sortOptions}
        value={sortBy}
      />
      <Dropdown // dropdown for number of tweets
        handleOptionChange={handleOptionChange} 
        param="numberOfTweets"
        label="# of Tweets"
        options={tweetNumberOptions}
        value={numberOfTweets}
      />
    </div>
  );
};

export default AppSettings;