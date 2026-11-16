import { useState } from 'react'
import { X } from 'lucide-react'

export default function TaskEditor({ task, date, onSave, onClose }) {
  const [form, setForm] = useState({ title: '', date: date || '', time: '', priority: 'Medium', ...task })
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = (event) => { event.preventDefault(); if (form.title.trim()) onSave({ ...form, title: form.title.trim() }) }
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><form className="task-modal" onSubmit={submit}>
    <div className="modal-head"><div><span className="eyebrow">YOUR DAY, YOUR PACE</span><h2>{task ? 'Edit task' : 'A small step forward'}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close"><X size={18}/></button></div>
    <label>Task title<input autoFocus name="title" value={form.title} onChange={update} placeholder="What would you like to do?" required /></label>
    <div className="form-row"><label>Date<input type="date" name="date" value={form.date} onChange={update} required /></label><label>Time<input type="time" name="time" value={form.time || ''} onChange={update} /></label></div>
    <label>Priority<select name="priority" value={form.priority} onChange={update}><option>High</option><option>Medium</option><option>Low</option></select></label>
    <div className="modal-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button className="button button-dark">{task ? 'Save changes' : 'Add to my day'}</button></div>
  </form></div>
}
