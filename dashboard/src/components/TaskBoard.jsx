import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import '../signup.css'; // Optional, use if you need styles

function TaskBoard() {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask) {
      addTask(newTask);
      setNewTask('');
    }
  };

  const handleTaskStatusChange = (id, status) => {
    updateTaskStatus(id, status);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  return (
    <div style={styles.todoContainer}> {/* New div container with border */}
      <h1>My Todo App</h1>
      <div style={styles.columns}>
        {/* Todo Column */}
        <div style={styles.column}>
          <h2>Todo</h2>
          {tasks.filter(task => task.status === 'todo').map(task => (
            <div key={task.id} style={styles.task}>
              {task.text}
              <button onClick={() => handleTaskStatusChange(task.id, 'pending')}>Move to Pending</button>
            </div>
          ))}
        </div>

        {/* Pending Column */}
        <div style={styles.column}>
          <h2>Pending</h2>
          {tasks.filter(task => task.status === 'pending').map(task => (
            <div key={task.id} style={styles.task}>
              {task.text}
              <button onClick={() => handleTaskStatusChange(task.id, 'completed')}>Complete</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* Completed Column */}
        <div style={styles.column}>
          <h2>Completed</h2>
          {tasks.filter(task => task.status === 'completed').map(task => (
            <div key={task.id} style={styles.task}>
              {task.text}
              <button onClick={() => handleTaskStatusChange(task.id, 'pending')}>Reopen</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task */}
      <div style={styles.addTaskContainer}>
        <input 
          type="text" 
          placeholder="Enter new task" 
          style={styles.input}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button style={styles.button} onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

const styles = {
  todoContainer: {
    border: '2px solid #ddd', // Added border around the entire todo container
    borderRadius: '10px', // Optional, gives rounded corners to the border
    padding: '20px',
    backgroundColor: '#f9f9f9', // Light background color
    marginTop: '20px', // Adds space from the top
  },
  columns: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '40px',
    gap: '30px', // Added gap between columns
  },
  column: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '30%', // Increased width
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  task: {
    backgroundColor: '#f7f7f7',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  addTaskContainer: {
    marginTop: '30px',
  },
  input: {
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '5px',
    width: '200px', // Adjustable input field width
    border: '1px solid #ddd',
  },
  button: {
    backgroundColor: 'purple',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default TaskBoard;
