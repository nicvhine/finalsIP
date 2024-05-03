import React, { useState } from "react";

const List = ({ tasks, taskToUpdate, onEditTask, onSaveEdit, onCancelEdit, onDeleteTask }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const tasksPerPage = 5;

  const handleSaveEdit = () => { 
    if (!taskToUpdate.title.trim() || !taskToUpdate.description.trim()) { //check to see if fields are empty
      setErrorMessage("Title and description cannot be empty."); 
      return;
    }

    setErrorMessage(""); //removes the error  message 
    onSaveEdit(taskToUpdate);
  };

  const handleSortByTitle = () => {
    setSortBy("title");
    setSortDirection(prevDirection => (prevDirection === "asc" ? "desc" : "asc")); //toggle sort direction between asc and desc
  };

  const handleFilterByStatus = (status) => {
    setSelectedStatus(status); //update selectedStatus with target status to filter by
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage; 

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === "" || task.status === selectedStatus)
  ); //search

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy].toLowerCase();
    const bValue = b[sortBy].toLowerCase();
    return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  }); //sort

  const tasksToShow = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  //pagination

  return (
    <div className="px-4 lg:px-8 mt-10"> 
      <div className="mx-auto rounded-xl text-center flex flex-col p-4 lg:p-8 my-4 bg-gray-100"> 
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border mb-4 px-4 py-2 w-full"
        />
        <div className="flex flex-col lg:flex-row justify-center mb-4 space-y-2 lg:space-y-0 lg:space-x-2"> 
          <button className="bg-gray-300 px-3 py-1 rounded-lg w-full lg:w-auto hover:bg-[#9ba2af]" onClick={handleSortByTitle}> 
            Sort by Title
          </button>
          <select className="bg-gray-300 px-3 py-1 rounded-lg w-full lg:w-auto" onChange={(e) => handleFilterByStatus(e.target.value)}>
            <option value="">Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full">
            <thead className="border-b border-gray">
              <tr className="mb-4">
                <th className="w-1/6">Task ID</th>
                <th className="w-1/6">Title</th>
                <th className="w-1/6">Description</th>
                <th className="w-1/6">Status</th>
                <th className="w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasksToShow.map(task => (
                <tr key={task.id} className="border-b border-gray">
                  <td className="w-1/6">{task.id}</td>
                  <td className="w-1/6">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <input 
                        type="text" 
                        value={taskToUpdate.title} 
                        onChange={e => onEditTask(task.id, e.target.value, taskToUpdate.description, taskToUpdate.status)} 
                        className="bg-gray-100 text-center py-2 w-full lg:w-auto"  
                      /> 
                    ) : ( 
                      task.title
                    )}
                  </td>
                  <td className="w-1/6 whitespace-normal break-words text-justify">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <textarea
                        value={taskToUpdate.description}
                        onChange={e => onEditTask(task.id, taskToUpdate.title, e.target.value, taskToUpdate.status)}
                        className="bg-gray-100 text-justify py-2 w-full lg:w-auto"
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td className="w-1/6 text-[#fffafa]">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <select
                        value={taskToUpdate.status}
                        onChange={e => onEditTask(task.id, taskToUpdate.title, taskToUpdate.description, e.target.value)}
                        className="bg-gray-100 text-slate-800 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#9d9d9e] w-full lg:w-auto"  
                      >//Select Status: Pending, In Progress, or Completed
                        <option value="Pending" class = "pending">Pending</option>
                        <option value="In Progress" class="in-progress" >In Progress</option>
                        <option value="Completed" class="completed" >Completed</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-2xl inline-block mb-2 lg:mb-0 ${task.status === 'Pending' ? 'bg-[#ffe079]' : task.status === 'In Progress' ? 'bg-[#4675bd]' : 'bg-[#4cad61]'}`}>
                        {task.status}
                      </span> 
                    //Status Updated
                    )}  
                  </td>
                  <td className="w-1/6">
                    {taskToUpdate && taskToUpdate.id === task.id ? (
                      <>
                        <button className="bg-slate-600 w-full lg:w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#374357]" onClick={handleSaveEdit}>Save</button>
                        <button className="bg-[#5a5c5f] w-full lg:w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#4c5057]" onClick={onCancelEdit}>Cancel</button>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                      </>
                    ) : (
                      <>
                        <button className="bg-slate-600 w-full lg:w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#374357]" onClick={() => onEditTask(task.id, task.title, task.description, task.status)}>Edit</button>
                        <button className="bg-[#FF4D4D] w-full lg:w-32 rounded-md font-medium my-2 mx-2 py-2 text-white hover:bg-[#b93737d5]" onClick={() => onDeleteTask(task.id)}>Delete</button>  
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={prevPage} disabled={currentPage === 1} className="mr-2 bg-gray-300 px-3 py-1 rounded-lg w-full lg:w-auto hover:bg-[#9ba2af] ">Previous</button>
          <button onClick={nextPage} disabled={indexOfLastTask >= filteredTasks.length} className="bg-gray-300 px-3 py-1 rounded-lg w-full lg:w-auto hover:bg-[#9ba2af]">Next</button>
        </div>
      </div>
  </div>
  );
  
};

export default List;
