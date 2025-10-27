<%@ page import="yaart.s468198.beans.ResultBean" %>
<%@ page import="yaart.s468198.beans.ResultStorageBean" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="static/css/style.css">
    <link rel="icon" type="image/x-icon" href="static/images/favicon.ico">
    <title>Magic</title>
</head>
<body>
<!-- Шапка -->
<div class="header">
    <div class="part" id="namepart">Ясаков Артем Андреевич</div>
    <div class="part" id="labnamepart">Лабораторная работа 2</div>
    <div class="part" id="variantpart">Вариант: 1722</div>
</div>

<!-- Контент -->
<div class="content">
    <div class="container">
        <table>
            <caption>
                Результаты попаданий
            </caption>
            <thead>
            <tr>
                <th scope="col">R</th>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">Попадание</th>
                <th scope="col">Время начала</th>
                <th scope="col">Время выполнения, с.</th>
            </tr>
            </thead>
            <tbody>
            <%
                @SuppressWarnings("unchecked")
                ResultStorageBean storage = (ResultStorageBean) session.getAttribute("resultStorage");
                ArrayList<ResultBean> results = (storage != null) ? storage.getResultList() : new ArrayList<>();
                if (results != null && !results.isEmpty()) {
                    for (ResultBean res: results) {
            %>
            <tr>
                <td><%= res.getUserValueBean().getR() %></td>
                <td><%= res.getUserValueBean().getX() %></td>
                <td><%= res.getUserValueBean().getY() %></td>
                <td><%= res.getHit() ? "Попал" : "Мимо" %></td>
                <td><%= res.getStartTime() != null ? res.getStartTime() : "" %></td>
                <td><%=String.format("%.4f",(res.getExecutionTime()/1_000_000.0)) %></td>
            </tr>
            <%
                    }
                }
            %>
            </tbody>
        </table>

        <a href="${pageContext.request.contextPath}/index.jsp">
            <button id="back-button">Вернуться назад</button>
        </a>
    </div>
</div>

</body>
</html>