// src/components/TaskList.js
import React from "react";

const TaskList = ({ tasks, onCompleteTask, onDeleteTask, viewAll, setViewAll }) => {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };
  const thStyle = {
    backgroundColor: "#5E60CE",
    color: "#fff",
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  };
  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
  };
  const buttonStyle = {
    padding: "8px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={viewAll}
            onChange={(e) => setViewAll(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          View All Tasks
        </label>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Task</th>
            <th style={thStyle}>Completed?</th>
            <th style={thStyle}>Start Date</th>
            <th style={thStyle}>Deadline</th>
            <th style={thStyle}>Responsible</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td style={tdStyle}>{t.description}</td>
              <td style={tdStyle}>{t.completed ? "Yes" : "No"}</td>
              <td style={tdStyle}>{t.start_date || "—"}</td>
              <td style={tdStyle}>
                {t.deadline ? new Date(t.deadline).toLocaleString() : "—"}
              </td>
              <td style={tdStyle}>{t.responsible_person || "—"}</td>
              <td style={tdStyle}>
                {!t.completed && (
                  <button
                    style={{ ...buttonStyle, backgroundColor: "#5E60CE", marginRight: "5px" }}
                    onClick={() => onCompleteTask(t.id)}
                  >
                    Complete
                  </button>
                )}
                <button
                  style={{ ...buttonStyle, backgroundColor: "#EB5757" }}
                  onClick={() => onDeleteTask(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
