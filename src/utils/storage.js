const read = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

export const loadTasks = () => {
  const tasks = read('daybloom.tasks', [])
  return Array.isArray(tasks) ? tasks.filter((task) => task && task.id && task.title) : []
}
export const loadNotes = () => {
  const notes = read('daybloom.notes', [])
  return Array.isArray(notes) ? notes.filter((note) => note && note.id) : []
}
export const saveTasks = (tasks) => localStorage.setItem('daybloom.tasks', JSON.stringify(tasks))
export const saveNotes = (notes) => localStorage.setItem('daybloom.notes', JSON.stringify(notes))
export const dateKey = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export const todayKey = () => dateKey(new Date())
export const dayTasks = (tasks, day) => tasks.filter((task) => task.date === day).sort((a, b) => (a.time || '').localeCompare(b.time || ''))
