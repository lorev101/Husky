import { useState } from "react";
import { steps } from "./data";
import { StepCard } from "./StepCard";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const containerStyle = {
    maxWidth: "100%",
    padding: "24px 16px",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    boxSizing: "border-box",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "32px",
    padding: "24px",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    backdropFilter: "blur(6px)",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "8px",
    lineHeight: 1.2,
  };

  const subtitleStyle = {
    fontSize: "16px",
    color: "#6c757d",
    fontWeight: "400",
    margin: 0,
  };

  const progressStyle = {
    width: "100%",
    height: "6px",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "4px",
    marginBottom: "24px",
    overflow: "hidden",
  };

  const progressBarStyle = {
    height: "100%",
    background: "linear-gradient(90deg, #ffd700, #ffed4e)",
    borderRadius: "4px",
    width: `${(currentStep / steps.length) * 100}%`,
    transition: "width 0.4s ease",
    boxShadow: "0 1px 4px rgba(255, 215, 0, 0.3)",
  };

  const completionStyle = {
    textAlign: "center",
    padding: "24px",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    marginTop: "24px",
    backdropFilter: "blur(6px)",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🗺️ Caccia al Tesoro Roma</h1>
        <p style={subtitleStyle}>
          Scopri i luoghi più iconici della Città Eterna
        </p>
      </div>

      <div style={progressStyle}>
        <div style={progressBarStyle}></div>
      </div>

      {steps.map((step, index) => (
        <StepCard
          key={step.id}
          step={step}
          unlocked={index <= currentStep}
          onUnlock={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length))
          }
          stepNumber={index + 1}
          totalSteps={steps.length}
        />
      ))}

      {currentStep >= steps.length && (
        <div style={completionStyle}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🎉</div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#28a745",
              marginBottom: "10px",
            }}
          >
            Complimenti!
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#6c757d",
              margin: 0,
            }}
          >
            Hai completato con successo la caccia al tesoro di Roma! 🏆
          </p>
        </div>
      )}
    </div>
  );
}
