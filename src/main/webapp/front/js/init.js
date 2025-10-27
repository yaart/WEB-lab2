function handleRChange() {
    drawGraph();

    const rValue = getR();
    const validationResult = checkR(rValue);

    if (validationResult.isValid) {
        drawDots();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const lastXValue = document.getElementById('xvalue').value;
    if (lastXValue) {
        const selectedButton = Array.from(document.querySelectorAll('.x-buttons button'))
            .find(button => button.textContent.trim() === lastXValue);

        if (selectedButton) {
            setX(parseFloat(lastXValue), selectedButton);
        }
    }

    fillTableWithDots();
    drawGraph();
    drawDots();
});