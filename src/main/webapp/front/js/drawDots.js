function drawDots() {
    if (!dots || dots.length === 0) {
        return;
    }

    let currentR = parseFloat(getR());

    if (isNaN(currentR) || currentR <= 0) {
        return;
    }

    dots.forEach(dot => {
        let x = dot.x;
        let y = dot.y;

        let graphX = x * rLength / currentR + centerX
        let graphY = -y * rLength / currentR + centerY;

        ctx.beginPath();
        ctx.arc(graphX, graphY, 4, 0, Math.PI * 2);
        ctx.fillStyle = dot.isHit ? 'green' : 'red';
        ctx.fill();
        ctx.stroke();
    });
}