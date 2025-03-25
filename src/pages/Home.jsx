import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);

  //Taskadd
  const addTaskList = async () => {
    try {
      const res = await axios.post(
        "https://algo-root-backend.onrender.com/api/v1/tasks/add-task",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTasks([...tasks, res.data.task]);
        setTitle("");
        setDesc("");
      } else {
        toast.error(res.data.message || "Failed to add task");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  //Getall Task
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "https://algo-root-backend.onrender.com/api/v1/tasks/getall-task"
        );
        if (res.data.success) {
          setTasks(res.data.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  //delete Task
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(
        `https://algo-root-backend.onrender.com/api/v1/tasks/task-delete/${id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };
  //  Task Complete
  const handleComplete = async (id, isCompleted) => {
    try {
      const res = await axios.put(
        `https://algo-root-backend.onrender.com/api/v1/tasks/update-task/${id}`,
        { isCompleted: !isCompleted }
      );
      if (res.data.success) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, isCompleted: !isCompleted } : task
          )
        );
        if (isCompleted == false) {
          toast.success("Task completed successfully");
        } else {
          toast.success("Task incomplete ");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Create a Todo
        </h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a Title"
          className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4"
        />
        <Textarea
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4"
          placeholder="Write a Description"
        />
        <Button
          onClick={addTaskList}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Todo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white flex flex-col md:flex-row justify-between items-center shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
          >
            <div className="flex-1 p-4">
              <h1
                className={`text-lg font-bold ${
                  task.isCompleted ? "text-gray-400 line-through" : "text-black"
                }`}
              >
                {task.title}
              </h1>
              <p className="text-gray-600 m-2 text-2xl">{task.description}</p>
            </div>
            <div className="flex gap-5 p-4">
              <input
                type="checkbox"
                className="w-6"
                checked={task.isCompleted}
                onChange={() => handleComplete(task._id, task.isCompleted)}
              />
              <Button>
                <Link to={`/Edit-Task/${task._id}`}>Edit</Link>
              </Button>
              <Button onClick={() => deleteTask(task._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
