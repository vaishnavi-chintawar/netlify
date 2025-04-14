// src/api/fakeApi.js
import { v4 as uuidv4 } from "uuid"; // Install via: npm install uuid

// KEY names used in localStorage
const USERS_KEY = "tasky_users";
const TASKS_KEY = "tasky_tasks";

// Initialize local storage with demo users and tasks if empty.
export function initData() {
  if (!localStorage.getItem(USERS_KEY)) {
    const defaultUsers = [
      { username: "vaishnavi", password: "123" },
      { username: "sagar", password: "123" },
      { username: "Vaishnavi", password: "1234" },
      {
        username: "sagar@gmail.com",
        password: "Sagar",
        name: "sagar",
        phone: "07796898227",
      },
      {
        username: "OM@gmail.com",
        password: "Sagar",
        name: "Om",
        phone: "9765448971",
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(TASKS_KEY)) {
    const defaultTasks = [
      {
        id: "a2aeea20-5398-42cb-8ee1-8831869a6628",
        description: "Home Page",
        deadline: "2025-04-17T19:50",
        responsible_person: "sagar",
        completed: false,
        user: "vaishnavi",
        start_date: new Date().toISOString().substring(0, 10),
      },
      {
        id: "3e797f84-ccf1-4c3f-becc-bc0122e3e27b",
        description: "Sign In",
        deadline: "2025-04-25T20:00",
        responsible_person: "vaibhav",
        completed: false,
        user: "sagar",
        start_date: new Date().toISOString().substring(0, 10),
      },
      // Add more tasks if desired…
    ];
    localStorage.setItem(TASKS_KEY, JSON.stringify(defaultTasks));
  }
}

// Get stored users
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

// Save users array
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Get stored tasks
function getTasks() {
  return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
}

// Save tasks array
function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

// Simulate login: returns a token (here the username) on success.
export function login({ username, password }) {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (user) {
    if (user.password === password) {
      return { token: username };
    } else {
      throw new Error("Incorrect password");
    }
  }
  throw new Error("User not found. Please sign up.");
}

// Simulate signup: returns a token on success.
export function signup({ username, password, name, phone }) {
  const users = getUsers();
  const exists = users.some((u) => u.username === username);
  if (exists) {
    throw new Error("User already exists. Please sign in.");
  }
  const newUser = { username, password, name, phone };
  users.push(newUser);
  saveUsers(users);
  return { token: username };
}

// Simulate fetching tasks.
// If viewAll is true, return all tasks; otherwise, only tasks belonging to the currentUser.
export function fetchTasks({ token, viewAll = false }) {
  const tasks = getTasks();
  if (viewAll) {
    return tasks;
  }
  return tasks.filter((t) => t.user === token);
}

// Simulate adding a task.
export function addTask({ token, taskData }) {
  const tasks = getTasks();
  const newTask = {
    id: uuidv4(),
    description: taskData.description,
    deadline: taskData.deadline,
    start_date: taskData.start_date || new Date().toISOString().substring(0, 10),
    responsible_person: taskData.responsible_person,
    completed: false,
    user: token,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

// Simulate marking a task as complete.
export function completeTask({ token, taskId }) {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((t) => t.id === taskId && t.user === token);
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }
  tasks[taskIndex].completed = true;
  saveTasks(tasks);
  return tasks[taskIndex];
}

// Simulate task deletion.
export function deleteTask({ token, taskId }) {
  let tasks = getTasks();
  const taskIndex = tasks.findIndex((t) => t.id === taskId && t.user === token);
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }
  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  return { detail: "Task deleted" };
}
