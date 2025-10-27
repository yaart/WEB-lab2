document.addEventListener('DOMContentLoaded', function() {
    drawDots();
});

function drawDots() {
    if (!dots || dots.length === 0) {
        return;
    }

    dots.forEach(dot => {
        let x = dot.x;
        let y = dot.y;
        let r = dot.r;

        let graphX = x * rLength / r + centerX
        let graphY = -y * rLength / r + centerY;

        ctx.beginPath();
        ctx.arc(graphX, graphY, 4, 0, Math.PI * 2);
        ctx.fillStyle = dot.isHit ? 'green' : 'red';
        ctx.fill();
        ctx.stroke();
    });
}