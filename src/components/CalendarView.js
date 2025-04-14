// src/components/CalendarView.js
import React from "react";
import { parseDateStr, getCalendarDates } from "../utils/dateUtils";

const CalendarView = ({ tasks }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Return tasks for a specific day.
  function getTasksForDate(date) {
    return tasks.filter((t) => {
      const dl = parseDateStr(t.deadline);
      return (
        dl &&
        dl.getFullYear() === date.getFullYear() &&
        dl.getMonth() === date.getMonth() &&
        dl.getDate() === date.getDate()
      );
    });
  }

  const allDates = getCalendarDates(year, month);
  const weeks = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(allDates.slice(i * 7, i * 7 + 7));
  }

  const dayHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
    verticalAlign: "top",
    height: "100px",
  };

  return (
    <div>
      <h3>Calendar View</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            {dayHeader.map((d) => (
              <th key={d} style={thStyle}>
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const tasksOnDay = getTasksForDate(day);
                return (
                  <td style={tdStyle} key={j}>
                    <div style={{ fontWeight: "bold" }}>{day.getDate()}</div>
                    {tasksOnDay.map((t) => (
                      <div
                        key={t.id}
                        style={{
                          marginLeft: "10px",
                          background: "#f0f0f0",
                          borderRadius: "4px",
                          padding: "2px",
                          marginBottom: "2px",
                        }}
                      >
                        {t.description}
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarView;
