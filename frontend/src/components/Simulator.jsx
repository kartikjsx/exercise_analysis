"use client";

import { useEffect, useState } from "react";

import { DEFAULT_VALUES } from "../lib/constants";

import { predictCalories } from "../lib/api";

import ControlPanel from "./ControlPanel";
import PredictionCard from "./PredictionCard";

export default function Simulator() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function handleChange(name, value) {
    setValues((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "Weight (kg)" || name === "Height (m)"
        ? {
            BMI: Number(
              (
                (name === "Weight (kg)" ? value : previous["Weight (kg)"]) /
                Math.pow(
                  name === "Height (m)" ? value : previous["Height (m)"],
                  2,
                )
              ).toFixed(2),
            ),
          }
        : {}),
    }));
  }

  // ==========================================================
  // LIVE MODEL PREDICTION
  // ==========================================================

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const result = await predictCalories(values);

        setPrediction(result.calories_burned);
      } catch (error) {
        console.error(error);

        setError("Prediction service unavailable.");
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [values]);

  return (
    <div className="simulator-grid">
      <ControlPanel values={values} onChange={handleChange} />

      <PredictionCard prediction={prediction} loading={loading} />

      {error && <div className="error-banner">{error}</div>}
    </div>
  );
}
