export function playNotification() {
    const audio = new Audio("/sounds/notification.mp3");

    audio.volume = 1;

    audio.addEventListener(
        "canplaythrough",
        () => {
            audio.play().catch(console.error);
        },
        { once: true }
    );
}