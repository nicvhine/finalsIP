import React, { useState } from "react";

const List = ({ tasks, taskToUpdate, onEditTask, onSaveEdit, onCancelEdit, onDeleteTask }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Change this value to adjust the number of tasks per page

  const handleSaveEdit = () => {
    if (!taskToUpdate.title.trim() || !taskToUpdate.description.trim()) {
      setErrorMessage("Title and description cannot be empty.");
      return;
    }

    setErrorMessage("");
    onSaveEdit(taskToUpdate);
  };

  // Logic to calculate the index of the first and last task on the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Logic to handle pagination navigation
  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="w-full px-16 mt-10">
      <div className="mx-auto rounded-xl text-center flex flex-col p-8 my-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="w-1/3">Title</th>
                <th className="w-1/3">Description</th>
                <th className="w-1/3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map(task => (
                <tr key={task.id}>
                  <td className="w-1/3">{task.title}</td>
                  <td className="w-1/3 whitespace-normal break-words">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <textarea
                        value={taskToUpdate.description}
                        onChange={e =>
                          onEditTask(task.id, taskToUpdate.title, e.target.value)
                        }
                        className="w-full"
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td className="w-1/3">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <>
                        <button className="bg-slate-600 w-32 rounded-md font-medium my-2 mx-2 py-3 text-white hover:bg-[#374357]" onClick={handleSaveEdit}>Save</button>
                        <button className="bg-slate-600 w-32 rounded-md font-medium my-2 mx-2 py-3 text-white hover:bg-[#374357]" onClick={onCancelEdit}>Cancel</button>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                      </>
                    ) : (
                      <>
                        <button className="bg-slate-600 w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#374357]"   onClick={() => onEditTask(task.id, task.title, task.description)}>Edit</button>
                        <button className="bg-[#FF4D4D] w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#b93737d5]" onClick={() => onDeleteTask(task.id)}>Delete</button>  
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 bg-gray-300 px-3 py-1 rounded-lg">Previous</button>
          <button onClick={nextPage} disabled={indexOfLastTask >= tasks.length} className="bg-gray-300 px-3 py-1 rounded-lg">Next</button>
        </div>
      </div>
    </div>
  );
};

export default List;
