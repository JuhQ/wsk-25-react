import CommentForm from './CommentForm';
import Likes from './Likes';
import PropTypes from 'prop-types';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  const handleClick = () => {
    setSelectedItem(null);
  };

  return (
    <>
      {item && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="flex max-h-[90vh] w-11/12 max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
            {/* Header with close button */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 className="truncate text-xl font-bold text-white">
                {item.title}
              </h2>
              <button
                onClick={handleClick}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors duration-300 hover:bg-white/30"
                aria-label="Close dialog"
              >
                <span className="text-xl">&#10005;</span>
              </button>
            </div>

            {/* Media content */}
            <div className="flex-1 overflow-auto">
              <div className="flex justify-center bg-black">
                {item.media_type.includes('video') ? (
                  <video
                    src={item.filename}
                    controls
                    className="max-h-[50vh] w-auto object-contain"
                  />
                ) : (
                  <img
                    src={item.filename}
                    alt={item.title}
                    className="max-h-[50vh] w-auto object-contain"
                  />
                )}
              </div>

              {/* Content details */}
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="mb-6 whitespace-pre-wrap text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>

                {/* Likes component with styling */}
                <div className="mt-4 border-t pt-4 dark:border-gray-700">
                  <Likes media_id={item.media_id} />
                </div>
                <div>
                  <CommentForm item={item} />
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

SingleView.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
