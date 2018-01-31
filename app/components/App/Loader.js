import React from 'react';

export default function Loader() {
  return (
    <div className="wrapper loader">
      <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
