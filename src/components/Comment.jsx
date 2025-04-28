const Comment = ({comment}) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm text-gray-500">{comment}</p>
    </div>
  );
};

export default Comment;
