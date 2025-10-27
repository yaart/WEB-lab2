canvas.addEventListener('click', function (e) {
    const canvasRect = canvas.getBoundingClientRect();
    const xClick = e.clientX - canvasRect.left;
    const yClick = e.clientY - canvasRect.top;

    var r = getR();

    var resultR = checkR(r);

    if (!resultR.isValid) {
        errorNotification(resultR.message);
        return;
    }

    var { x, y } = getCanvasCoords(xClick, yClick, r);

    x = Math.round(x * 2) / 2;
    x = x.toFixed(1);
    y = y.toFixed(3);

    const resultX = checkX(x.toString());

    if(!resultX.isValid) {
        errorNotification(resultX.message);
        return;
    }


    document.getElementById('xvalue').value = x;
    document.getElementById('yvalue').value = y;
    document.getElementById('form').requestSubmit();
});

function getCanvasCoords(xClick, yClick, r) {
    xPlot = (xClick - centerX )* r / rLength;
    yPlot = -(yClick - centerY) * r / rLength;

    return { x: xPlot, y: yPlot};
}