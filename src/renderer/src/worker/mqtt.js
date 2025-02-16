import { useEffect, useState } from "react";
import mqtt from "mqtt";

const MQTT_BROKER = "ws://localhost:9001"; // Replace with your actual Pi's IP
const CONTROL_TOPIC = "gpio/control";
const STATUS_TOPIC = "gpio/status";

export default function useMQTT() {
  const [gpioStates, setGpioStates] = useState({ GPIO27: "Low", GPIO26: "Low" });

  useEffect(() => {
    // Connect to MQTT broker
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("Connected to MQTT");
      client.subscribe(STATUS_TOPIC);
    });

    client.on("message", (topic, payload) => {
      if (topic === STATUS_TOPIC) {
        const newStates = JSON.parse(payload.toString());
        console.log(newStates);
        setGpioStates((prevStates) => ({ ...prevStates, ...newStates }));
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const getCurrentGPIOStates = () => {
    const client = mqtt.connect(MQTT_BROKER);
    const message = JSON.stringify({ pin: "ALL" });
    console.log("🔹 Connecting to MQTT broker...");

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker.");
      console.log(`🔹 Publishing to ${CONTROL_TOPIC}:`, message);
  
      client.publish(CONTROL_TOPIC, message, (err) => {
        if (err) {
          console.error("❌ Publish failed:", err);
        } else {
          console.log("✅ Publish successful!");
        }
        client.end();
      });
    });
  
    client.on("error", (err) => {
      console.error("❌ MQTT connection error:", err);
    });
  }

  const toggleLED = () => {
    const client = mqtt.connect(MQTT_BROKER);
    const newState = gpioStates.GPIO26 === "High" ? "Low" : "High";
    const message = JSON.stringify({ pin: "GPIO26", state: newState });
    
    console.log("🔹 Connecting to MQTT broker...");

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker.");
      console.log(`🔹 Publishing to ${CONTROL_TOPIC}:`, message);
  
      client.publish(CONTROL_TOPIC, message, (err) => {
        if (err) {
          console.error("❌ Publish failed:", err);
        } else {
          console.log("✅ Publish successful!");
        }
        client.end();
      });
    });
  
    client.on("error", (err) => {
      console.error("❌ MQTT connection error:", err);
    });
  };

  return { gpioStates, toggleLED, getCurrentGPIOStates };
}