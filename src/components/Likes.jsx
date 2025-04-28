import {useEffect, useState} from 'react';

import {useLike} from '../hooks/apiHooks';

const Likes = ({media_id}) => {
  const {getLikesByMediaId, postLike, deleteLike} = useLike();
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem('token');

  // TODO: Should come from context (merge context branch)
  const logged_in_userid = 280;

  const getLikes = async () => {
    const data = await getLikesByMediaId(media_id);
    setLikes(data);
  };

  useEffect(() => {
    getLikes();
    // TODO: infinite loop jos getLikesByMediaId funktion laittaa depsuksi
    // getLikes voisi olla useCallbackin sisällä
  }, [media_id]);

  console.log('likes', likes);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          // TODO: off-by-one virhetilanne klikissä
          const userLike = likes.find(
            (like) => like.user_id === logged_in_userid,
          );
          if (userLike) {
            deleteLike(userLike.like_id, token);
            getLikes();
          } else {
            await postLike(media_id, token);
            getLikes();
          }
        } catch (error) {
          console.log('tykkäys ei onnistu :(');
        }
      }}
    >
      ❤️ {likes.length} tykkäystä
    </button>
  );
};

export default Likes;
