package yaart.s468198;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import yaart.s468198.beans.UserValueBean; // <-- НУЖЕН ЭТОТ ИМПОРТ!
import yaart.s468198.util.Validation;
import yaart.s468198.util.ValidationResult;

import java.io.IOException;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        Validation validation = new Validation(req);

        ValidationResult result = validation.validateForAllNums();

        if(!result.isValid()) {
            res.sendError(HttpServletResponse.SC_BAD_REQUEST, result.errorMsg());
            return;
        }

        UserValueBean userValueBean = validation.getUserValueBean();

        req.setAttribute("userValueBean", userValueBean);

        req.getSession().setAttribute("lastUserValues", userValueBean);

        RequestDispatcher dispatcher = req.getRequestDispatcher("/areaChecker");
        dispatcher.forward(req, res);
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.sendRedirect(req.getContextPath());
    }
}