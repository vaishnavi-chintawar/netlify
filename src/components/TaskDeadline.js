// src/components/TaskDeadline.js
import React from "react";
import { categorizeTasksByDeadline } from "../utils/dateUtils";

const TaskDeadline = ({ tasks }) => {
  const { dueToday, dueThisWeek, dueNextWeek, future } = categorizeTasksByDeadline(tasks);

  const sectionStyle = { flex: 1, minWidth: "200px" };

  return (
    <div>
      <h3>Deadline Overview</h3>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        <div style={sectionStyle}>
          <h4>Due Today</h4>
          {dueToday.length === 0 && <p>No tasks due today.</p>}
          {dueToday.map((t) => (
            <div key={t.id} style={{ marginBottom: "10px" }}>
              <strong>{t.description}</strong>
              <div>Start: {t.start_date || "Today"}</div>
              <div>
                Deadline: {t.deadline ? new Date(t.deadline).toLocaleString() : "—"}
              </div>
            </div>
          ))}
        </div>
        <div style={sectionStyle}>
          <h4>Due This Week</h4>
          {dueThisWeek.length === 0 && <p>No tasks due this week.</p>}
          {dueThisWeek.map((t) => (
            <div key={t.id} style={{ marginBottom: "10px" }}>
              <strong>{t.description}</strong>
              <div>Start: {t.start_date || "Today"}</div>
              <div>
                Deadline: {t.deadline ? new Date(t.deadline).toLocaleString() : "—"}
              </div>
            </div>
          ))}
        </div>
        <div style={sectionStyle}>
          <h4>Due Next Week</h4>
          {dueNextWeek.length === 0 && <p>No tasks due next week.</p>}
          {dueNextWeek.map((t) => (
            <div key={t.id} style={{ marginBottom: "10px" }}>
              <strong>{t.description}</strong>
              <div>Start: {t.start_date || "Today"}</div>
              <div>
                Deadline: {t.deadline ? new Date(t.deadline).toLocaleString() : "—"}
              </div>
            </div>
          ))}
        </div>
        <div style={sectionStyle}>
          <h4>Future Tasks</h4>
          {future.length === 0 && <p>No future tasks.</p>}
          {future.map((t) => (
            <div key={t.id} style={{ marginBottom: "10px" }}>
              <strong>{t.description}</strong>
              <div>Start: {t.start_date || "Today"}</div>
              <div>
                Deadline: {t.deadline ? new Date(t.deadline).toLocaleString() : "—"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDeadline;
