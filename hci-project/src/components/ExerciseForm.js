import React, { useState } from 'react';
import '../ExcerciseForm.css'; // Add this to import custom styles

const ExerciseForm = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [completedExercises, setCompletedExercises] = useState([]);
  const [score, setScore] = useState(0); // Keep track of score

  const exerciseOptions = [
    'Push-Up', 'Pull-Up', 'Squat', 'Lunge', 'Deadlift', 'Bench Press', 'Plank', 'Burpee', 'Leg Press', 'Overhead Press'
  ];

  const addExercise = () => {
    if (!selectedExercise || !sets || !reps) {
      alert('Please fill in all fields');
      return;
    }

    const newExercise = {
      name: selectedExercise,
      sets: sets,
      reps: reps,
      completed: false
    };

    setExercises([...exercises, newExercise]);
    setSelectedExercise('');
    setSets('');
    setReps('');
  };

  const handleCheckboxChange = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].completed = !updatedExercises[index].completed;
    setExercises(updatedExercises);
  };

  const handleComplete = () => {
    let newScore = 0;
    exercises.forEach((exercise) => {
      if (exercise.completed) {
        newScore += 10; // Adding 10 points for each completed exercise, can be adjusted
      }
    });
    setScore(newScore);
  };

  return (
    <div className="exercise-form">
      <h2 className="heading">Exercise Tracker</h2>
      
      <div className="form-group">
        <label>Choose Exercise:</label>
        <select 
          className="input-dropdown"
          value={selectedExercise} 
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          <option value="">Select Exercise</option>
          {exerciseOptions.map((exercise, index) => (
            <option key={index} value={exercise}>{exercise}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Sets:</label>
        <input 
          className="input-field"
          type="number" 
          value={sets} 
          onChange={(e) => setSets(e.target.value)} 
          placeholder="Enter number of sets"
        />
      </div>

      <div className="form-group">
        <label>Reps:</label>
        <input 
          className="input-field"
          type="number" 
          value={reps} 
          onChange={(e) => setReps(e.target.value)} 
          placeholder="Enter number of reps"
        />
      </div>
      
      <button className="btn-add" onClick={addExercise}>Add Exercise</button>

      <table className="exercise-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr key={index}>
              <td>{exercise.name}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.reps}</td>
              <td>
                <input 
                  type="checkbox" 
                  checked={exercise.completed}
                  onChange={() => handleCheckboxChange(index)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="score-section">
        <button className="btn-complete" onClick={handleComplete}>
          Mark Complete and Add Score
        </button>
        <p className="score-display">Total Score: {score}</p>
      </div>
    </div>
  );
};

export default ExerciseForm;
