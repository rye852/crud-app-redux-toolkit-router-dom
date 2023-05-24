import React from 'react';
import { Table } from 'react-bootstrap';
import PostTr from './PostTr';

const TablOfData = (data) => {
  const { records, isLoding, error } = data;
  if (isLoding) {
    return <p>Loading...</p>;
  } else if (!isLoding && records && records.length > 0) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr key={0}>
            <th>#</th>
            <th style={{ width: '70%' }}>Title</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {records.map((post, index) => (
              <PostTr key={index + 1} record={post} ind={index} />
          ))}
        </tbody>
      </Table>
    );
  } else if (!isLoding && error) {
    return <p style={{ fontSize: '1.35em ' }}>{error}</p>;
  } else if (!isLoding && !error && records.length <= 0) {
    return <p>No Posts To show</p>;
  }
};

export default TablOfData;
