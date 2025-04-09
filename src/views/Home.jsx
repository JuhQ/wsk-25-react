import {useEffect, useState} from 'react';

import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {fetchData} from '../utils/fetchData';
// import {uniq} from 'lodash';
import {uniqBy} from 'lodash';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log('selectedItem', selectedItem);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      // uniikit arvot käyttäen lodash uniq funktiota, vaatii mapin, mutta mapin myötä palauttaa vain user_id:t
      // const uniqueUserIds = uniq(mediaData.map(({user_id}) => user_id));

      // uniikit arvot käyttäen lodash uniqBy funktiota, helpompi käyttää, mutta palauttaa enemmän dataa (esim jos alkiot on objekteja, palauttaa kaikki uniikit objektit)
      // console.log:lla kannattaa tarkistaa mitä kumpainenkin palauttaa
      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      console.log('uniqueUserIds', uniqueUserIds);

      const authApiUrl = import.meta.env.VITE_AUTH_API;
      // vanha logiikka, hakee duplikaattidataa turhaan
      // const newData = await Promise.all(
      //   mediaData.map(async (item) => {
      //     const data = await fetchData(`${authApiUrl}/users/${item.user_id}`);

      //     return {...item, username: data.username};
      //   }),
      // );
      const userData = await Promise.all(
        uniqueUserIds.map(
          async (item) =>
            await fetchData(`${authApiUrl}/users/${item.user_id}`),
        ),
      );

      console.log('userData', userData);

      // uniikin datan hakemisen myötä joudutaan hieman logiikkaa restrukturoimaan
      // säästö on kuitenkin selvä, vähemmän verkon yli meneviä pyyntöjä
      const newData = mediaData.map((item) => {
        const user = userData.find(({user_id}) => user_id === item.user_id);
        return {...item, username: user.username};
      });

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log('mediaArray', mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
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
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};
export default Home;
