import React from 'react';
import HashtagItem from './hashtagItem';

const HashtagBar = ({ hashtags, handleDeleteHashtag, handleClickClear }) => {
  return (
    <div className="hashtag-container">
      {hashtags.length === 0 ? <div>hashtags here...</div> : (
        <div className="hashtag-item clear-all" onClick={handleClickClear}>
          clear all
        </div>
      )}
      {hashtags.map((hashtag, i) => {
        return (
          <HashtagItem 
            key={hashtag}
            hashtag={hashtag} 
            index={i} 
            handleDeleteHashtag={handleDeleteHashtag}
          />
        )
      })}
    </div>
  );
};

export default HashtagBar;