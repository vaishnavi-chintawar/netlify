// src/components/AddTaskModal.js
import React, { useState } from "react";

const AddTaskModal = ({ onAddTask, onCancel }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskResponsible, setNewTaskResponsible] = useState("");
  const [newTaskStartDate, setNewTaskStartDate] = useState("");

  const inputStyle = {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
    width: "100%",
  };
  const buttonStyle = {
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#5E60CE",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: "10px",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      description: newTaskName,
      deadline: newTaskDeadline,
      responsible_person: newTaskResponsible,
      start_date: newTaskStartDate,
    });
    // Reset fields after adding
    setNewTaskName("");
    setNewTaskDeadline("");
    setNewTaskResponsible("");
    setNewTaskStartDate("");
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task description"
            style={inputStyle}
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            style={inputStyle}
            value={newTaskDeadline}
            onChange={(e) => setNewTaskDeadline(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Responsible person (e.g. John Doe)"
            style={inputStyle}
            value={newTaskResponsible}
            onChange={(e) => setNewTaskResponsible(e.target.value)}
          />
          <input
            type="date"
            style={inputStyle}
            value={newTaskStartDate}
            onChange={(e) => setNewTaskStartDate(e.target.value)}
          />
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <button type="submit" style={buttonStyle}>
              Add Task
            </button>
            <button type="button" style={{ ...buttonStyle, backgroundColor: "#EB5757" }} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
