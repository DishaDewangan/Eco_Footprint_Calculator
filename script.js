function calculateFootprint() {
  const carDist = parseFloat(document.querySelector("#carTravel").value) || 0;
  const flightsNum = parseFloat(document.querySelector("#flights").value) || 0;
  const energyUse =
    parseFloat(document.querySelector("#energyConsumption").value) || 0;
  const wasteGen =
    parseFloat(document.querySelector("#wasteGenerated").value) || 0;
  const mealsPerDay =
    parseFloat(document.querySelector("#mealsPerDay").value) || 0;

  const carEF = 0.404;
  const flightEF = 250;
  const energyEF = 0.5;
  const wasteEF = 2.52;
  const dietEF = 0.003;

  const carCO2 = carDist * carEF * 52;
  const flightCO2 = flightsNum * flightEF;
  const transportationCO2 = carCO2 + flightCO2;
  const energyCO2 = energyUse * energyEF * 12;
  const wasteCO2 = wasteGen * wasteEF * 12;
  const dietCO2 = mealsPerDay * dietEF * 365;

  const totalKgCO2 = transportationCO2 + energyCO2 + wasteCO2 + dietCO2;
  const totalCO2 = totalKgCO2 / 1000;

  const transportPercent = (transportationCO2 / totalKgCO2) * 100;
  const electricityPercent = (energyCO2 / totalKgCO2) * 100;
  const dietPercent = (dietCO2 / totalKgCO2) * 100;
  const wastePercent = (wasteCO2 / totalKgCO2) * 100;

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

  document.querySelector("#transport-bar").style.width = `${transportPercent}%`;
  document.querySelector("#transport-bar").style.backgroundColor = "#070738";

  document.querySelector(
    "#electricity-bar"
  ).style.width = `${electricityPercent}%`;
  document.querySelector("#electricity-bar").style.backgroundColor = "#F2D2BD";

  document.querySelector("#diet-bar").style.width = `${dietPercent}%`;
  document.querySelector("#diet-bar").style.backgroundColor = "#DC143C";

  document.querySelector("#waste-bar").style.width = `${wastePercent}%`;
  document.querySelector("#waste-bar").style.backgroundColor = "#AAFF00";

  document.querySelector("#emission-bar").style.display = "flex";
  document.querySelector("#breakdown").style.display = "flex";
  document.querySelector("#breakdown").innerHTML = `
      <span><span style="color: #070738;">&#9632;</span> Transport: ${transportPercent.toFixed(
        1
      )}%</span>
      <span><span style="color: #F2D2BD;">&#9632;</span> Electricity: ${electricityPercent.toFixed(
        1
      )}%</span>
      <span><span style="color: #DC143C;">&#9632;</span> Diet: ${dietPercent.toFixed(
        1
      )}%</span>
      <span><span style="color: #AAFF00;">&#9632;</span> Waste: ${wastePercent.toFixed(
        1
      )}%</span>
  `;

  const reductionTips = `
      <h3>Reduction Tips:</h3>
      <ul>
          <li>Use public transport or carpool to reduce transportation emissions.</li>
          <li>Minimize flights where possible.</li>
          <li>Reduce energy consumption by using efficient appliances.</li>
          <li>Consider plant-based meals to reduce diet-related emissions.</li>
          <li>Recycle and compost waste effectively.</li>
      </ul>
  `;
  document.querySelector("#tips").innerHTML = reductionTips;
}
