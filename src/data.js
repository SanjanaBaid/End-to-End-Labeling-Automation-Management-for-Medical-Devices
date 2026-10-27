export const CHANGE = {
  id: 'CR-2041',
  product: 'Stent Delivery System SDS-200',
  text: 'Storage temperature upper limit changes from 30 \u00B0C to 25 \u00B0C',
}

export const MARKETS = [
  { m: 'United States', l: ['English'], n: 3, reg: 'FDA 21 CFR 801 / 830' },
  { m: 'European Union', l: ['English', 'German', 'French', 'Spanish', 'Italian'], n: 15, reg: 'EU MDR 2017/745' },
  { m: 'Japan', l: ['Japanese'], n: 3, reg: 'Country-specific rules' },
  { m: 'China', l: ['Chinese'], n: 3, reg: 'Country-specific rules' },
  { m: 'Middle East', l: ['Arabic', 'English'], n: 6, reg: 'Country-specific rules' },
]
export const TOTAL_LABELS = MARKETS.reduce((a, x) => a + x.n, 0)

export const ACTIONS = [
  'Update the storage-temperature statement in all 10 language variants',
  'Re-check the temperature-limit symbol (ISO 15223-1) on unit and shelf labels',
  'Raise a change order and route it to Regulatory and Quality approval',
]

export const FINDINGS = [
  { id: 'F1', target: 'udi', sev: 'High', pen: 14, title: 'Printed UDI does not match barcode data',
    rule: 'FDA 21 CFR 830 / EU MDR Art. 27',
    detail: 'Human-readable lot differs from the lot encoded in the barcode.', fix: 'Regenerate the text from the barcode data' },
  { id: 'F2', target: 'temp', sev: 'Medium', pen: 9, title: 'Temperature-limit symbol missing',
    rule: 'ISO 15223-1',
    detail: 'The storage statement changed but no temperature-limit symbol is on the label.', fix: 'Insert the 25 \u00B0C upper-limit symbol' },
  { id: 'F3', target: 'date', sev: 'Medium', pen: 7, title: 'Date format is not YYYY-MM-DD',
    rule: 'Company labeling standard',
    detail: 'Use-by date is written 12/31/2027.', fix: 'Reformat to 2027-12-31' },
  { id: 'F4', target: 'text', sev: 'Low', pen: 4, title: 'German term differs from approved glossary',
    rule: 'Approved terminology',
    detail: '"Lagertemperatur" should be "Lagerungstemperatur".', fix: 'Use the glossary term' },
]

export const TRACE = {
  udi: ['Barcode and UDI text', 'PLM field: UDI-DI + lot rule', 'FDA 21 CFR 830 / EU MDR Art. 27'],
  temp: ['Temperature-limit symbol', 'PLM field: StorageTempMax = 25 \u00B0C', 'ISO 15223-1 symbol library'],
  date: ['Use-by date', 'ERP field: shelf life', 'Date-format rule v3'],
  text: ['Storage statement (DE)', 'Approved text block TB-118', 'Glossary term v7'],
}

export const score = (fixed) =>
  100 - FINDINGS.filter((f) => !fixed.includes(f.id)).reduce((a, f) => a + f.pen, 0)
export const blockers = (fixed) =>
  FINDINGS.filter((f) => f.sev !== 'Low' && !fixed.includes(f.id))
