import { useState } from "react";

export function StepCard({ step, unlocked, onUnlock, stepNumber, totalSteps }) {
  const [photo, setPhoto] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleLocation = () => {
    setIsChecking(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const near = isNear(latitude, longitude, step.lat, step.lng);

        setTimeout(() => {
          setIsChecking(false);
          if (near) {
            alert("🎉 Posizione corretta! Step sbloccato.");
            onUnlock();
          } else {
            alert("📍 Non sei nel posto giusto. Continua a cercare!");
          }
        }, 1000);
      },
      () => {
        setIsChecking(false);
        alert("❌ Impossibile ottenere la posizione. Controlla i permessi.");
      }
    );
  };

  const cardStyle = {
    position: "relative",
    padding: "20px",
    background: unlocked
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    borderRadius: "16px",
    boxShadow: unlocked
      ? "0 6px 24px rgba(102, 126, 234, 0.2)"
      : "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "700",
    color: unlocked ? "#ffffff" : "#343a40",
    margin: 0,
  };

  const badgeStyle = {
    backgroundColor: unlocked ? "rgba(255,255,255,0.2)" : "#6c757d",
    color: "#fff",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: "600",
  };

  const descriptionStyle = {
    fontSize: "15px",
    color: unlocked ? "#f8f9fa" : "#6c757d",
    marginBottom: "16px",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    marginBottom: "12px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    backgroundColor: unlocked ? "rgba(255,255,255,0.1)" : "#e9ecef",
    color: unlocked ? "#fff" : "#343a40",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "25px",
    border: "none",
    cursor: unlocked ? "pointer" : "not-allowed",
    background: unlocked
      ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
      : "#adb5bd",
    color: "#fff",
    opacity: isChecking ? 0.6 : 1,
    transition: "all 0.3s ease",
  };

  const loaderStyle = {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginRight: "8px",
  };

  return (
    <div style={cardStyle}>
      {unlocked && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #ffd700, #ffed4e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            boxShadow: "0 2px 6px rgba(255, 215, 0, 0.4)",
          }}
        >
          ✨
        </div>
      )}

      <div style={headerStyle}>
        <h2 style={titleStyle}>{step.name}</h2>
        <span style={badgeStyle}>
          {stepNumber}/{totalSteps}
        </span>
      </div>

      <p style={descriptionStyle}>{step.description}</p>

      {unlocked ? (
        <div>
          <div style={{ marginBottom: "12px", width: "100%" }}>
            <label
              htmlFor={`photo-upload-${step.id}`}
              style={{
                display: "inline-block",
                width: "100%",
                padding: "12px",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                borderRadius: "25px",
                background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                color: "#fff",
                cursor: "pointer",
                boxSizing: "border-box", // ✅ impedisce overflow per padding
                overflow: "hidden", // ✅ previene testi lunghi che traboccano
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              📷 Carica foto
            </label>

            <input
              id={`photo-upload-${step.id}`}
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>

          <button
            onClick={handleLocation}
            disabled={isChecking}
            style={buttonStyle}
          >
            {isChecking ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={loaderStyle}></div>Verifica...
              </div>
            ) : (
              <>📍 Invia posizione</>
            )}
          </button>

          {/* Spinner CSS */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f1f3f5",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "14px",
            color: "#6c757d",
            fontStyle: "italic",
          }}
        >
          🔒 Completa il passo precedente per sbloccare
        </div>
      )}
    </div>
  );
}

// ✅ Bug fix: corretto il confronto delle longitudini
export function isNear(lat1, lng1, lat2, lng2, threshold = 0.001) {
  const dLat = Math.abs(lat1 - lat2);
  const dLng = Math.abs(lng1 - lng2);
  return dLat <= threshold && dLng <= threshold;
}
