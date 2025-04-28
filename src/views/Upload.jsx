import {useFile, useMedia} from '../hooks/apiHooks';

import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      // implement upload
      const token = window.localStorage.getItem('token');

      const fileResult = await postFile(file, token);
      console.log('fileResult', fileResult);

      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('mediaResult', mediaResult);

      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      // TODO: set the file to state
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <h1 className="text-4xl my-12">Upload</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-2 flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            placeholder="Media title"
            className="border-2 border-amber-100 ml-2 rounded py-1 px-4"
          />
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            placeholder="Media description"
            className="border-2 border-amber-100 ml-2 rounded py-1 px-4"
          ></textarea>
        </div>
        <div className="my-2 flex flex-col">
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="
              block w-full text-sm text-white border
              border-gray-300 rounded-lg cursor-pointer bg-zinc-700
              dark:text-gray-400 focus:outline-none dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400
              p-2 py-12
              "
          />

          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF.
          </p>
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/600x400?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className="rounded border-2 border-amber-300 mt-4 p-2 px-12"
          type="submit"
          disabled={!(file && inputs?.title.length > 3)}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
