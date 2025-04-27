import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskForm({ onTaskCreated, editingTask, onTaskUpdated }) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "To Do",
        remarks: "",
        createdByName: "Vaishali",
        createdById: "123",
        lastUpdatedByName: "Vaishali",
        lastUpdatedById: "123",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingTask) {
            setTask(editingTask);
            setErrors({});
        } else {
            setTask({
                title: "",
                description: "",
                dueDate: "",
                status: "To Do",
                remarks: "",
                createdByName: "Vaishali",
                createdById: "123",
                lastUpdatedByName: "Vaishali",
                lastUpdatedById: "123",
            });
            setErrors({});
        }
    }, [editingTask]);

    const validate = () => {
        let tempErrors = {};
        if (!task.title.trim()) tempErrors.title = "Title is required.";
        if (!task.description.trim()) tempErrors.description = "Description is required.";
        else if (task.description.trim().length < 5)
            tempErrors.description = "Description must be at least 5 characters.";
        if (!task.dueDate) tempErrors.dueDate = "Due Date is required.";
        if (!task.status.trim()) tempErrors.status = "Status is required.";
        if (!task.remarks.trim()) tempErrors.remarks = "Remarks are required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const now = new Date().toISOString();
        const newTask = {
            ...task,
            lastUpdatedOn: now,
        };

        try {
            if (editingTask) {
                await axios.put(`http://localhost:5236/api/tasks/${editingTask.id}`, newTask);
                onTaskUpdated();
            } else {
                newTask.createdOn = now;
                await axios.post("http://localhost:5236/api/tasks", newTask);
                onTaskCreated();
            }

            setTask({
                title: "",
                description: "",
                dueDate: "",
                status: "To Do",
                remarks: "",
                createdByName: "Vaishali",
                createdById: "123",
                lastUpdatedByName: "Vaishali",
                lastUpdatedById: "123",
            });
            setErrors({});
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto mb-8"
            >
                <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center tracking-wide">
                    {editingTask ? "Update Task" : "Create New Task"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">
                            Title <span className="text-red-600">*</span>
                        </label>
                        <input
                            className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${errors.title
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-blue-600"
                                }`}
                            placeholder="Enter title"
                            value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                        />
                        {/* Error message for title */}
                        {errors.title && (
                            <span className="text-red-600 text-sm mt-1">{errors.title}</span>
                        )}
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">
                            Due Date <span className="text-red-600">*</span>
                        </label>
                        <input
                            className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${errors.dueDate
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-indigo-500"
                                }`}
                            type="date"
                            value={task.dueDate}
                            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}

                        />
                        {/* Error message for dueDate */}
                        {errors.dueDate && (
                            <span className="text-red-600 text-sm mt-1">{errors.dueDate}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 font-semibold text-gray-700">
                            Description <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            className={`border rounded-lg px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 transition ${errors.description
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-indigo-500"
                                }`}
                            placeholder="Description"
                            value={task.description}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}

                        ></textarea>
                        {/* Error message for description */}
                        {errors.description && (
                            <span className="text-red-600 text-sm mt-1">{errors.description}</span>
                        )}
                    </div>

                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">
                            Status <span className="text-red-600">*</span>
                        </label>
                        <select
                            className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${errors.status
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-indigo-500"
                                }`}
                            value={task.status}
                            onChange={(e) => setTask({ ...task, status: e.target.value })}

                        >
                            <option value="">Select status</option>
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        {/* Error message for status */}
                        {errors.status && (
                            <span className="text-red-600 text-sm mt-1">{errors.status}</span>
                        )}
                    </div>

                    {/* Remarks */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">
                            Remarks <span className="text-red-600">*</span>
                        </label>
                        <input
                            className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition ${errors.remarks
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-indigo-500"
                                }`}
                            placeholder="Remarks"
                            value={task.remarks}
                            onChange={(e) => setTask({ ...task, remarks: e.target.value })}

                        />
                        {/* Error message for remarks */}
                        {errors.remarks && (
                            <span className="text-red-600 text-sm mt-1">{errors.remarks}</span>
                        )}
                    </div>
                </div>

                <button
                    className="mt-8 w-full bg-blue-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
                    type="submit"
                >
                    {editingTask ? "Update Task" : "Create Task"}
                </button>
            </form>
        </div>
    );
}
