import React, { useState } from 'react';
import EarningHistoryTable from './EarningHistoryTable';
import RankHistoryTable from './RankHistoryTable';

const HistoryTableCard = (props) => {
  const [view, setView] = useState('earning');

  function handleViewChange(e) {
    setView(e.target.id);
  }

  return (
    <>
      {view === 'earning' ? (
        <EarningHistoryTable
          view={view}
          handleViewChange={handleViewChange}
          userData={props.userData}
        />
      ) : (
        <RankHistoryTable
          view={view}
          handleViewChange={handleViewChange}
          userData={props.userData}
        />
      )}
    </>
  );
};

export default HistoryTableCard;
