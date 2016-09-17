import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { CommentList, CommentForm } from './CommentList';

var data = [
  { id: 1, author: "Pete Hunt", text: "This is one comment" },
  { id: 2, author: "Jordan Walke", text: "This is *another* comment" }
];

class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadComments = this.loadComments.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  loadComments() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,

      success: function (data) {
        this.setState({ data: data });
      }.bind(this),

      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  handleCommentSubmit(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.loadComments();
    setInterval(this.loadComments, this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    )
  }
}

$(document).ready(function () {
  ReactDOM.render(<CommentBox url="/api/comments" pollInterval={2000} />, document.getElementById('content'));
});
