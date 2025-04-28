import useForm from '../hooks/formHooks';

const EditDialog = ({item, modifyMedia, onClose}) => {
  const doEdit = async () => {
    try {
      const token = window.localStorage.getItem('token');

      await modifyMedia(inputs, token);
      onClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doEdit, item);

  return (
    <dialog
      open
      className="w-3/4 max-w-2xl bg-white shadow-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl p-8 border border-gray-200"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Edit Media
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            value={inputs.title}
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            placeholder="Enter media title"
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            value={inputs.description}
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            placeholder="Enter media description"
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white font-semibold rounded-lg py-2 px-6 hover:bg-blue-600 transition duration-300"
            type="submit"
            disabled={!(inputs?.title.length > 3)}
          >
            Save
          </button>
          <button
            className="bg-gray-200 text-gray-700 font-semibold rounded-lg py-2 px-6 hover:bg-gray-300 transition duration-300"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default EditDialog;
