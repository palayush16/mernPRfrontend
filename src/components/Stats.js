import React, { useState, useEffect } from 'react';

const Stats = () => {
  const [userCount, setUserCount] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);

  useEffect(() => {
    // Fetch stats
    fetch('https://mern-pr-backend.onrender.com/api/getStats')
      .then(response => response.json())
      .then((data) => {
        setUserCount(data.userCount)
        setWorkoutCount(data.workoutCount)
      })
      
      .catch(error => console.error(error));

    
  }, []);

  return (
    <div className="stats">
        <h3>Website Stats</h3>
      <p>Total Users: {userCount}</p>
      <p>Total Workouts: {workoutCount}</p>
    </div>
  );
};

export default Stats;