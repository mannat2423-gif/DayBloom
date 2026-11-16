import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
export default function FocusPage() {
  const [mode, setMode] = useState('Focus'), [seconds, setSeconds] = useState(25 * 60), [running, setRunning] = useState(false)
  useEffect(() => { if (!running) return undefined; const timer = window.setInterval(() => setSeconds((value) => { if (value <= 1) { setRunning(false); return 0 } return value - 1 }), 1000); return () => window.clearInterval(timer) }, [running])
  const changeMode = (next) => { setMode(next); setRunning(false); setSeconds(next === 'Focus' ? 25 * 60 : 5 * 60) }
  const reset = () => { setRunning(false); setSeconds(mode === 'Focus' ? 25 * 60 : 5 * 60) }
  const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  return <><div className="page-heading"><div><span className="eyebrow">ONE THING, FULLY</span><h1>Find your <em>focus.</em></h1><p className="subtitle">A little space to settle into what you’re doing.</p></div></div><section className="card focus-card"><div className="focus-tabs">{['Focus', 'Short break'].map((option) => <button key={option} className={mode === option ? 'active' : ''} onClick={() => changeMode(option)}>{option}</button>)}</div><div className="timer-face"><span>{mode === 'Focus' ? 'A MOMENT FOR YOU' : 'TAKE A BREATH'}</span><strong>{display}</strong><p>{seconds === 0 ? 'Session complete. Well done.' : running ? 'Stay with this moment.' : 'Whenever you’re ready.'}</p></div><div className="timer-actions"><button className="button button-dark timer-start" onClick={() => seconds ? setRunning(!running) : reset()}>{running ? <Pause size={17}/> : <Play size={17} fill="currentColor"/>}{running ? 'Pause' : 'Start session'}</button><button className="button button-quiet" onClick={reset}><RotateCcw size={15}/> Reset</button></div><p className="focus-hint">25 minutes of focus · 5 minutes of rest</p></section></>
}
