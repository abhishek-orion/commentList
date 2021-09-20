import React, { Component } from 'react';
import './App.css';
import CommentsContainer from './CommentsPage/commentsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentsContainer />
        <button onClick={this.resetCommentFeed}>Reset comment feed</button>
      </div>
    );
  }

  private resetCommentFeed = () => {
    fetch('/api/reset-comments', {
      method: 'post'
    });
  }
}

export default App;
