import React from 'react';
import TaskCard from './TaskCard';

function TaskColumn({ title, tasks, onStatusChange }) {
  return (
    <div style={styles.column}>
      <h2>{title}</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}

const styles = {
  column: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    width: '30%',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
};

export default TaskColumn;
