// src/App.js
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import TaskList from "./components/TaskList";
import TaskDeadline from "./components/TaskDeadline";
import CalendarView from "./components/CalendarView";
import GanttChart from "./components/GanttChart";
import AddTaskModal from "./components/AddTaskModal";
import * as fakeApi from "./api/fakeApi";

fakeApi.initData();

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authMessage, setAuthMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [viewAll, setViewAll] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Wrap refreshTasks with useCallback so its reference is stable
  const refreshTasks = useCallback(() => {
    try {
      const fetched = fakeApi.fetchTasks({ token: currentUser, viewAll });
      setTasks(fetched);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [currentUser, viewAll]);

  // Update useEffect to include refreshTasks in dependencies
  useEffect(() => {
    if (currentUser) refreshTasks();
  }, [currentUser, refreshTasks]);

  const handleLoginSuccess = ({ username, password }) => {
    try {
      const res = fakeApi.login({ username, password });
      setCurrentUser(res.token);
      setAuthMessage("Login Successful!");
    } catch (error) {
      setAuthMessage(error.message);
    }
  };

  const handleSignupSuccess = ({ username, password, name, phone }) => {
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

  return (
    <div className="app-container">
      {currentUser ? (
        <div className="container">
          <div className="top-nav">
            <h2>Task Mangement</h2>
            <div className="nav-buttons">
              <button className="button button-primary" onClick={() => setShowTaskModal(true)}>
                + Add Task
              </button>
              <button className="button button-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="sub-nav">
            <div
              className={`sub-nav-item ${currentView === "list" ? "active" : ""}`}
              onClick={() => setCurrentView("list")}
            >
              List
            </div>
            <div
              className={`sub-nav-item ${currentView === "deadline" ? "active" : ""}`}
              onClick={() => setCurrentView("deadline")}
            >
              Deadline
            </div>
            <div
              className={`sub-nav-item ${currentView === "calendar" ? "active" : ""}`}
              onClick={() => setCurrentView("calendar")}
            >
              Calendar
            </div>
            <div
              className={`sub-nav-item ${currentView === "gantt" ? "active" : ""}`}
              onClick={() => setCurrentView("gantt")}
            >
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
      ) : (
        <div style={{ padding: "20px" }}>
          {authMessage && (
            <p style={{ color: "green", textAlign: "center", marginBottom: "20px" }}>
              {authMessage}
            </p>
          )}
          <AuthPage onLoginSuccess={handleLoginSuccess} onSignupSuccess={handleSignupSuccess} />
        </div>
      )}
      {showTaskModal && <AddTaskModal onAddTask={handleAddTask} onCancel={() => setShowTaskModal(false)} />}
    </div>
  );
};

export default App;
