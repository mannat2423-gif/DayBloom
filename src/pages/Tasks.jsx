import { useState } from 'react'
import { Plus } from 'lucide-react'
import TaskList from '../components/TaskList'
import { dayTasks, todayKey } from '../utils/storage'
export default function TasksPage({ tasks, onAdd, onToggle, onEdit, onDelete }) {
  const [filter, setFilter] = useState('All'), [date, setDate] = useState(todayKey())
  const filtered = dayTasks(tasks.filter((task) => task.date === date && (filter === 'All' || (filter === 'Completed' ? task.done : !task.done))), date)
  return <><div className="page-heading"><div><span className="eyebrow">MAKE IT MANAGEABLE</span><h1>One thing <em>at a time.</em></h1><p className="subtitle">Your tasks, gathered in one calm place.</p></div><button className="button button-dark" onClick={() => onAdd(date)}><Plus size={16}/> New task</button></div><section className="card task-page-card"><div className="task-toolbar"><label className="date-select">Choose a day<input type="date" value={date} onChange={(e) => setDate(e.target.value)}/></label><div className="filter-tabs">{['All', 'Pending', 'Completed'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="section-title"><h2>{new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}<span className="count-pill">{filtered.length}</span></h2></div><TaskList tasks={filtered} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} empty="Your list is clear. Add a task when you’re ready."/></section></>
}
