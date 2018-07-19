import React, { Component } from 'react';
import axios from 'axios';
import Header from './header';
import Feed from './feed';
import FeedPlaceHolder from './feedPlaceHolder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtags: ['twitter'],
      input: '',
      numberOfTweets: 10,
      sortBy: 'retweets', 
      tweets: [],
      isLoading: false,
    };

    // changed popular to mixed because of a bug in 
    // twitter API where if the result_type is 
    // popular, count parameter will not work
    // and will give 15 tweets for any specified count
    this.sortQueries = { 
      favorites: 'mixed',
      retweets: 'mixed',
      recent: 'recent',
    };
    this.sortOptions = Object.keys(this.sortQueries);

    //create arr for number of tweets dropdown 1-10 then 10-100 (multiples of 10)
    const arr = Array(9).fill(null).map((e, i) => i + 1);
    this.tweetNumberOptions = arr.concat(Array(10).fill(null).map((e, i) => (i + 1) * 10));

    this.handleDeleteHashtag = this.handleDeleteHashtag.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickSearchButton = this.handleClickSearchButton.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  handleDeleteHashtag(index) {
    let { hashtags } = this.state;
    hashtags.splice(index, 1);
    this.setState({
      hashtags,
    }, () => this.fetch());
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.input.length > 0) {
      this.updateHashtags();
    }
  }

  handleClickSearchButton(e) {
    if (this.state.input.length > 0) {
      this.updateHashtags();
    }
  }

  handleOnChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleClickClear() {
    this.setState({
      hashtags: [],
      isLaoding: true,
    }, () => this.fetch());
  }

  handleOptionChange(e, param) {
    const { tweets, numberOfTweets } = this.state;
    const functions = {
      sortBy: () => this.sortTweets(this.state.tweets),
      numberOfTweets: () => this.fetch(),
    };
    this.setState({ [param]: e.target.value, isLoading: true }, 
      () => functions[param]());
  }

  updateHashtags() {
    let { hashtags, input } = this.state; 
    const inputArr = input.split(' ');
    
    //check if hashtag is already included, it true remove it
    const newHashtags = inputArr.map((hashtag) => {
      if (hashtag[0] === '#') return hashtag.trim().slice(1);
      else return hashtag.trim();
    })
    hashtags = hashtags.concat(newHashtags);
    this.setState({
      hashtags,
      input: '',
      isLoading: true,
    }, () => this.fetch());
  }

  generateFetchQuery() {
    const { hashtags, sortBy, numberOfTweets } = this.state;
    const qArr = hashtags.map((hashtag) => `#${hashtag}`);
    const q = qArr.join(' OR '); // join hashtags via OR
    return { params: 
      { 
        q, 
        result_type: this.sortQueries[sortBy],
        count: numberOfTweets,
      }
    };
  }

  sortTweets(tweets) {
    const sortParams = {
      favorites: 'favorite_count',
      retweets: 'retweet_count',
      recent: 'created_at',
    };
    const sortKey = sortParams[this.state.sortBy];
    if (this.state.sortBy !== 'recent') {
      tweets.sort((a, b) => b[sortKey] - a[sortKey]);
    } else { // sort by date for recent
      tweets.sort((a, b) => new Date(b[sortKey]) - new Date(a[sortKey]));
    }
    this.setState({ tweets, isLoading: false });
  }

  // fetcher of tweets to server
  fetch() {
    const query = this.generateFetchQuery()
    if (this.state.hashtags.length === 0) {
      this.setState({ tweets: [], isLoading: false });
    } else {
      axios.get('/search/tweets', query)
        .then((data) => {
          this.sortTweets(data.data.statuses);
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { tweets, isLoading, ...state } = this.state;
    return (
      <div className="app-container">
        <Header 
          handleDeleteHashtag={this.handleDeleteHashtag}
          handleClickSearchButton={this.handleClickSearchButton}
          handleOnChange={this.handleOnChange}
          handleKeyPress={this.handleKeyPress}
          handleOptionChange={this.handleOptionChange}
          handleClickClear={this.handleClickClear}
          sortOptions={this.sortOptions}
          tweetNumberOptions={this.tweetNumberOptions}
          {...state}
        />
        {tweets.length > 0 ? <Feed isLoading={isLoading} tweets={tweets}/> : <FeedPlaceHolder />}
      </div>
    );
  }
}

export default App;