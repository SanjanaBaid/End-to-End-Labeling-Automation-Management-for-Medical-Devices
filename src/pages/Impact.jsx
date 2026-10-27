import { useState } from 'react'
import { CHANGE, MARKETS, TOTAL_LABELS, ACTIONS } from '../data.js'

export default function Impact({ s, set, log, go }) {
  const [busy, setBusy] = useState(false)
  const [text, setText] = useState(CHANGE.text)
  const run = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      set({ analysed: true })
      log('Impact engine', 'Found ' + TOTAL_LABELS + ' affected labels for ' + CHANGE.id)
    }, 1200)
  }
  return (
    <>
      <h1>Change and impact</h1>
      <p className="lead">Describe the change in plain language. The impact engine traces it through product data to every label, market and language it touches.</p>
      <div className="card">
        <h3>Change request {CHANGE.id}</h3>
        <label className="field">Product<input value={CHANGE.product} readOnly /></label>
        <label className="field">What is changing?<textarea rows="2" value={text} onChange={(e) => setText(e.target.value)} /></label>
        <button className="btn" onClick={run} disabled={busy}>{busy ? 'Analysing...' : s.analysed ? 'Analyse again' : 'Analyse impact'}</button>
      </div>
      {s.analysed && (
        <div className="grid2">
          <div className="card">
            <h3>{TOTAL_LABELS} labels affected</h3>
            <table>
              <thead><tr><th>Market</th><th>Languages</th><th>Labels</th><th>Rules</th></tr></thead>
              <tbody>
                {MARKETS.map((m) => (
                  <tr key={m.m}><td>{m.m}</td><td>{m.l.join(', ')}</td><td><span className="pill">{m.n}</span></td><td>{m.reg}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="muted">Each market has unit, shelf and shipper labels. Sample data for demonstration.</p>
          </div>
          <div className="card">
            <h3>Required actions</h3>
            <ul className="acts">{ACTIONS.map((a) => <li key={a}>{a}</li>)}</ul>
            <button className="btn org" onClick={() => go('validate')}>Continue to drafting</button>
          </div>
        </div>
      )}
    </>
  )
}
