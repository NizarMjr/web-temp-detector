import React, { useEffect, useState } from "react";
import cong from "./configuration"; // Your Firebase config
import { getDatabase, ref, onValue } from "firebase/database";
import TemperatureAdvice from "./components/Advices"; // Import the new component
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const MIN_TEMP = 36.5;
  const MAX_TEMP = 39.0;

  useEffect(() => {
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
    const connectedRef = ref(getDatabase(cong), ".info/connected");
    onValue(connectedRef, (snapshot) => {
      const connected = snapshot.val();
      setIsConnected(connected === true);
    });

    fetchData();
  }, []);

  const getStatus = () => {
    if (temperature === null) return "Waiting for data...";
    return temperature > MAX_TEMP
      ? "🚨 Alert: High Temperature!"
      : "✅ Normal";
  };

  return (
    <div className="app">
      <div className="led-container">
        <div className={`led ${isConnected ? "connected" : "disconnected"}`}></div>
        <span className="led-label">{isConnected ? "Connected" : "Disconnected"}</span>
      </div>
      <div className="card">
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
