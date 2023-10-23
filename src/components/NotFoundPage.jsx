import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h2>
        It seems you are lost... need some help? Turn back into the Home Page.
      </h2>
      <Link to="/">
        <p className="link-back-list">Back to Home Page </p>
      </Link>
    </>
  );
};

export default NotFoundPage;
