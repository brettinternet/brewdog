import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <section>
        <h1>
          404 Page Not Found
        </h1>
        <p>
          ¯\_(ツ)_/¯
        </p>
        <Link to="/brewdog"> Go back to homepage </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
