import axios from "axios";
import { SERVER_URL } from "./url";

const editTask = async (editedTask, fetchTasks, setTaskToUpdate, setPopupMessage, setShowPopup) => {
  try {
    if (!editedTask.title.trim() || !editedTask.description.trim()) {
      setPopupMessage("Title and description cannot be empty.");
      setShowPopup(true);
      return;
    }

    await axios.put(`${SERVER_URL}/api/tasks/${editedTask.id}`, {
      title: editedTask.title,
      description: editedTask.description,
      status: editedTask.status
    });
    console.log('Task updated successfully:', editedTask.id);
    fetchTasks();
    setTaskToUpdate(null);
    setPopupMessage("Task updated successfully!");
    setShowPopup(true);
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export default editTask;
