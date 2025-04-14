// src/App.js
import React, { useEffect, useState } from "react";
import AuthPage from "./components/AuthPage";
import TaskList from "./components/TaskList";
import TaskDeadline from "./components/TaskDeadline";
import CalendarView from "./components/CalendarView";
import GanttChart from "./components/GanttChart";
import AddTaskModal from "./components/AddTaskModal";
import * as fakeApi from "./api/fakeApi";

// Initialize default demo data.
fakeApi.initData();

const App = () => {
  // Instead of a token, we track the current username.
  const [currentUser, setCurrentUser] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [viewAll, setViewAll] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Function to refresh tasks from local storage (simulating API fetch).
  const refreshTasks = () => {
    try {
      const fetched = fakeApi.fetchTasks({ token: currentUser, viewAll });
      setTasks(fetched);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // --- Authentication Handlers ---
  const handleLoginSuccess = async ({ username, password }) => {
    try {
      const res = fakeApi.login({ username, password });
      setCurrentUser(res.token);
      setAuthMessage("Login Successful!");
    } catch (error) {
      setAuthMessage(error.message);
    }
  };

  const handleSignupSuccess = async ({ username, password, name, phone }) => {
    try {
      const res = fakeApi.signup({ username, password, name, phone });
      setCurrentUser(res.token);
      setAuthMessage("Signup Successful!");
    } catch (error) {
      setAuthMessage(error.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthMessage("You have been logged out.");
  };

  // --- Task Handlers ---
  const handleAddTask = (taskData) => {
    try {
      fakeApi.addTask({ token: currentUser, taskData });
      setShowTaskModal(false);
      refreshTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleCompleteTask = (taskId) => {
    try {
      fakeApi.completeTask({ token: currentUser, taskId });
      refreshTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = (taskId) => {
    try {
      fakeApi.deleteTask({ token: currentUser, taskId });
      refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Refresh tasks when the user changes, viewAll changes, or when currentView is updated.
  useEffect(() => {
    if (currentUser) refreshTasks();
  }, [currentUser, viewAll]);

  const containerStyle = { fontFamily: "'Segoe UI', sans-serif", padding: "20px" };

  const mainContainerStyle = {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const topNavStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const navButtonsStyle = {
    display: "flex",
    gap: "15px",
  };

  const buttonStyle = {
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#5E60CE",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const subNavStyle = {
    display: "flex",
    gap: "20px",
    borderBottom: "1px solid #ccc",
    marginBottom: "20px",
    paddingBottom: "10px",
  };

  const subNavItemStyle = (active) => ({
    cursor: "pointer",
    borderBottom: active ? "3px solid #5E60CE" : "3px solid transparent",
    fontWeight: active ? "bold" : "normal",
    color: active ? "#5E60CE" : "#555",
    padding: "5px 0",
  });

  // If no user is logged in, display the authentication page.
  if (!currentUser) {
    return (
      <div style={containerStyle}>
        {authMessage && <p style={{ color: "green", textAlign: "center" }}>{authMessage}</p>}
        <AuthPage
          onLoginSuccess={handleLoginSuccess}
          onSignupSuccess={handleSignupSuccess}
          setAuthMessage={setAuthMessage}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={mainContainerStyle}>
        <div style={topNavStyle}>
          <h2 style={{ margin: 0 }}>Task Mangement</h2>
          <div style={navButtonsStyle}>
            <button style={buttonStyle} onClick={() => setShowTaskModal(true)}>
              + Add Task
            </button>
            <button
              style={{ ...buttonStyle, backgroundColor: "#EB5757" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div style={subNavStyle}>
          <div style={subNavItemStyle(currentView === "list")} onClick={() => setCurrentView("list")}>
            List
          </div>
          <div
            style={subNavItemStyle(currentView === "deadline")}
            onClick={() => setCurrentView("deadline")}
          >
            Deadline
          </div>
          <div
            style={subNavItemStyle(currentView === "calendar")}
            onClick={() => setCurrentView("calendar")}
          >
            Calendar
          </div>
          <div style={subNavItemStyle(currentView === "gantt")} onClick={() => setCurrentView("gantt")}>
            Gantt
          </div>
        </div>
        {currentView === "list" && (
          <TaskList
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            viewAll={viewAll}
            setViewAll={setViewAll}
          />
        )}
        {currentView === "deadline" && <TaskDeadline tasks={tasks} />}
        {currentView === "calendar" && <CalendarView tasks={tasks} />}
        {currentView === "gantt" && <GanttChart tasks={tasks} />}
      </div>
      {showTaskModal && (
        <AddTaskModal onAddTask={handleAddTask} onCancel={() => setShowTaskModal(false)} />
      )}
    </div>
  );
};

export default App;
