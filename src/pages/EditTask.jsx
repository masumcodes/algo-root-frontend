import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `https://algo-root-backend.onrender.com/api/v1/tasks/taskById/${id}`
        );
        if (res.data.success) {
          setTitle(res.data.task.title);
          setDesc(res.data.task.description);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchTask();
  }, [id]);

  const updateTask = async () => {
    try {
      const res = await axios.put(
        `https://algo-root-backend.onrender.com/api/v1/tasks/update-task/${id}`,
        { title, description }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Failed to update task");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Edit Todo
        </h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Edit Title"
          className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4"
        />
        <Textarea
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 border text-black border-gray-300 rounded-lg mb-4"
          placeholder="Edit Description"
        />
        <Button
          onClick={updateTask}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Update Todo
        </Button>
      </div>
    </div>
  );
}

export default EditTask;
