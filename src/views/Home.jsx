import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';
import {useState} from 'react';

const Home = () => {
  const {mediaArray, deleteMedia, modifyMedia} = useMedia(true);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <h2 className="my-4 font-mono text-2xl">My Media</h2>
      <table>
        <thead>
          <tr className="*:border-2 *:border-[#ccc] *:p-4">
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
              deleteMedia={deleteMedia}
              modifyMedia={modifyMedia}
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};
export default Home;
