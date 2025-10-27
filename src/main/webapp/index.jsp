<%@ page import="yaart.s468198.beans.ResultBean" %>
<%@ page import="yaart.s468198.beans.ResultStorageBean" %>
<%@ page import="yaart.s468198.beans.UserValueBean" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="front/css/style.css">
    <link rel="icon" type="image/x-icon" href="front/images/favicon.ico">
    <title>По заветам ВТ</title>
    <style>

    </style>
</head>
<body>
<%
    // Логика восстановления сессии
    UserValueBean lastValues = (UserValueBean) session.getAttribute("lastUserValues");

    String lastX = (lastValues != null) ? String.format("%.1f", lastValues.getX()).replace(',', '.') : "";
    String lastY = (lastValues != null) ? String.format("%.3f", lastValues.getY()).replace(',', '.') : "";
    String lastR = (lastValues != null) ? String.format("%.0f", lastValues.getR()).replace(',', '.') : "";
%>
<div class="header">
    <div class="part" id="namepart">Ясаков Артем Андреевич</div>
    <div class="part" id="labnamepart">Лабораторная работа 2</div>
    <div class="part" id="variantpart">Вариант: 1722</div>
</div>

<div class="content">
    <div class="container">
        <form id="form" action="${pageContext.request.contextPath}/controller" method="POST">
            <label>Выберите значение X:</label>
            <div class="x-buttons">
                <button type="button" onclick="setX(-2, this)">-2</button>
                <button type="button" onclick="setX(-1.5, this)">-1.5</button>
                <button type="button" onclick="setX(-1, this)">-1</button>
                <button type="button" onclick="setX(-0.5, this)">-0.5</button>
                <button type="button" onclick="setX(0, this)">0</button>
                <button type="button" onclick="setX(0.5, this)">0.5</button>
                <button type="button" onclick="setX(1, this)">1</button>
                <button type="button" onclick="setX(1.5, this)">1.5</button>
                <button type="button" onclick="setX(2, this)">2</button>
            </div>
            <input type="hidden" id="xvalue" name="xvalue" required value="<%= lastX %>">

            <label>Введите Y:
                <input type="text" name="yvalue" id="yvalue" placeholder="от -5 до 5" value="<%= lastY %>">
            </label> <br>
            <label>Введите R:
                <input type="text" name="rvalue" id="rvalue" placeholder="от 2 до 5" value="<%= lastR %>" oninput="handleRChange()">
            </label> <br>
            <input type="submit" value="Отправить">
        </form>
    </div>

    <script>
        let selectedButton = null;

        function setX(value, button) {
            if (selectedButton) {
                selectedButton.classList.remove('selected');
            }
            button.classList.add('selected');
            selectedButton = button;
            document.getElementById('xvalue').value = value;
        }
    </script>

    <div class="container">
        <canvas id="graph"> </canvas>
    </div>

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

            </tbody>
        </table>
    </div>
</div>

<div id="graphPopup" class="popup">
    <div class="popup-content">
        <span class="popup-close">&times;</span>
        <p><span id="popupTitle"></span></p>
        <p><span id="popupResult"></span></p>
    </div>
</div>
<script>
    window.dots = [
        <%
            ArrayList<ResultBean> results = new ArrayList<>();
            Object storage = session.getAttribute("resultStorage");
            if (storage != null && storage instanceof ResultStorageBean) {
                ResultStorageBean resultStorage = (ResultStorageBean) storage;
                results = resultStorage.getResultList();
            }
            for (ResultBean res: results) {
        %>
        {
            r: <%= res.getUserValueBean().getR() %>,
            x: <%= res.getUserValueBean().getX() %>,
            y: <%= res.getUserValueBean().getY() %>,
            isHit: <%= res.getHit()%>,
            startTime: "<%= res.getStartTime() != null ? res.getStartTime() : "" %>",
            execTime: "<%=String.format("%.4f",(res.getExecutionTime()/1_000_000.0)).replace(',', '.') %>"
        },
        <%
            }
        %>
    ]
</script>
<script src="front/js/notification.js"></script>
<script src="front/js/fillTable.js"></script>
<script src="front/js/validation.js"></script>
<script src="front/js/input.js"></script>
<script src="front/js/submitForm.js"></script>
<script src="front/js/graph.js"></script>
<script src="front/js/clickGraphHandler.js"></script>
<script src="front/js/drawDots.js"></script>
<script src="front/js/init.js"></script>
</body>
</html>