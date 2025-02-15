
import useMQTT from "../worker/mqtt";

export default function Info() {
  const { gpioStates, toggleLED } = useMQTT();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Raspberry Pi GPIO Control</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Button Press Status (GPIO27):</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold", backgroundColor: gpioStates.GPIO27 === "High" ? "green" : "red", }}>
          {gpioStates.GPIO27 === "High" ? "Pressed" : "Not Pressed"}
        </p>
      </div>

      <div>
        <h3>LED Control (GPIO26):</h3>
        <button
          onClick={toggleLED}
          style={{
            padding: "20px 20px",
            fontSize: "24px",
            backgroundColor: gpioStates.GPIO26 === "High" ? "green" : "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {gpioStates.GPIO26 === "High" ? "Turn Off" : "Turn On"}
        </button>
      </div>
    </div>
  );
}