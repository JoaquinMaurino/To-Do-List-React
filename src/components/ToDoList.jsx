import React, { useEffect, useState } from "react";

export const ToDoList = () => {
  //Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  //Estado para almacenar nuevas tareas
  const [newTask, setNewTask] = useState("");

  //Estado para almacenar los indices de las tareas completadas:
  const [completedTasks, setCompletedTasks] = useState([]);

  //Estado para almacenar tareas pendientes
  const [pendingTaskCount, setPendingTaskCount] = useState(0);

  useEffect(() => {
    //Calcula el numero de tareas pendientes cada vez que cambia el estado de las tareas pendientes
    const countPendingTasks = () => {
      const pendingCount = tasks.length - completedTasks.length;
      setPendingTaskCount(pendingCount);
    };
    countPendingTasks();
  }, [tasks, completedTasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  /*   function deleteTask(index) {
    //Funcion que elimina una task de la lista por su index con el metodo filter.
    //El primer parametro no se utiliza, lo denotamos con _
    //El segundo parametro lo llamamos i para poder comparar con el parametro de la funcion index
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  } */

  //Funcion que recibe como parametro el indidce de la task
  //Verifico si la tarea esta incluida en el array completedTasks
  function toggleTaskCompletion(index) {
    //Si ya esta en el array, ya esta marcada como completada y la elimino del array con filter
    if (completedTasks.includes(index)) {
      setCompletedTasks(
        completedTasks.filter((taskIndex) => taskIndex !== index)
      );
    }
    //Si no esta en el array, la agrego con spread
    else {
      setCompletedTasks([...completedTasks, index]);
    }
  }

  return (
    <div className="to-do-list">
      <h1>
        To-Do List
      </h1>
      <h2>{pendingTaskCount} Pending</h2>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      {/*Dentro del map del componente <ol> se añade un onclick handler que llama a la funcion toggleTaskCompletion con el indice de la tarea cuando se hace click en ella.
        Se agrega un estilo condicional para tachar la task si su indice esta incluido en el array completedTasks utilizando textDecoration.*/}
      <ol>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleTaskCompletion(index)}
            style={{
              textDecoration: completedTasks.includes(index)
                ? "line-through"
                : "none",
            }}
          >
            <span>{task}</span>
            {/*             <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button> */}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;
