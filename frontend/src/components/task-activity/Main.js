import React, { useState, useEffect } from "react";
import axios from "axios";
import Add from "./Add";
import List from "./List";
import PopupNotification from "./PopupNotification"; 
import "./styles.css";
import { SERVER_URL } from "./url";
import deleteTask from "./Delete";
import editTask from "./Edit";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  //fetch task from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId, setTasks, tasks, setPopupMessage, setShowPopup);
  };

  const handleEditTask = (taskId, title, description, status) => {
    setTaskToUpdate({ id: taskId, title, description, status });
  };

  const handleSaveEdit = async (editedTask) => {
    await editTask(editedTask, fetchTasks, setTaskToUpdate, setPopupMessage, setShowPopup);
  };

  const handleCancelEdit = () => {
    setTaskToUpdate(null);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <div>
      <Add onTaskAdded={fetchTasks} />
      <List tasks={tasks} taskToUpdate={taskToUpdate} onEditTask={handleEditTask} onSaveEdit={handleSaveEdit} onCancelEdit={handleCancelEdit} onDeleteTask={handleDeleteTask} />
      {showPopup && <PopupNotification message={popupMessage} onClose={handlePopupClose} />}
    </div>
  );
};

export default Main;
