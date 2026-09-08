"use client";

import SliderControl from "./SliderControl";
import SelectControl from "./SelectControl";

import { SLIDERS, SELECTS } from "../lib/constants";

export default function ControlPanel({ values, onChange }) {
  return (
    <section className="glass-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Input matrix</p>
          <h2>Workout parameters</h2>
        </div>
        <span className="panel-code">SYNCED / 10 VARS</span>
      </div>

      <div className="control-grid">
        {SLIDERS.map((slider) => (
          <SliderControl
            key={slider.name}
            label={slider.label}
            value={values[slider.name]}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            suffix={slider.suffix}
            onChange={(event) => {
              onChange(slider.name, Number(event.target.value));
            }}
          />
        ))}

        {SELECTS.map((select) => (
          <SelectControl
            key={select.name}
            label={select.label}
            value={values[select.name]}
            options={select.options}
            onChange={(event) => {
              const value =
                select.name === "Experience_Level"
                  ? Number(event.target.value)
                  : event.target.value;

              onChange(select.name, value);
            }}
          />
        ))}
      </div>

      <div className="bmi-row">
        <div>
          <p className="bmi-label">Calculated BMI</p>
          <p className="bmi-note">
            Automatically calculated from height and weight
          </p>
        </div>

        <div className="bmi-badge">
          <span className="bmi-value">{Number(values.BMI).toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
