document.addEventListener('DOMContentLoaded', function() {
    fillTableWithDots();
});

function fillTableWithDots() {
    const tableBody = document.querySelector('table tbody');

    tableBody.innerHTML = '';

    if (!dots || dots.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="6" style="text-align: center;">Нет данных</td>';
        tableBody.appendChild(emptyRow);
        return;
    }

    dots.forEach(dot => {
        const row = document.createElement('tr');

        const rCell = document.createElement('td');
        rCell.textContent = dot.r;

        const xCell = document.createElement('td');
        xCell.textContent = dot.x;

        const yCell = document.createElement('td');
        yCell.textContent = dot.y;

        const hitCell = document.createElement('td');
        hitCell.textContent = dot.isHit ? 'Попал' : 'Мимо';
        hitCell.className = dot.isHit ? 'hit' : 'miss';

        const timeCell = document.createElement('td');
        timeCell.textContent = dot.startTime;

        const execTimeCell = document.createElement('td');
        execTimeCell.textContent = dot.execTime;

        row.appendChild(rCell);
        row.appendChild(xCell);
        row.appendChild(yCell);
        row.appendChild(hitCell);
        row.appendChild(timeCell);
        row.appendChild(execTimeCell);

        tableBody.appendChild(row);
    });
}