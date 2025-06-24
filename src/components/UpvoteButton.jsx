import { useState } from 'react';
import UseAxiosPublic from '../hooks/useAxiosPublic';

const UpvoteButton = ({ roadmapId, initialUpvotes }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [disabled, setDisabled] = useState(false);
  const axiosPublic = UseAxiosPublic();

  const handleUpvote = async () => {
    try {
      const res = await axiosPublic.put(`/roadmaps/${roadmapId}/upvote`);
      setUpvotes(res.data.upvotes);
      setDisabled(true);
    } catch (err) {
      console.error(err.response?.data?.message || 'Upvote failed');
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={disabled}
      className="bg-gray-800 text-white px-3 py-1 rounded-sm disabled:opacity-50"
    >
      👍 {upvotes} Upvote
    </button>
  );
};

export default UpvoteButton;
