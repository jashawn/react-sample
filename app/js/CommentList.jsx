import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map(function (comment) {
      return <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>;
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}


class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var author = this.state.author.trim();
    var text = this.state.text.trim();

    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    
    this.state = { author: '', text: '' };
  }

  render() {
    return (
      <form action="" className="commentForm" onSubmit={this.handleSubmit.bind(this) }>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange.bind(this) } />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange.bind(this) } />
        <input type="submit" value="Post"/>
      </form>
    );
  }
}

class Comment extends React.Component {

  rawMarkup() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    var md = new Remarkable();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup() } />
      </div>
    );
  }
}

export { CommentList, CommentForm };
