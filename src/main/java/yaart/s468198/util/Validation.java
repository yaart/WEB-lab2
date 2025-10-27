package yaart.s468198.util;

import jakarta.servlet.http.HttpServletRequest;
import yaart.s468198.beans.UserValueBean;

public class Validation {
    private HttpServletRequest request;
    private String xValue;
    private String yValue;
    private String rValue;

    public Validation(HttpServletRequest req) {
        this.request = req;
    }

    public UserValueBean getUserValueBean() {
        UserValueBean userValueBean = new UserValueBean();

        userValueBean.setX(getDoubleValue(xValue));
        userValueBean.setY(getDoubleValue(yValue));
        userValueBean.setR(getDoubleValue(rValue));

        return userValueBean;
    }

    private Double getDoubleValue(String value) {
        if(value==null) {
            return null;
        }

        value = value.replace(",",".");
        return Double.valueOf(value);
    }

    private boolean setValues() {
        try {
            this.xValue = request.getParameter("xvalue");
            this.yValue = request.getParameter("yvalue");
            this.rValue = request.getParameter("rvalue");
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public ValidationResult validateForAllNums() {
        boolean setResult = setValues();

        if(!setResult) {
            return new ValidationResult(false, "Тело запроса содержит не все нужные параметры");
        }

        ValidationResult[] validations = {
                validateValue(xValue, "X", -2, 2),
                validateValue(yValue, "Y", -5, 5),
                validateValue(rValue, "R", 2, 5)
        };

        for (ValidationResult result : validations) {
            if (!result.isValid()) {
                return result;
            }
        }
        return new ValidationResult(true, "");
    }

    private ValidationResult validateValue(String value, String valueName, double minValue, double maxValue) {
        if(value.isEmpty() || valueName.isEmpty()) {
            return new ValidationResult(false, String.format("%s имеет пустое значение", valueName));
        }

        Double numValue;
        try {
            numValue = getDoubleValue(value);
        } catch (NumberFormatException e) {
            return new ValidationResult(false, String.format("%s должно быть вещественным числом с максимум 3 знаками после запятой", valueName));
        }

        value = value.replace(",",".");

        if (value.contains(".")) {
            String decimalPart = value.split("\\.")[1];
            if (decimalPart.length() > 3) {
                return new ValidationResult(false, String.format("%s должно иметь максимум 3 знаками после запятой", valueName));
            }
        }

        if (numValue < minValue || numValue > maxValue) {
            return new ValidationResult(false, String.format("%s должно быть в границах между %f и %f", valueName, minValue, maxValue));
        }

        return new ValidationResult(true, "");
    }
}