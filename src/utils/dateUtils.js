// src/utils/dateUtils.js

// Parse a date string. If not a valid date, return null.
export function parseDateStr(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }
  
  // Return an array of Date objects for each day in the current month.
  export function getDaysInCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }
  
  // Get 42 dates (6 weeks) for a typical calendar view.
  export function getCalendarDates(year, month) {
    const firstOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstOfMonth.getDay();
    const startDate = new Date(year, month, 1 - dayOfWeek);
    const dates = [];
    for (let i = 0; i < 42; i++) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  }
  
  // Check if a given day is between two dates (inclusive).
  export function isDayWithinRange(day, startStr, endStr) {
    const start = parseDateStr(startStr);
    const end = parseDateStr(endStr);
    if (!start || !end) return false;
    return day >= start && day <= end;
  }
  
  // Categorize tasks based on deadline differences.
  export function categorizeTasksByDeadline(tasks) {
    const now = new Date();
    const categories = {
      dueToday: [],
      dueThisWeek: [],
      dueNextWeek: [],
      future: [],
    };
    tasks.forEach((task) => {
      if (!task.deadline) {
        categories.future.push(task);
        return;
      }
      const dl = parseDateStr(task.deadline);
      if (!dl) {
        categories.future.push(task);
        return;
      }
      const diffInDays = Math.floor((dl - now) / (1000 * 60 * 60 * 24));
      if (diffInDays < 1) categories.dueToday.push(task);
      else if (diffInDays < 7) categories.dueThisWeek.push(task);
      else if (diffInDays < 14) categories.dueNextWeek.push(task);
      else categories.future.push(task);
    });
    return categories;
  }
  