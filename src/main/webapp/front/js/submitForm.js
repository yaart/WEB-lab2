const form = document.getElementById("form");
form.addEventListener("submit", function(event)  {


    var xValue = getX();
    var yValue = getY();
    var rValue = getR();

    var validationResult = validateAllNums(xValue, yValue, rValue);

    console.log(validationResult.isAllValid, validationResult.message);

    if (!validationResult.isAllValid) {
        event.preventDefault();
        errorNotification(validationResult.message);
    }
});