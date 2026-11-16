import { useEffect, useState } from 'react'
import { CalendarDays, CheckSquare, Clock3, Flower2, LayoutDashboard, Menu, NotebookPen, PanelsTopLeft, Timer, TrendingUp, X } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import TasksPage from './pages/Tasks'
import SchedulePage from './pages/Schedule'
import { WeekPlanner, CalendarPage } from './pages/Planner'
import NotesPage from './pages/Notes'
import FocusPage from './pages/Focus'
import ProgressPage from './pages/Progress'
import TaskEditor from './components/TaskEditor'
import { loadNotes, loadTasks, saveNotes, saveTasks } from './utils/storage'
import './App.css'

const navigation = [
  { label: 'Overview', items: [{ id: 'home', name: 'Dashboard', icon: LayoutDashboard }] },
  { label: 'PLAN YOUR DAY', items: [{ id: 'tasks', name: 'Tasks', icon: CheckSquare }, { id: 'schedule', name: 'Daily schedule', icon: Clock3 }, { id: 'week', name: 'Weekly planner', icon: PanelsTopLeft }, { id: 'calendar', name: 'Calendar', icon: CalendarDays }] },
  { label: 'MAKE SPACE', items: [{ id: 'notes', name: 'Notes', icon: NotebookPen }, { id: 'focus', name: 'Focus timer', icon: Timer }, { id: 'progress', name: 'Progress', icon: TrendingUp }] },
]
const pageNames = { home: 'Dashboard', tasks: 'Tasks', schedule: 'Daily schedule', week: 'Weekly planner', calendar: 'Calendar', notes: 'Notes', focus: 'Focus timer', progress: 'Progress' }
function App() {
  const [tasks, setTasks] = useState(loadTasks), [notes, setNotes] = useState(loadNotes), [page, setPage] = useState('home'), [editor, setEditor] = useState(null), [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => saveTasks(tasks), [tasks])
  useEffect(() => saveNotes(notes), [notes])
  const addTask = (date) => setEditor({ date })
  const saveTask = (task) => { if (task.id) setTasks(tasks.map((item) => item.id === task.id ? task : item)); else setTasks([{ ...task, id: crypto.randomUUID(), done: false }, ...tasks]); setEditor(null) }
  const toggleTask = (id) => setTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task))
  const navigate = (next) => { setPage(next); setMobileOpen(false) }
  const common = { tasks, onAdd: addTask, onToggle: toggleTask, onEdit: setEditor, onDelete: (id) => setTasks(tasks.filter((task) => task.id !== id)) }
  const pageContent = () => {
    switch (page) {
      case 'tasks': return <TasksPage {...common}/>
      case 'schedule': return <SchedulePage {...common}/>
      case 'week': return <WeekPlanner {...common}/>
      case 'calendar': return <CalendarPage {...common}/>
      case 'notes': return <NotesPage notes={notes} setNotes={setNotes}/>
      case 'focus': return <FocusPage/>
      case 'progress': return <ProgressPage tasks={tasks}/>
      default: return <Dashboard {...common} navigate={navigate}/>
    }
  }
  return <div className="app-shell">
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation"/>}
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}><div className="brand"><span className="brand-mark"><Flower2 size={20}/></span><span>daybloom<small>MAKE SPACE FOR YOUR DAY</small></span><button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X/></button></div><nav>{navigation.map((group) => <div className="nav-group" key={group.label}><span className="nav-label">{group.label}</span>{group.items.map(({ id, name, icon: Icon }) => <button key={id} onClick={() => navigate(id)} className={`nav-item ${page === id ? 'active' : ''}`}><Icon size={17}/>{name}{page === id && <i/>}</button>)}</div>)}</nav><div className="sidebar-bottom"><div className="sidebar-note"><span className="note-spark">✳</span><p>Take it one day<br/>at a time.</p><small>YOU’RE DOING JUST FINE</small></div><div className="profile"><span className="avatar">D</span><span><strong>Your space</strong><small>Personal planner</small></span><span className="profile-dot"/></div></div></aside>
    <main className="main-area"><header className="topbar"><button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu/></button><div className="breadcrumb"><span>Daybloom</span><span className="crumb-slash">/</span><strong>{pageNames[page]}</strong></div><div className="topbar-right"><span className="today-label"><i/>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span><span className="topbar-flower"><Flower2 size={17}/></span></div></header><div className="page-wrap">{pageContent()}<footer className="app-footer"><span>Made for a more considered day.</span><span>DAYBLOOM <i>✳</i></span></footer></div></main>
    {editor && <TaskEditor key={editor.id || editor.date} task={editor.id ? editor : null} date={editor.date} onSave={saveTask} onClose={() => setEditor(null)}/>}</div>
}
export default App
