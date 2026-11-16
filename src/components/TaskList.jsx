import { Check, Clock3, Pencil, Trash2 } from 'lucide-react'
export default function TaskList({ tasks, onToggle, onEdit, onDelete, empty = 'A little space for what matters next.' }) {
  if (!tasks.length) return <div className="empty-state"><span className="empty-mark">✳</span><strong>Nothing here just yet</strong><p>{empty}</p></div>
  return <div className="task-list">{tasks.map((task) => <article className={`task-row ${task.done ? 'is-done' : ''}`} key={task.id}>
    <button className={`check-button ${task.done ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}>{task.done && <Check size={14}/>}</button>
    <div className="task-copy"><strong>{task.title}</strong><div className="task-meta">{task.time && <span><Clock3 size={12}/>{task.time}</span>}<span className={`priority priority-${(task.priority || 'Medium').toLowerCase()}`}>{task.priority || 'Medium'} priority</span></div></div>
    <div className="task-actions"><button className="icon-button" onClick={() => onEdit(task)} aria-label="Edit task"><Pencil size={15}/></button><button className="icon-button danger-hover" onClick={() => onDelete(task.id)} aria-label="Delete task"><Trash2 size={15}/></button></div>
  </article>)}</div>
}
