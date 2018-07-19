import React from 'react';
import HashtagBar from './hashtagBar';
import AppSettings from './appSettings';

const Header = ({ hashtags, handleDeleteHashtag, handleClickClear, ...props }) => {
  return (
    <div className="header">
      <div className="title">Twitter Feed</div>
      <HashtagBar 
        hashtags={hashtags} 
        handleDeleteHashtag={handleDeleteHashtag}
        handleClickClear={handleClickClear}
      />
      <AppSettings 
        {...props}
      />
    </div>
  );
};

export default Header;