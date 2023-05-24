import { useEffect } from 'react';
import { getPostDetails } from '../states/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const usePostDetails = () => {
  const { id } = useParams();
  const { isLoding, error, record } = useSelector((stor) => stor.posts);
  const [titleValue, setTitleValue] = useState('');
  const [descValue, setdescValue] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostDetails(id))
      .unwrap()
      .then((data) => {
        setTitleValue(data.title);
        setdescValue(data.description);
      });
  }, [dispatch, id]);
  return {
    isLoding,
    error,
    record,
    titleValue,
    descValue,
    setTitleValue,
    setdescValue,
  };
};

export default usePostDetails;
