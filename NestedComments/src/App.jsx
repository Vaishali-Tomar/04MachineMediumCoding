import React, { useState } from 'react';
import './App.css';

const Comment = ({ comment, addReply, deleteComment }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = () => {
    addReply(comment.id, replyText);
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button onClick={() => setShowReplyInput(!showReplyInput)}>
        {showReplyInput ? "Cancel" : "Reply"}
      </button>
      <button onClick={() => deleteComment(comment.id)}>Delete</button>
      {showReplyInput && (
        <div className="reply-input">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a reply..."
          />
          <button onClick={handleReply}>Add</button>
        </div>
      )}
      {comment.replies && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              addReply={addReply}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {
    setComments([
      ...comments,
      { id: Date.now(), text: commentText, replies: [] }
    ]);
    setCommentText("");
  };

  const addReply = (parentId, text) => {
    const addReplyToComment = (comments) => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { id: Date.now(), text, replies: [] }
            ]
          };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          };
        }
        return comment;
      });
    };
    setComments(addReplyToComment(comments));
  };

  const deleteComment = (id) => {
    const deleteCommentById = (comments) => {
      return comments
        .filter(comment => comment.id !== id)
        .map(comment => ({
          ...comment,
          replies: deleteCommentById(comment.replies)
        }));
    };
    setComments(deleteCommentById(comments));
  };

  return (
    <div className="App">
      <h1>Comments</h1>
      <div className="comment-input">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add comment..."
        />
        <button onClick={addComment}>Add</button>
      </div>
      <div className="comments">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            addReply={addReply}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
