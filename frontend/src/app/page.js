import Simulator from "../components/Simulator";

export default function Home() {
  return (
    <main className="app-shell">
      <div className="page-wrap">
        <nav className="topbar">
          <div className="brand">
            <span className="brand-mark" /> CALIBRA
          </div>
          <div className="topbar-meta">Neural fitness intelligence / v1.0</div>
        </nav>

        <header className="hero">
          <div>
            <p className="eyebrow">Live model interface / 01</p>
            <h1>
              Calorie burn <span>simulator.</span>
            </h1>
            <p className="hero-copy">
              Tune the parameters of your session and watch the prediction
              engine respond in real time.
            </p>
          </div>
          <div className="hero-index">
            <strong>01</strong> / 02
            <br />
            ACTIVE MODULE
          </div>
        </header>

        <div>
          <Simulator />
        </div>
      </div>
    </main>
  );
}
