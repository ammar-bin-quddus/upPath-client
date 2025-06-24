import { useState } from 'react';

const Comment = ({ comment, depth = 0, onReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment._id, replyText);
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  return (
    <div className={`pl-${depth * 4} mt-4 border-l-2 border-gray-300`}>
      <p className="text-sm font-semibold">{comment.author?.name || 'User'}</p>
      <p className="text-sm mb-1">{comment.text}</p>

      {/* Show reply button for depth < 3 */}
      {depth < 2 && (
        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="text-xs text-blue-500 hover:underline"
        >
          {showReplyBox ? 'Cancel' : 'Reply'}
        </button>
      )}

      {/* Reply box */}
      {showReplyBox && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border rounded text-sm"
            rows="2"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <button
            onClick={handleReplySubmit}
            className="mt-1 bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Submit
          </button>
        </div>
      )}

      {/* Render nested replies */}
      {comment.children?.map((child) => (
        <Comment
          key={child._id}
          comment={child}
          depth={depth + 1}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

const CommentThread = ({ comments, onReply }) => {
  return (
    <div className="mt-6">
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onReply={onReply} />
      ))}
    </div>
  );
};

export default CommentThread;
