
async function fetchData() {
    try {
        const response = await fetch('https://api.thingspeak.com/channels/2875631/feeds.json?results=1');
        const data = await response.json();
        const lastEntry = data.feeds[0];

        const temp = parseFloat(lastEntry.field1);
        const humidity = parseFloat(lastEntry.field2);

        document.getElementById('temperature').innerText = temp + " °C";
        document.getElementById('humidity').innerText = humidity + " %";

        let overallStatus = "";
        let statusClass = "normal";

        if (temp > 30) {
            overallStatus += "🔥 Meleg van! ";
            statusClass = "high";
        } else if (temp < 18) {
            overallStatus += "❄️ Hideg van! ";
            statusClass = "low";
        }

        if (humidity > 60) {
            overallStatus += "💦 Magas a páratartalom! ";
            statusClass = "high";
        } else if (humidity < 30) {
            overallStatus += "💨 Száraz a levegő! ";
            statusClass = "low";
        }

        if (overallStatus === "") {
            overallStatus = '<i class="fas fa-circle-check" style="color: light-green;"></i> Megfelelő környezet';
            statusClass = "normal";
        }

        document.getElementById("overall-status").innerHTML = overallStatus;
        document.getElementById("overall-status").className = "status " + statusClass;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function toggleCharts() {
    const chartsDiv = document.getElementById("charts");
    if (chartsDiv.style.display === "none" || chartsDiv.style.display === "") {
        chartsDiv.style.display = "block";
    } else {
        chartsDiv.style.display = "none";
    }
}

setInterval(fetchData, 5000); // Update every 5 seconds
fetchData();

function toggleCharts() {
    const chartsDiv = document.getElementById("charts");
    const button = document.querySelector(".more-btn");

    if (chartsDiv.style.display === "none" || chartsDiv.style.display === "") {
        chartsDiv.style.display = "block";
        chartsDiv.style.opacity = "0";
        setTimeout(() => {
            chartsDiv.style.opacity = "1";
        }, 50);
        button.innerHTML = '<i class="fas fa-times"></i> Bezár';
    } else {
        chartsDiv.style.opacity = "0";
        setTimeout(() => {
            chartsDiv.style.display = "none";
        }, 300);
        button.innerHTML = '<i class="fas fa-chart-line"></i> Tovább';
    }
}
