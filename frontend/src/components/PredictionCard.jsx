"use client";

export default function PredictionCard({ prediction, loading }) {
  return (
    <section className="prediction-card">
      <div className="prediction-header">
        <div>
          <p className="eyebrow">Model output</p>

          <h2>Estimated Energy Burn</h2>
        </div>

        <div className="status-pill">
          <span className={loading ? "status-dot loading" : "status-dot"} />
          {loading ? "CALCULATING" : "LIVE"}
        </div>
      </div>

      <div className="prediction-center">
        <div className="prediction-ring">
          <div className="prediction-glow" />

          <div className="prediction-value">
            {prediction !== null ? prediction.toFixed(1) : "---"}
          </div>

          <div className="prediction-unit">KCAL</div>
        </div>
      </div>

      <div className="prediction-footer">
        <div>
          <span>MODEL</span>
          <strong>CatBoost</strong>
        </div>

        <div>
          <span>TARGET</span>
          <strong>Calories</strong>
        </div>

        <div>
          <span>MODE</span>
          <strong>Simulation</strong>
        </div>
      </div>
    </section>
  );
}
