import { useState } from "react";

export function StepCard({ step, unlocked, onUnlock, stepNumber, totalSteps }) {
  const [positionConfirmed, setPositionConfirmed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [completed, setCompleted] = useState(false);

  const isDev = true;

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const near = isNear(latitude, longitude, step.lat, step.lng);
        if (near) {
          alert("📍 Posizione corretta! Inizia la sfida.");
          setPositionConfirmed(true);
        } else {
          alert("❌ Non sei nel posto giusto.");
        }
      },
      () => {
        alert("⚠️ Geolocalizzazione fallita.");
      }
    );
  };

  const skipToChallenge = () => {
    setPositionConfirmed(true);
    alert("🔧 Posizione simulata (dev).");
  };

  const handleAnswer = (index) => {
    setSelectedIndex(index);
    const isCorrect = index === step.challenges[currentQuestion].answerIndex;

    setTimeout(() => {
      if (isCorrect) {
        if (currentQuestion + 1 < step.challenges.length) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedIndex(null);
        } else {
          alert("🎉 Hai completato questo step!");
          setCompleted(true);
          onUnlock();
        }
      } else {
        alert("❌ Risposta errata. Riprova.");
      }
    }, 500);
  };

  // Bloccato
  if (!unlocked) {
    return (
      <div style={lockedCardStyle}>
        <h3 style={lockedTitle}>🔒 Step {stepNumber}</h3>
        <p style={lockedSubtitle}>Completa i passi precedenti per sbloccare</p>
      </div>
    );
  }

  const challenge = step.challenges[currentQuestion];
  const progress = ((currentQuestion + (completed ? 1 : 0)) / step.challenges.length) * 100;

  return (
    <div style={cardStyle}>
      <div style={progressBarContainer}>
        <div style={{ ...progressBar, width: `${progress}%` }} />
      </div>

      <h2 style={titleStyle}>
        {step.name} <span style={badgeStyle}>Step {stepNumber}/{totalSteps}</span>
      </h2>

      <p style={descStyle}>{step.description}</p>

      {!positionConfirmed ? (
        <>
          <button style={btnStyle} onClick={handleLocation}>
            📍 Invia posizione
          </button>
          {isDev && (
            <button style={{ ...btnStyle, backgroundColor: "#6c757d" }} onClick={skipToChallenge}>
              ⚙️ Salta posizione (dev)
            </button>
          )}
        </>
      ) : !completed ? (
        <>
          <p style={questionStyle}>❓ {challenge.question}</p>
          {challenge.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              style={{
                ...optionStyle,
                backgroundColor:
                  selectedIndex === idx
                    ? idx === challenge.answerIndex
                      ? "#28a745"
                      : "#dc3545"
                    : "#007bff"
              }}
            >
              {option}
            </button>
          ))}
        </>
      ) : (
        <p style={completedStyle}>✅ Step completato!</p>
      )}
    </div>
  );
}

// --- STILI ---

const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  padding: "20px",
  marginBottom: "24px"
};

const progressBarContainer = {
  height: "8px",
  backgroundColor: "#e9ecef",
  borderRadius: "6px",
  overflow: "hidden",
  marginBottom: "16px"
};

const progressBar = {
  height: "100%",
  background: "linear-gradient(90deg, #00c6ff, #0072ff)",
  transition: "width 0.3s ease"
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "8px"
};

const badgeStyle = {
  fontSize: "13px",
  marginLeft: "10px",
  color: "#999"
};

const descStyle = {
  fontSize: "15px",
  color: "#555",
  marginBottom: "16px"
};

const questionStyle = {
  fontWeight: "600",
  marginBottom: "10px"
};

const btnStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  fontSize: "14px",
  fontWeight: "600",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const optionStyle = {
  ...btnStyle,
  marginBottom: "8px"
};

const completedStyle = {
  fontWeight: "600",
  color: "#28a745",
  textAlign: "center",
  marginTop: "12px"
};

const lockedCardStyle = {
  padding: "20px",
  backgroundColor: "#f1f3f5",
  borderRadius: "16px",
  textAlign: "center",
  marginBottom: "24px",
  border: "1px dashed #ced4da"
};

const lockedTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "8px",
  color: "#6c757d"
};

const lockedSubtitle = {
  fontSize: "14px",
  color: "#999"
};

// --- PROXIMITY CHECK ---

function isNear(lat1, lng1, lat2, lng2, threshold = 0.001) {
  const dLat = Math.abs(lat1 - lat2);
  const dLng = Math.abs(lng1 - lng2);
  return dLat <= threshold && dLng <= threshold;
}
