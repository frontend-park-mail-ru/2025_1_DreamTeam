export function set_event_click(button, callback) {
    button.addEventListener("click", callback);
}

export function blocking_click(element) {
    set_event_click(element, stop_propagation);
}

// Вызывается в blocking_click
export function stop_propagation(event) {
    event.stopPropagation();
}