function showPopup(text, title, isError) {
    const popup = document.getElementById('graphPopup');
    const resultElement = document.getElementById('popupResult');
    const titleElement = document.getElementById('popupTitle');

    resultElement.textContent = text;
    titleElement.textContent = title;

    popup.className = !isError ? 'popup success' : 'popup fail';

    popup.style.display = 'block';
}

function hidePopup() {
    const popup = document.getElementById('graphPopup');
    popup.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.popup-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePopup);
    }

    const popup = document.getElementById('graphPopup');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                hidePopup();
            }
        });
    }
});

function errorNotification(text) {
    showPopup(text, "Ошибка", true);
}