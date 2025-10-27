function checkStringFormat(rawValue) {
    rawValue = rawValue.replace(',', '.');
    const regex = /^-?\d*\.?\d+$/;
    return regex.test(rawValue);
}

function checkForNull(value) {
    return !(value === '' || value === null || value === undefined);
}

function validateInput(variableName, value, min, max, decimalPlaces = 3, isInteger = false) {
    if (!checkForNull(value)) {
        return {
            isValid: false,
            message: `Значение ${variableName} не может быть пустым`,
            correctedValue: ''
        };
    }

    if (!checkStringFormat(value)) {
        return {
            isValid: false,
            message: `Значение ${variableName} должно быть числом`,
            correctedValue: ''
        };
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        return {
            isValid: false,
            message: `Неверный формат числа для значения ${variableName}`,
            correctedValue: ''
        };
    }

    if (isInteger && !Number.isInteger(numValue)) {
        return {
            isValid: false,
            message: `Значение ${variableName} должно быть целым числом`,
            correctedValue: ''
        };
    }

    const parts = value.replace(',', '.').split('.');
    if (parts.length > 1 && parts[1].length > decimalPlaces) {
        return {
            isValid: false,
            message: `Слишком много знаков после запятой для ${variableName}. Максимум: ${decimalPlaces}`,
            correctedValue: ''
        };
    }

    if (numValue < min || numValue > max) {
        return {
            isValid: false,
            message: `Значение ${variableName} должно быть от ${min} до ${max}`,
            correctedValue: ''
        };
    }

    return {
        isValid: true,
        message: 'OK',
        correctedValue: numValue
    };
}

function checkX(xRawValue) {
    const result = validateInput('X', xRawValue, -2, 2, 1, false);

    if (result.isValid) {
        const step = 0.5;
        const normalizedValue = Math.round(result.correctedValue / step) * step;
        if (Math.abs(result.correctedValue - normalizedValue) > 0.001) {
            return {
                isValid: false,
                message: `X должен быть кратен 0.5 (допустимые значения: -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2)`,
                correctedValue: ''
            };
        }
    }

    return result;
}

function checkY(yRawValue) {
    return validateInput('Y', yRawValue, -5, 5, 3, false);
}

function checkR(rRawValue) {
    return validateInput('R', rRawValue, 2, 5, 0, true);
}

function validateAllNums(xValue, yValue, rValue) {
    const xResult = checkX(xValue);
    const yResult = checkY(yValue);
    const rResult = checkR(rValue);

    const errors = [];
    if (!xResult.isValid) errors.push(xResult.message);
    if (!yResult.isValid) errors.push(yResult.message);
    if (!rResult.isValid) errors.push(rResult.message);

    return {
        isAllValid: errors.length === 0,
        message: errors.join('\n'),
        values: {
            x: xResult.correctedValue,
            y: yResult.correctedValue,
            r: rResult.correctedValue
        }
    };
}