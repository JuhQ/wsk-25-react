import {useCallback, useEffect, useState} from 'react';

import {fetchData} from '../utils/fetchData';
import {uniqBy} from 'lodash';

const authApiUrl = import.meta.env.VITE_AUTH_API;
const mediaApiUrl = import.meta.env.VITE_MEDIA_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(`${mediaApiUrl}/media`);
      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      const userData = await Promise.all(
        uniqueUserIds.map((item) =>
          fetchData(`${authApiUrl}/users/${item.user_id}`),
        ),
      );

      // duplikaattien poisto on tehtävänannon ulkopuolella, ei tarvitse toteuttaa
      const userMap = userData.reduce((map, {user_id, username}) => {
        map[user_id] = username;
        return map;
      }, {});

      const newData = mediaData.map((item) => ({
        ...item,
        username: userMap[item.user_id],
      }));

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...inputs,
      ...file,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return await fetchData(`${mediaApiUrl}/media`, fetchOptions);
  };

  const modifyMedia = async (inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    console.log('inputs', inputs);

    return await fetchData(
      `${mediaApiUrl}/media/${inputs.media_id}`,
      fetchOptions,
    );
  };

  const deleteMedia = async (id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return await fetchData(`${mediaApiUrl}/media/${id}`, fetchOptions);
  };

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };

    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
  };

  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      mode: 'cors',
      body: formData,
    };

    return await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
  };

  return {postFile};
};

const useLike = () => {
  const getLikesByMediaId = useCallback(async (id) => {
    const data = await fetchData(`${mediaApiUrl}/likes/bymedia/${id}`);

    console.log('like data', data);

    return data;
  }, []);

  const postLike = async (media_id, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };

    return await fetchData(`${mediaApiUrl}/likes`, fetchOptions);
  };

  const deleteLike = async (media_id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };

    return await fetchData(`${mediaApiUrl}/likes/${media_id}`, fetchOptions);
  };

  return {getLikesByMediaId, postLike, deleteLike};
};

export {useMedia, useAuthentication, useUser, useFile, useLike};
