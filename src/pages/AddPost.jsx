import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../states/postsSlice';
import { useNavigate } from 'react-router-dom';
import { setError } from '../states/postsSlice';
const AddPost = () => {
  const navigate = useNavigate();
  let titleRef = useRef(null);
  let descriptionRef = useRef(null);
  const dispatch = useDispatch();
  const { records, isLoding, error } = useSelector((stor) => stor.posts);
  const handleSubmit = () => {
    dispatch(
      addPost({
        id: records.length <= 0 ? 1 : records[records.length - 1].id + 1,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      })
    )
      .unwrap()
      .then(() => {
        titleRef.current.value = null;
        descriptionRef.current.value = null;
        return navigate('/');
      })
      .catch((err) => {
        dispatch(setError(err));
      });
  };
  return (
    <>
      {!error && (
        <>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              required
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Post Title"
              ref={titleRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Descripton
            </label>
            <textarea
              required
              ref={descriptionRef}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"></textarea>
            <button
              onClick={() => handleSubmit()}
              type="button"
              className="btn mt-2 btn-primary"
              disabled={isLoding}>
              {isLoding ? 'submitting...' : 'Submit'}
            </button>
          </div>
        </>
      )}
      {
        error && (
          <>
          <h2>Ooh ther is a error </h2>
          <p>
            {error}
          </p>
          </>
        )
      }
    </>
  );
};

export default AddPost;
