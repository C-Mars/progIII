import React from 'react';
import CountdownTimer from './CountdownTimer';

const ApiSection = () => {
  // Calcula la fecha objetivo 
  const targetDate = new Date('2024-12-31T23:59:59');
  targetDate.setDate(targetDate.getDate() + 1);
  targetDate.setHours(targetDate.getHours() + 2);

  return (
    <div id="cuenta">
      
      <CountdownTimer targetDate={targetDate} />
    </div>
  );
};

export default ApiSection;





