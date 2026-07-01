let audio;

export function playReadySound() {
    if (!audio) {
        audio = new Audio("/sounds/ready.mp3");
        audio.volume = 1;
    }

    audio.currentTime = 0;

    audio.play().catch(console.error);
}