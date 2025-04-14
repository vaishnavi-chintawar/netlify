// src/components/GanttChart.js
import React from "react";
import { getDaysInCurrentMonth, isDayWithinRange } from "../utils/dateUtils";

const GanttChart = ({ tasks }) => {
  const daysInMonth = getDaysInCurrentMonth();
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
    textAlign: "center",
  };
  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  };

  return (
    <div>
      <h3>Gantt Chart</h3>
      <p>Days between start date and deadline are highlighted.</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Task</th>
            {daysInMonth.map((day) => (
              <th key={day.toISOString()} style={thStyle}>
                {day.getDate()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td style={tdStyle}>{t.description}</td>
              {daysInMonth.map((day) => {
                const highlight = isDayWithinRange(day, t.start_date, t.deadline);
                return (
                  <td
                    key={day.toISOString()}
                    style={{
                      ...tdStyle,
                      backgroundColor: highlight ? "#5E60CE" : "transparent",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GanttChart;
