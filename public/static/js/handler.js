export function setEventClick(button, callback) {
    button.addEventListener('click', callback);
}

export function blockingClick(element) {
    setEventClick(element, stopPropagation);
}

// Вызывается в blocking_click
export function stopPropagation(event) {
    event.stopPropagation();
}