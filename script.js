const canvas = document.getElementById('colorCanvas');
const ctx = canvas.getContext('2d');

const yearEl = document.getElementById('year');
//update the year
yearEl.innerText = new Date().getFullYear();

// Function to handle canvas resize
function resizeCanvas() {
    //take available space on resize
    if (window.innerWidth < 800) {
        canvas.width = window.innerWidth - 40;
    } else {
        canvas.width = window.innerWidth - 320;
    }
    canvas.height = window.innerHeight - 200;
    drawCanvas();
}

// Resize the canvas to fill the window
window.addEventListener('resize', resizeCanvas);
//resize on load
resizeCanvas();

// Function to parse slider inputs
function parseSliders() {
    const A = [parseInt(document.getElementById('A0').value), parseInt(document.getElementById('A1').value), parseInt(document.getElementById('A2').value)];
    const B = [parseInt(document.getElementById('B0').value), parseInt(document.getElementById('B1').value), parseInt(document.getElementById('B2').value)];
    const C = [parseFloat(document.getElementById('C0').value), parseFloat(document.getElementById('C1').value), parseFloat(document.getElementById('C2').value)];
    const D = [parseFloat(document.getElementById('D0').value), parseFloat(document.getElementById('D1').value), parseFloat(document.getElementById('D2').value)];
    return {
        A,
        B,
        C,
        D
    };
}

// Function to update slider display values
function updateSliderValues() {
    document.getElementById('A0Value').innerText = document.getElementById('A0').value;
    document.getElementById('A1Value').innerText = document.getElementById('A1').value;
    document.getElementById('A2Value').innerText = document.getElementById('A2').value;
    document.getElementById('B0Value').innerText = document.getElementById('B0').value;
    document.getElementById('B1Value').innerText = document.getElementById('B1').value;
    document.getElementById('B2Value').innerText = document.getElementById('B2').value;
    document.getElementById('C0Value').innerText = parseFloat(document.getElementById('C0').value).toFixed(2);
    document.getElementById('C1Value').innerText = parseFloat(document.getElementById('C1').value).toFixed(2);
    document.getElementById('C2Value').innerText = parseFloat(document.getElementById('C2').value).toFixed(2);
    document.getElementById('D0Value').innerText = parseFloat(document.getElementById('D0').value).toFixed(2);
    document.getElementById('D1Value').innerText = parseFloat(document.getElementById('D1').value).toFixed(2);
    document.getElementById('D2Value').innerText = parseFloat(document.getElementById('D2').value).toFixed(2);
}

// Function to calculate color based on cosine formula
function color(x, A, B, C, D) {
    return [
        A[0] + B[0] * Math.cos(2 * Math.PI * (C[0] * x + D[0])),
        A[1] + B[1] * Math.cos(2 * Math.PI * (C[1] * x + D[1])),
        A[2] + B[2] * Math.cos(2 * Math.PI * (C[2] * x + D[2]))
    ];
}

// Function to draw the background gradient
function drawBackground(targetCanvas = canvas) {
    const {
        A,
        B,
        C,
        D
    } = parseSliders();
    const targetCtx = targetCanvas.getContext('2d');
    let imageData = targetCtx.createImageData(targetCanvas.width, targetCanvas.height);

    for (let x = 0; x < targetCanvas.width; x++) {
        let t = x / targetCanvas.width;
        let [r, g, b] = color(t, A, B, C, D);

        for (let y = 0; y < targetCanvas.height; y++) {
            let index = (y * targetCanvas.width + x) * 4;
            imageData.data[index + 0] = r; // Red
            imageData.data[index + 1] = g; // Green
            imageData.data[index + 2] = b; // Blue
            imageData.data[index + 3] = 255; // Alpha
        }
    }

    targetCtx.putImageData(imageData, 0, 0);
}

// Function to draw the RGB curves
function drawCurves() {
    const {
        A,
        B,
        C,
        D
    } = parseSliders();
    ctx.lineWidth = 2; // Set the line width for better visibility

    // Draw Red Curve
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    for (let x = 0; x < canvas.width; x++) {
        let t = x / canvas.width;
        let r = A[0] + B[0] * Math.cos(2 * Math.PI * (C[0] * t + D[0]));
        let y = canvas.height / 2 - (r - 128); // Adjust curve height based on canvas size
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Draw Green Curve
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    for (let x = 0; x < canvas.width; x++) {
        let t = x / canvas.width;
        let g = A[1] + B[1] * Math.cos(2 * Math.PI * (C[1] * t + D[1]));
        let y = canvas.height / 2 - (g - 128);
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Draw Blue Curve
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    for (let x = 0; x < canvas.width; x++) {
        let t = x / canvas.width;
        let b = A[2] + B[2] * Math.cos(2 * Math.PI * (C[2] * t + D[2]));
        let y = canvas.height / 2 - (b - 128);
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

// Function to draw the canvas (background + curves)
function drawCanvas() {
    drawBackground();
    drawCurves();
}

// Function to generate random values for the sliders
function randomizeSliders() {
    // Randomize each slider
    document.getElementById('A0').value = Math.floor(Math.random() * 256);
    document.getElementById('A1').value = Math.floor(Math.random() * 256);
    document.getElementById('A2').value = Math.floor(Math.random() * 256);
    document.getElementById('B0').value = Math.floor(Math.random() * 256);
    document.getElementById('B1').value = Math.floor(Math.random() * 256);
    document.getElementById('B2').value = Math.floor(Math.random() * 256);
    document.getElementById('C0').value = (Math.random() * 5).toFixed(2);
    document.getElementById('C1').value = (Math.random() * 5).toFixed(2);
    document.getElementById('C2').value = (Math.random() * 5).toFixed(2);
    document.getElementById('D0').value = Math.random().toFixed(2);
    document.getElementById('D1').value = Math.random().toFixed(2);
    document.getElementById('D2').value = Math.random().toFixed(2);

    // Update slider display values and redraw canvas
    updateSliderValues();
    drawCanvas();
}

// Function to export the gradient as a high-resolution image
function exportGradient() {
    const exportCanvas = document.createElement('canvas');
    const resolutionMultiplier = 4; // Increase the resolution (e.g., 4x current resolution)
    exportCanvas.width = canvas.width * resolutionMultiplier;
    exportCanvas.height = canvas.height * resolutionMultiplier;

    drawBackground(exportCanvas);

    // Convert the canvas to an image and download it
    const link = document.createElement('a');
    link.href = exportCanvas.toDataURL('image/png');
    link.download = 'gradient.png';
    link.click();
}

// Event listeners for sliders to update canvas and display values in real-time
document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', () => {
        updateSliderValues();
        drawCanvas();
    });
});

// Event listener for the randomize button
document.getElementById('randomizeButton').addEventListener('click', randomizeSliders);

// Event listener for the export button
document.getElementById('exportButton').addEventListener('click', exportGradient);

// Initial draw and update slider values
updateSliderValues();
drawCanvas();