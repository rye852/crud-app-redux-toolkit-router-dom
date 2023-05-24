import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { deletePost } from '../states/postsSlice';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { setIsLoding } from '../states/postsSlice';

const PostTr = ({ record, ind }) => {
  const dispatch = useDispatch();
  const deleteEvente = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );
  const deleteHandler = (post) => {
    if (window.confirm(`sure You want delete ${post.title}`)) {
      deleteEvente(post.id);
    }
  };
  return (
    <tr>
      <th>{ind + 1}</th>
      <th>
        {' '}
        <Link
          style={{
            display: 'block',
            fontSize: 'inherit',
            width: '100%',
            color: 'inherit',
          }}
          to={`post/${record.id}`}>
          {record.title}{' '}
        </Link>
      </th>

      <th>
        <ButtonGroup aria-label="badic exemple">
          <Button variant="success">
            <Link
              onClick={() => {
                console.log('clicked')
                setIsLoding();
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
              to={`post/${record.id}/edit`}>
              Edit
            </Link>
          </Button>
          <Button onClick={() => deleteHandler(record)} variant="danger">
            Delete
          </Button>
        </ButtonGroup>
      </th>
    </tr>
  );
};

export default PostTr;
