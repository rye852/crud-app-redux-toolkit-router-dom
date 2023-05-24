import usePostDetails from '../hooks/usePostDetails';
const Detail = () => {
  const { isLoding, error, record } = usePostDetails();
  return (
    <div>
      {isLoding && (
        <>
          <p>Loding....</p>
        </>
      )}
      {record && (
        <>
          <p>Title: {record.title}</p>
          <p>Description:{record.description}</p>
        </>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default Detail;
