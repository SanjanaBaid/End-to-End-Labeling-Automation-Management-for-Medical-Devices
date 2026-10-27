import { useState } from 'react'
import { FINDINGS, score, blockers } from '../data.js'

export default function Validate({ s, set, log, go }) {
  const [busy, setBusy] = useState(false)
  const fx = (id) => s.fixed.includes(id)
  const st = (t) => {
    const f = FINDINGS.find((x) => x.target === t)
    return !s.checked ? '' : fx(f.id) ? 'ok' : 'bad'
  }
  const pin = (t) => s.checked ? <i>{FINDINGS.findIndex((x) => x.target === t) + 1}</i> : null
  const run = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      set({ checked: true })
      log('Self-validation', 'Ran rules, OCR and symbol checks: ' + FINDINGS.length + ' findings')
    }, 1500)
  }
  const apply = (f) => {
    set({ fixed: [...s.fixed, f.id] })
    log('Labeling engineer', 'Accepted fix ' + f.id + ': ' + f.fix)
  }
  const sc = score(s.fixed)
  const left = blockers(s.fixed).length
  return (
    <>
      <h1>Draft and validate</h1>
      <p className="lead">The draft below was written from approved text blocks. Run the checks to see every problem marked directly on the label.</p>
      <div className="grid2">
        <div className="card">
          <div className="label">
            <div className="lh"><strong>MedTec Cardio</strong><span className="mono">REF SDS-200</span></div>
            <div className="lt">Stent Delivery System</div>
            <div className={'mk ' + st('text')}>
              <small>Lagertemperatur: nicht &uuml;ber 25 &deg;C. Nicht erneut sterilisieren. Packung bei Besch&auml;digung nicht verwenden.</small>{pin('text')}
            </div>
            <div className="syms">
              <span className="sym">MD</span><span className="sym">LOT</span><span className="sym">STERILE</span>
              <div className={'mk sym2 ' + st('temp')}>{fx('F2') ? <span className="sym">25 &deg;C max</span> : <span className="sym empty">no symbol</span>}{pin('temp')}</div>
            </div>
            <div className={'mk ' + st('date')}><small>Use by: <b>{fx('F3') ? '2027-12-31' : '12/31/2027'}</b></small>{pin('date')}</div>
            <div className={'mk ' + st('udi')}>
              <div className="barcode" />
              <div className="mono">(01)00812345678905(17)271231(10){fx('F1') ? 'A1B2C3' : 'A1B2C8'}</div>{pin('udi')}
            </div>
            <div className="ce">CE 0123</div>
          </div>
        </div>
        <div>
          <div className="card">
            <div className="row">
              <div>
                <h3>Label risk score</h3>
                <div className="muted">{!s.checked ? 'Run the checks to score this label' : left ? left + ' blocking finding(s) left' : 'Ready for human approval'}</div>
              </div>
              <div className="ring" style={{ '--p': s.checked ? sc : 0 }}><b>{s.checked ? sc : '-'}</b></div>
            </div>
            {!s.checked && <button className="btn" onClick={run} disabled={busy}>{busy ? 'Checking...' : 'Run self-validation'}</button>}
            {s.checked && !left && <button className="btn org" onClick={() => go('approve')}>Send for approval</button>}
          </div>
          {s.checked && FINDINGS.map((f, i) => (
            <div key={f.id} className={'card fnd' + (fx(f.id) ? ' done' : '')}>
              <div className="row">
                <strong>{i + 1}. {f.title}</strong>
                <span className={'sev ' + f.sev}>{fx(f.id) ? 'Fixed' : f.sev}</span>
              </div>
              <p>{f.detail}</p>
              <small className="muted">Rule: {f.rule}</small>
              {!fx(f.id) && <div><button className="btn ghost" onClick={() => apply(f)}>Apply fix: {f.fix}</button></div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
