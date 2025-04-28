import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';
import TextInput from './ui/TextInput';

// CommentForm.jsx
const CommentForm = () => {
  const {user} = useUserContext();
  const {postComment} = useUserContext();

  const initValues = {
    comment: '',
  };

  const doComment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const result = await postComment(inputs, user.media_id, token);
      console.log(result);
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
      <h1>Comment</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Comment"
          onChange={handleInputChange}
          type="text"
          id="comment"
          name="comment"
        />
        <button type="submit">Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
