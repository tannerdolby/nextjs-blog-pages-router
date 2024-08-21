export function sendEmail(receiver, subject, message) {
    if (!receiver || !subject || !message) {
        return;
    }

    window.location.href = `mailto:${receiver}?subject=${subject}&body=${message}`;
}