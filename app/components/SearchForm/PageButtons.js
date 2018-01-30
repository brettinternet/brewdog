import React from 'react';

export default function PageButtons({ onClickPrevious, onClickNext, currentPage, multiplePagesBool }) {
  return (
    <div className="page-buttons">
      <div className="group-buttons">
        <button className="btn"
          onClick={onClickPrevious}
          disabled={currentPage === 1}
        >
          <i className="fa fa-caret-left"></i> Prevous
        </button>
        <button className="btn"
          onClick={onClickNext}
          disabled={!multiplePagesBool}
        >
          Next <i className="fa fa-caret-right"></i>
        </button>
      </div>
    </div>
  )
}
