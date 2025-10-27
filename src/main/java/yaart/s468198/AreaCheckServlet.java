package yaart.s468198;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import yaart.s468198.beans.ResultBean;
import yaart.s468198.beans.ResultStorageBean;
import yaart.s468198.beans.UserValueBean;
import yaart.s468198.util.AreaCheckUtil;


import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet("areaChecker")
public class AreaCheckServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        long startTime = System.nanoTime();

        if(req.getAttribute("userValueBean") == null) {
            res.sendError(400, "Сервлет не получил нужные данные");
            return;
        }

        if(!(req.getAttribute("userValueBean") instanceof UserValueBean valueBean)) {
            res.sendError(400, "Сервлет не получил нужные данные");
            return;
        }

        AreaCheckUtil checker = new AreaCheckUtil(valueBean.getX(), valueBean.getY(), valueBean.getR());

        ResultBean resultBean = new ResultBean();

        resultBean.setUserValueBean(valueBean);
        resultBean.setHit(checker.isHit());
        resultBean.setExecutionTime(System.nanoTime() - startTime);
        resultBean.setStartTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));

        HttpSession session = req.getSession();
        ResultStorageBean storage = (ResultStorageBean) session.getAttribute("resultStorage");

        storage = storage == null ? new ResultStorageBean() : storage;

        storage.getResultList().add(resultBean);

        session.setAttribute("resultStorage", storage);
        res.sendRedirect(req.getContextPath()+"/result.jsp");
    }
}
