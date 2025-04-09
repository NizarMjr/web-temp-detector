import React from "react";

const TemperatureAdvice = ({ temperature }) => {
    if (temperature === null) {
        return <p>Monitoring sensor...</p>;
    }

    if (temperature > 39) {
        return (
            <div className="advice">
                <h2>Advice</h2>
                <ul>
                    <li>🧊 Stay in a cool, shaded place</li>
                    <li>💧 Drink plenty of water</li>
                    <li>📞 Seek medical help if you feel unwell</li>
                    <li>🚫 Avoid heavy physical activity</li>
                </ul>
            </div>
        );
    } else if (temperature < 36.5) {
        return (
            <div className="advice">
                <h2>Advice</h2>
                <ul>
                    <li>🧣 Keep warm with layers of clothing</li>
                    <li>🛏️ Rest and maintain body heat</li>
                    <li>📞 Consult a medical professional if feeling unwell</li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="advice">
                <h2>Advice</h2>
                <ul>
                    <li>🌿 Temperature is ideal</li>
                    <li>🙂 Stay hydrated and maintain comfort</li>
                    <li>🧘‍♂️ Great time for outdoor activities</li>
                </ul>
            </div>
        );
    }
};

export default TemperatureAdvice;
