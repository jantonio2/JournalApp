import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div 
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg)'
          // backgroundImage: 'url(https://picsum.photos/200/300?random=1)'
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          Un nuevo día
        </p>
        <p className="journal__entry-content">
          Cillum eu consectetur dolore laboris aliquip et ea veniam ea sunt eu mollit sit.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
