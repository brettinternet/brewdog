import React from 'react';

export default function Modal({ beer, onClick }) {
  return (
    <div className="overlay" onClick={onClick}>
      <div className="modal">
        <h3>
          { beer.name }
        </h3>
      </div>
    </div>
  );
}
