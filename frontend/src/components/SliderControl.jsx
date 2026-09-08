export default function SliderControl({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}) {
  const progress = `${((value - min) / (max - min)) * 100}%`;

  return (
    <div className="slider-control">
      <div className="slider-top">
        <span>{label}</span>

        <span className="slider-value">
          {value}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={{ "--progress": progress }}
        className="sim-slider"
      />

      <div className="slider-range">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
