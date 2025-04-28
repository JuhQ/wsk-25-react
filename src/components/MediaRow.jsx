import EditDialog from './EditDialog';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {useAuthentication} from '../hooks/apiHooks';
import {useState} from 'react';

const MediaRow = (props) => {
  const {isLoggedIn} = useAuthentication();
  const [visible, setVisible] = useState(true);
  const token = localStorage.getItem('token');
  const [showEdit, setShowEdit] = useState(false);

  const {item, setSelectedItem, deleteMedia, modifyMedia} = props;

  // TODO: userid should come from context, not hardcoded value
  const loggedin_user_id = 280;

  if (!visible) {
    return null;
  }

  return (
    <tr className="*:p-4 *:border-2 *:border-[#ccc]">
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-52 object-cover"
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.username}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td className="p-0!">
        <div className="flex gap-2 *:p-2">
          {/* <button
          className="hover:bg-amber-300 hover:text-gray-900 p-8"
          onClick={handleClick}
        >
          View
        </button> */}
          <Link
            to="/single"
            state={{item}}
            className="hover:bg-amber-300 hover:text-gray-900"
            onClick={(event) => {
              event.preventDefault();

              setSelectedItem(item);
            }}
          >
            View
          </Link>

          {isLoggedIn && item.user_id === loggedin_user_id && (
            <>
              <button
                type="button"
                className="hover:bg-sky-400 hover:text-black border-2 rounded bg-blue-400"
                onClick={() => {
                  console.log('edit button clicked');
                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              {showEdit && (
                <EditDialog
                  item={item}
                  modifyMedia={modifyMedia}
                  onClose={() => setShowEdit(false)}
                />
              )}

              <button
                type="button"
                className="hover:bg-red-500 rounded bg-red-200 text-red-900 hover:text-red-100"
                onClick={() => {
                  console.log('delete button clicked');
                  if (
                    confirm('Oletko varma että haluat poistaa tämän kuvan?')
                  ) {
                    deleteMedia(item.media_id, token);
                    setVisible(false);
                  }
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
