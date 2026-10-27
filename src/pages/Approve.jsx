import { useState } from 'react'
import { CHANGE, TRACE, FINDINGS, blockers } from '../data.js'

export default function Approve({ s, set, log }) {
  const [name, setName] = useState('')
  const [t, setT] = useState('udi')
  const ready = s.checked && blockers(s.fixed).length === 0
  const sign = () => {
    set({ approved: true })
    log(name, 'E-signed approval of ' + CHANGE.id + ' (label set v2)')
    log('Release', 'Approved labels sent to labeling system')
  }
  const chain = [...TRACE[t], 'Change order ' + CHANGE.id, s.approved ? 'Approved: ' + name : 'Approval pending']
  return (
    <>
      <h1>Approval and audit</h1>
      <p className="lead">Nothing is released until a person signs. Every label element can be traced back to its data, rule and approval.</p>
      <div className="grid2">
        <div>
          <div className="card">
            <h3>Release checklist</h3>
            <ul className="chk">
              <li className={s.analysed ? 'y' : ''}>Impact analysed</li>
              <li className={s.checked ? 'y' : ''}>Self-validation run</li>
              <li className={ready ? 'y' : ''}>No high or medium findings open</li>
              <li className={s.approved ? 'y' : ''}>Reviewer e-signature</li>
            </ul>
            {s.approved ? <div className="done-banner">Released. Labels are locked to this approval.</div> : (
              <>
                <label className="field">Reviewer name (e-signature)<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type your full name" /></label>
                <button className="btn org" disabled={!ready || name.trim().length < 3} onClick={sign}>Sign and approve</button>
                {!ready && <p className="muted">Finish validation first.</p>}
              </>
            )}
          </div>
          <div className="card">
            <h3>Trace a label element</h3>
            <div className="tabs">
              {FINDINGS.map((f) => (
                <button key={f.id} className={'tab' + (t === f.target ? ' on' : '')} onClick={() => setT(f.target)}>{TRACE[f.target][0]}</button>
              ))}
            </div>
            <div className="chain">{chain.map((c, i) => <div key={i} className="link">{c}</div>)}</div>
          </div>
        </div>
        <div className="card">
          <h3>Audit trail</h3>
          <ul className="log">
            {s.audit.map((a, i) => (
              <li key={i}><span className="mono">{a.t}</span><div><strong>{a.who}</strong><br />{a.what}</div></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
