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
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm"
        >
          <div className="w-11/12 max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header with close button */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white truncate">
                {item.title}
              </h2>
              <button
                onClick={handleClick}
                className="text-white bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
                aria-label="Close dialog"
              >
                <span className="text-xl">&#10005;</span>
              </button>
            </div>

            {/* Media content */}
            <div className="overflow-auto flex-1">
              <div className="bg-black flex justify-center">
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
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-wrap">
                  {item.description}
                </p>

                {/* Likes component with styling */}
                <div className="mt-4 border-t pt-4 dark:border-gray-700">
                  <Likes media_id={item.media_id} />
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
