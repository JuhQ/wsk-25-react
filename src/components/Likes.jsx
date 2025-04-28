import {useCallback, useEffect, useState} from 'react';

import {useLike} from '../hooks/apiHooks';
import {FaHeart, FaRegHeart} from 'react-icons/fa6';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({media_id}) => {
  const {getLikesByMediaId, postLike, deleteLike} = useLike();
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const token = localStorage.getItem('token');

  // TODO: Should come from context (merge context branch)
  const {user} = useUserContext();

  const getLikes = useCallback(async () => {
    const data = await getLikesByMediaId(media_id);
    setLikes(data);
  }, [getLikesByMediaId, media_id]);

  useEffect(() => {
    getLikes();
    // TODO: infinite loop jos getLikesByMediaId funktion laittaa depsuksi
    // getLikes voisi olla useCallbackin sisällä
  }, [getLikes]);

  useEffect(() => {
    console.log('moro', likes);
    setUserLike(likes.find((like) => like.user_id === user.user_id));
  }, [likes, user.user_id]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          // TODO: off-by-one virhetilanne klikissä

          if (userLike) {
            await deleteLike(userLike.like_id, token);
            await getLikes();
          } else {
            await postLike(media_id, token);
            await getLikes();
          }
        } catch (error) {
          console.log(error.message);
        }
      }}
    >
      {userLike ? <FaHeart /> : <FaRegHeart />} {likes.length} tykkäystä
    </button>
  );
};

export default Likes;
