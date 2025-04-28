import useForm from '../hooks/formHooks';
import TextInput from './ui/TextInput';
import {useComment} from '../hooks/apiHooks';
import {useUpdateContext} from '../hooks/contextHooks';

// CommentForm.jsx
const CommentForm = ({item}) => {
  const {postComment} = useComment();
  const {update, setUpdate} = useUpdateContext();

  const initValues = {
    comment: '',
  };

  const doComment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const result = await postComment(inputs, item.media_id, token);
      console.log(result);
      setUpdate(!update);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doComment,
    initValues,
  );

  console.log(inputs);
  return (
    <>
      <h1>Comments</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Post comment"
          onChange={handleInputChange}
          type="text"
          id="comment"
          name="comment_text"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CommentForm;
