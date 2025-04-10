import React, { useEffect, useState } from "react";
import cong from "./config"; // Your Firebase config
import { getDatabase, ref, onValue, set } from "firebase/database";
import TemperatureAdvice from "./components/Advices"; // Import the new component
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [ledState, setLedState] = useState(false); // LED state
  const MIN_TEMP = 36.5;
  const MAX_TEMP = 39.0;

  useEffect(() => {
    console.log('cong', cong);

    const db = getDatabase(cong);
    const tempRef = ref(db, "temperature");

    const fetchData = () => {
      onValue(tempRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null) {
          setTemperature(value);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      });
    };

    const ledRef = ref(db, "led/state");
    onValue(ledRef, (snapshot) => {
      const ledValue = snapshot.val();
      if (ledValue !== null) {
        setLedState(ledValue); // Update LED state
      }
    });
    fetchData();
  }, []);

  const getStatus = () => {
    if (temperature === null) return "Waiting for data...";
    return temperature > MAX_TEMP
      ? "🚨 Alert: High Temperature!"
      : "✅ Normal";
  };

  // Function to toggle LED state
  const toggleLedState = () => {
    const newLedState = !ledState;
    setLedState(newLedState);

    // Save new LED state to Firebase
    const db = getDatabase(cong);
    const ledRef = ref(db, "led/state");
    set(ledRef, newLedState); // Set new LED state in Firebase
  };

  return (
    <div className="app">
      <div className="card">
        <div className="led-container">
          <div className={`led ${ledState ? "on" : "off"}`}></div>
          <span className="led-label">
            {ledState ? "LED: ON" : "LED: OFF"}
          </span>
        </div>
        <h1>🌡️ Smart Temperature Monitor</h1>
        <h3>📍 Location: Marsa Tunis</h3>

        <p className="temperature">
          {temperature !== null ? `${temperature.toFixed(2)}°C` : "Loading..."}
        </p>

        <p className={`status ${temperature && temperature > MAX_TEMP ? "alert" : "normal"}`}>
          {getStatus()}
        </p>

        <div className="details">
          <p>🔻 Min Threshold: {MIN_TEMP.toFixed(1)}°C</p>
          <p>🔺 Max Threshold: {MAX_TEMP.toFixed(1)}°C</p>
          <p>⏱️ Last updated: {lastUpdated || "Fetching..."}</p>
        </div>

        {/* Button to toggle LED */}
        <button className={`${ledState ? "off" : "on"} `} onClick={toggleLedState}>
          Turn Led {ledState ? 'OFF' : 'ON'}
        </button>

      </div>

      {/* Adding the TemperatureAdvice component */}
      <TemperatureAdvice temperature={temperature} />

      <footer>
        <p>© 2025 TempMonitor Inc. | All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
