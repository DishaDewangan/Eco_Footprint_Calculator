function calculateFootprint() {
  const carDist = parseFloat(document.querySelector("#carTravel").value) || 0;
  const flightsNum = parseFloat(document.querySelector("#flights").value) || 0;
  const energyUse =
    parseFloat(document.querySelector("#energyConsumption").value) || 0;
  const wasteGen =
    parseFloat(document.querySelector("#wasteGenerated").value) || 0;

  const carEF = 0.404;
  const flightEF = 250;
  const energyEF = 0.5;
  const wasteEF = 2.52;

  const carCO2 = carDist * carEF * 52;
  const flightCO2 = flightsNum * flightEF;
  const energyCO2 = energyUse * energyEF * 12;
  const wasteCO2 = wasteGen * wasteEF * 12;

  const totalCO2 = (carCO2 + flightCO2 + energyCO2 + wasteCO2) / 1000;

  const resultElement = document.querySelector("#results");

  let color;
  if (totalCO2 < 5) {
    color = "green";
  } else if (totalCO2 >= 5 && totalCO2 <= 10) {
    color = "orange";
  } else {
    color = "red";
  }

  resultElement.innerHTML = `
    <strong>Your Carbon Footprint:</strong> 
    <span style="color: ${color}; font-size: 1.2em;">${totalCO2.toFixed(
    2
  )} tons of CO₂ per year</span>
`;

  const reductionTips = `
        <h3>Reduction Tips:</h3>
        <ul>
            <li>Use public transport or carpool.</li>
            <li>Minimize flights.</li>
            <li>Save energy at home.</li>
            <li>Reduce and recycle waste.</li>
        </ul>
    `;
  document.querySelector("#tips").innerHTML = reductionTips;
}
