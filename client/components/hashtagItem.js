import React, { Component } from 'react';

class hashtagItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    }
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
  }

  // shows the X button to delete a single hashtag
  handleOnMouseEnter() {
    this.setState({ isHidden: false });
  }

  // hides the xx button
  handleOnMouseLeave() {
    this.setState({ isHidden: true });
  }

  render() {
    const { hashtag, index, handleDeleteHashtag } = this.props;
    return (
      <div 
        onMouseEnter={this.handleOnMouseEnter} 
        onMouseLeave={this.handleOnMouseLeave}
        className="hashtag-item">
        <span 
          onClick={() => handleDeleteHashtag(index)}
          className={`del-button ${this.state.isHidden ? 'hidden' : null}`}
        >  
        x
        </span>
        {`#${hashtag}`}
      </div>
    );
  }
}

export default hashtagItem;
