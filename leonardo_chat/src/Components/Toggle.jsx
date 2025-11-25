export default function Toggle({ checked, onChange, label, id }) {
    return (
      <label className="toggle">
        <input id={id} type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} />
        <span className="track" aria-hidden="true"></span>
        <span className="toggle-label">{label}</span>
      </label>
    );
  }
  