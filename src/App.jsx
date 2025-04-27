import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/Taskform";
import TaskList from "./components/Tasklist";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5236/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
    setEditingTask(null);
  };
  // Filter tasks based on searchQuery
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Task Management App
      </h1>
      {/* Search bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          className="w-full p-4 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder:text-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TaskForm
        onTaskCreated={fetchTasks}
        editingTask={editingTask}
        onTaskUpdated={handleTaskUpdated}
      />
      <TaskList tasks={filteredTasks} onUpdate={fetchTasks} onEdit={handleEdit} />
    </div >
  );
}

export default App;
