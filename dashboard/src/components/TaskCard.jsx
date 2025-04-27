import React from 'react';

function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div style={styles.task}>
      {task.text}
      {task.status === 'todo' && (
        <>
          <button onClick={() => onStatusChange(task.id, 'pending')}>Pending</button>
          <button onClick={() => onStatusChange(task.id, 'done')}>Done</button>
        </>
      )}
      {task.status === 'pending' && (
        <>
          <button onClick={() => onStatusChange(task.id, 'done')}>Done</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
      {task.status === 'done' && (
        <button onClick={() => onDelete(task.id)}>Delete</button>
      )}
    </div>
  );
}

const styles = {
  task: {
    backgroundColor: '#f7f7f7',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default TaskCard;
