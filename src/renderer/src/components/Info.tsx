import { useEffect, useState, useRef } from "react";
import useMQTT from "../worker/mqtt";

export default function Info() {
  const { gpioStates, toggleLED } = useMQTT();
  const [image, setImage] = useState("main.png");
  const initialRender = useRef(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (gpioStates.GPIO26 === "High") {
      let frame = 10;
      interval = setInterval(() => {
        setImage(`d-r-${frame}.png`);
        frame += 10;
        if (frame > 50) {
          clearInterval(interval);
        }
      }, 80); // Change frame every 80ms
    } else if (gpioStates.GPIO26 === "Low") {
      let frame = 50;
      interval = setInterval(() => {
        setImage(`d-r-${frame}.png`);
        frame -= 10;
        if (frame < 10) {
          clearInterval(interval);
          setImage("main.png");
        }
      }, 80); // Change frame every 80ms
    } else {
      setImage("main.png");
    }

    return () => clearInterval(interval);
  }, [gpioStates.GPIO26]);

  return (
    <div style={{ textAlign: "center", padding: "20px", height: "631px" }}>
      <h2>Raspberry Pi GPIO Control</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Button Press Status (GPIO27):</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold", backgroundColor: gpioStates.GPIO27 === "High" ? "green" : "red", }}>
          {gpioStates.GPIO27 === "High" ? "Pressed" : "Not Pressed"}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ marginRight: "20px" }}>
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
        <div>
          <img src={image} alt="Display" style={{ width: "100%", height: "auto", maxWidth: "250px", maxHeight: "500px" }} />
        </div>
      </div>
    </div>
  );
}