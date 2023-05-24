import usePostDetails from '../hooks/usePostDetails';
import { updatePost } from '../states/postsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoding,
    error,
    record,
    titleValue,
    descValue,
    setTitleValue,
    setdescValue,
  } = usePostDetails();

  const handleSubmit = () => {
    dispatch(
      updatePost({ id: record.id, title: titleValue, description: descValue })
    )
      .unwrap()
      .then(() => navigate('/'));
  };
  return (
    <div>
      {isLoding && (
        <>
          <p>Loding....</p>
        </>
      )}
      {!isLoding && record && (
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
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Descripton
            </label>
            <textarea
              required
              className="form-control"
              id="exampleFormControlTextarea1"
              value={descValue}
              onChange={(e) => setdescValue(e.target.value)}
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
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default EditPost;
