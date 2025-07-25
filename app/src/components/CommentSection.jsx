import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';

const CommentSection = ({ blogId }) => {
  const { comments, addComment, deleteComment } = useBlog();
  const { isAuthenticated } = useAuth();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    addComment(blogId, {
      text: commentText,
      author: isAuthenticated ? 'Admin' : 'Guest'
    });
    setCommentText('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {(comments[blogId] || []).map(comment => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{comment.author}</p>
                <p className="text-gray-600">{comment.text}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              {isAuthenticated && (
                <button
                  onClick={() => deleteComment(blogId, comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;