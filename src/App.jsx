import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          setTasks(tasks => [...tasks, data[i]]);
          console.log(data[i]);
        }
      });
  }, []);

  useEffect(() => {
    setCount(tasks.length);
  }, [tasks]);

  const addTask = () => {
    if (newTask !== '') {
      let newTaskObj = {
        id: Math.random(),
        title: newTask,
        completed: false,
      };
      setTasks(tasks.concat(newTaskObj));
      setNewTask('');
    }
  };

  const toggleCompletion = (id) => {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.id === id) {
        task.completed = !task.completed;
      }
      newTasks.push(task);
    }
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add Task</button>

      <p>Total tasks: {count}</p>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={task.completed ? { textDecoration: 'line-through' } : {}}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
