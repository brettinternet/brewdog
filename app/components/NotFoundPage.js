import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="404-page">
      <h4>
        404 Page Not Found ¯\_(ツ)_/¯
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </main>
  );
};

export default NotFoundPage;
