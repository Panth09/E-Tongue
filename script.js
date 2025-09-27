const sensorData = [
    { taste: 'Sweet', sensor: 'Refractive Index Sensor', value: 1.33, unit: 'RI', status: '✅ Normal' },
    { taste: 'Salty', sensor: 'Conductivity Sensor', value: 2.5, unit: 'mS/cm', status: '⚠️ High' },
    { taste: 'Sour', sensor: 'pH Sensor', value: 4.2, unit: 'pH', status: '✅ Safe' },
    { taste: 'Bitter', sensor: 'Biomimetic Sensor', value: 0.8, unit: 'mV', status: '⚠️ Detected' },
    { taste: 'Pungent', sensor: 'Temperature Sensor', value: 32, unit: '°C', status: '✅ Normal' },
    { taste: 'Astringent', sensor: 'Polypyrrole Sensor', value: 0.65, unit: 'mS', status: '✅ Normal' }
];

const trendData = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00'],
    datasets: [{
        label: 'Conductivity (mS/cm)',
        data: [2.0, 2.1, 2.3, 2.4, 2.5],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1
    }]
};

// Radar Chart
const radarCtx = document.getElementById('radarChart').getContext('2d');
new Chart(radarCtx, {
    type: 'radar',
    data: {
        labels: sensorData.map(d => d.taste),
        datasets: [{
            label: 'Taste Intensity',
            data: sensorData.map(d => d.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Taste Intensity Radar' } },
        scales: { r: { beginAtZero: true, suggestedMax: 5 } }
    }
});

// Line Chart
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
    type: 'line',
    data: trendData,
    options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Sensor Trend Over Time' } }
    }
});

// Simulate real-time updates
setInterval(() => {
    const status = Math.random() > 0.5 ? '🟢 Online' : '🔴 Offline';
    document.getElementById('status-indicator').textContent = status;
    document.getElementById('last-calibration').textContent = `Last Calibration: ${new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
}, 5000);

// Export Functions
function exportData(type) {
    if (type === 'csv') {
        const csv = ['Taste,Sensor,Value,Status', ...sensorData.map(d => `${d.taste},${d.sensor},${d.value} ${d.unit},${d.status}`)].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sensor-data.csv';
        a.click();
        URL.revokeObjectURL(url);
    } else if (type === 'pdf') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text('ANVITRA – E-Tongue System Report', 10, 10);
        sensorData.forEach((d, i) => doc.text(`${d.taste}: ${d.value} ${d.unit} (${d.status})`, 10, 20 + i * 10));
        doc.save('sensor-report.pdf');
    }
}

function cloudUpload() {
    alert('Simulated cloud upload successful!');
}

function calibrate() {
    document.getElementById('last-calibration').textContent = `Last Calibration: ${new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
    alert('Calibration complete!');
}

function retest() {
    alert('Re-test initiated!');
}

function feedback() {
    alert('Feedback form opened!');
}
