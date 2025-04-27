import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function TaskList({ tasks, onUpdate, onEdit }) {
    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5236/api/tasks/${id}`);
        onUpdate();
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "in progress":
                return "bg-yellow-100 text-yellow-800";
            case "pending":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (
        // <div className="bg-white p-6 rounded-xl shadow-lg max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-600 tracking-wide">
                All Tasks
            </h2>

            {tasks.length === 0 ? (
                <p className="text-center text-gray-400 text-xl italic">No tasks available.</p>
            ) : (
                <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => {
                        const statusStyle = getStatusColor(task.status);
                        return (
                            <div
                                key={task.id}
                                className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 min-h-[380px]"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-lg">
                                            Title
                                        </label>
                                        <p
                                            className="bg-white border border-orange-300 rounded-md px-5 py-4 text-2xl font-bold select-text"
                                            style={{ backgroundColor: "#fff9f0" }}
                                        >
                                            {task.title}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-lg">
                                            Description
                                        </label>
                                        <p
                                            className="bg-white border border-orange-300 rounded-md px-5 py-3 text-lg text-gray-700 select-text leading-relaxed"
                                            style={{ backgroundColor: "#fff9f0" }}
                                        >
                                            {task.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-lg">
                                                Status
                                            </label>
                                            <p
                                                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm border ${statusStyle} select-text shadow-sm`}
                                                style={{ backgroundColor: "#fff9f0" }}
                                            >
                                                {task.status}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-lg">
                                                Due Date
                                            </label>
                                            <p
                                                className="bg-white border border-orange-300 rounded-md px-5 py-2 text-lg select-text"
                                                style={{ backgroundColor: "#fff9f0" }}
                                            >
                                                {new Date(task.dueDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-lg">
                                            Remarks
                                        </label>
                                        <p
                                            className="bg-white border border-orange-300 rounded-md px-5 py-3 text-lg text-gray-700 select-text leading-relaxed"
                                            style={{ backgroundColor: "#fff9f0" }}
                                        >
                                            {task.remarks}
                                        </p>
                                    </div>

                                    <p
                                        className="border border-orange-300 rounded-md px-5 py-3 text-sm text-gray-600 select-text bg-white"
                                        style={{ backgroundColor: "#fff9f0" }}
                                    >
                                        Created by:{" "}
                                        <span className="font-semibold text-indigo-700">{task.createdByName}</span> on{" "}
                                        {new Date(task.createdOn).toLocaleString()}
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="mt-10 flex justify-between">
                                    <button
                                        className="flex items-center gap-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition rounded-md px-5 py-3 font-semibold shadow-md hover:scale-105 transform duration-300"
                                        onClick={() => onEdit(task)}
                                        aria-label="Edit Task"
                                    >
                                        <FiEdit size={22} /> Edit
                                    </button>
                                    <button
                                        className="flex items-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 transition rounded-md px-5 py-3 font-semibold shadow-md hover:scale-105 transform duration-300"
                                        onClick={() => deleteTask(task.id)}
                                        aria-label="Delete Task"
                                    >
                                        <FiTrash2 size={22} /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}