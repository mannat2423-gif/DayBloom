import { Plus } from 'lucide-react'
import TaskList from '../components/TaskList'
import { dayTasks, todayKey } from '../utils/storage'
export default function SchedulePage({ tasks, onAdd, onToggle, onEdit, onDelete }) {
  const today = todayKey(), list = dayTasks(tasks, today)
  return <><div className="page-heading"><div><span className="eyebrow">TIME, WITH ROOM TO BREATHE</span><h1>Your day in <em>its own time.</em></h1><p className="subtitle">A simple view of what’s on your schedule.</p></div><button className="button button-dark" onClick={() => onAdd(today)}><Plus size={16}/> Schedule a task</button></div><div className="card schedule-card"><div className="schedule-date"><span>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span><strong>{new Date().getDate()}</strong><span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span></div><div className="schedule-content"><span className="eyebrow">IN CHRONOLOGICAL ORDER</span><h2>Today’s schedule</h2><TaskList tasks={list} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} empty="Your schedule is open. Add a task to make a little plan."/></div></div></>
}
