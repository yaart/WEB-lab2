const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const graphOffset = 20;

const rScaleWidth = 5;
const lineWidth = 2;

const graphWidth = canvas.width / 2 - graphOffset;
const rLength = graphWidth - 20;


function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setTextSettings();

    drawFigures();

    drawAxes();
    drawAxesLabels();

    drawRScale();
    drawRLables();
}

function drawFigures() {
    ctx.fillStyle = 'rgba(0, 100, 255, 0.5)';
    drawRect();
    drawTriangle();
    drawQuartercircle();
    ctx.fillStyle = '#000';
}

function drawRect() {
    ctx.beginPath();
    ctx.rect(centerX + rLength, centerY - rLength, -rLength, rLength)
    ctx.fill();
}

function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + rLength, centerY);
    ctx.lineTo(centerX, centerY + rLength/2);
    ctx.fill();
}

function drawQuartercircle() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, rLength, Math.PI, 1.5*Math.PI, false);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
}

function drawRLine(x, y, up) {
    ctx.beginPath();
    if (up) {
        ctx.moveTo(x + rScaleWidth, y);
        ctx.lineTo(x - rScaleWidth, y);
    }
    else {
        ctx.moveTo(x, y + rScaleWidth);
        ctx.lineTo(x, y - rScaleWidth);
    }
    ctx.stroke();
}



function drawRScale() {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    drawRLine(centerX - rLength, centerY, false);
    drawRLine(centerX + rLength, centerY, false);


    drawRLine(centerX, centerY - rLength, true);
    drawRLine(centerX, centerY + rLength, true);


    drawRLine(centerX - rLength / 2, centerY, false);
    drawRLine(centerX + rLength / 2, centerY, false);


    drawRLine(centerX, centerY - rLength / 2, true);
    drawRLine(centerX, centerY + rLength / 2, true);

    ctx.stroke();
}

function drawRLables() {
    ctx.fillText('-R', centerX - graphWidth + 20, centerY + rScaleWidth * 3);
    ctx.fillText('R', centerX + rLength, centerY + rScaleWidth * 3);

    ctx.fillText('R', centerX + rScaleWidth * 3, centerY - graphWidth + 20);
    ctx.fillText('-R', centerX + rScaleWidth * 3, centerY + rLength);

    ctx.fillText('-R/2', centerX - rLength / 2, centerY + rScaleWidth * 3);
    ctx.fillText('R/2', centerX + rLength / 2, centerY + rScaleWidth * 3);

    ctx.fillText('R/2', centerX + rScaleWidth * 4, centerY - rLength / 2);
    ctx.fillText('-R/2', centerX + rScaleWidth * 4, centerY + rLength / 2);
}

function setTextSettings() {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
}

function drawAxes() {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(graphOffset, centerY);
    ctx.lineTo(canvas.width - graphOffset, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, canvas.height - graphOffset);
    ctx.lineTo(centerX, graphOffset);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 10 - graphOffset, centerY - 5);
    ctx.lineTo(canvas.width - graphOffset, centerY);
    ctx.lineTo(canvas.width - 10 - graphOffset, centerY + 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 5, 10 + graphOffset);
    ctx.lineTo(centerX, graphOffset);
    ctx.lineTo(centerX + 5, 10 + graphOffset);
    ctx.stroke();
}

function drawAxesLabels() {
    ctx.fillText('X', canvas.width - 10 - graphOffset, centerY - 15);
    ctx.fillText('Y', centerX + 15, 10 + graphOffset);
}

drawGraph();