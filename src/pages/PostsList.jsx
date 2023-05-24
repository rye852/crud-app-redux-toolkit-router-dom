import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import TbaleOfData from '../components/TablOfData';
import { getPosts } from '../states/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const forUseEffect = () => {
      dispatch(getPosts());
    };
    forUseEffect();
  }, [dispatch]);

  const { records, isLoding, error } = useSelector((stor) => stor.posts);

  return <TbaleOfData records={records} isLoding={isLoding} error={error} />;
};

export default PostsList;
