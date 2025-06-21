document.addEventListener('DOMContentLoaded', () => {
    const symbolPlay = '⯈';
    const symbolPause = '❚ ❚';
    const files = ['Nature-8399','River-655','Waterfall-941','Wave-2737'];

    // generate thumbnails and add to <aside>
    const aside = document.querySelector('aside');
    const video = document.querySelector('video');

    files.forEach(file => {
        const img = document.createElement('img');
        img.src = `images/${file}.jpg`;
        img.alt = file;
        img.style.cursor = 'pointer';

    // when thumbnail is clicked, pause/play corresponding video
    img.addEventListener('click', () => {
        video.pause();
        video.src = `videos/${file}.mp4`;
        video.load();
        video.play();
        playPauseBtn.textContent = symbolPause;
    });

        aside.appendChild(img);
    });

    // stop button
    const stopBtn = document.getElementById('stop');
    const playPauseBtn = document.getElementById('play');
    const progress = document.getElementById('progress');
    const progressFilled = document.getElementById('progressFilled');

    stopBtn.addEventListener('click', () => {
        video.pause();
        video.currentTime = 0;
        playPauseBtn.textContent = symbolPlay;
        progressFilled.style.flexBasis = '0%';
    });

    // skip forward/back buttons
    const skipButtons = document.querySelectorAll('[data-skip]');
    skipButtons.forEach(button => {
        button.addEventListener('click', () => {
            const skipAmount = parseFloat(button.dataset.skip);
            video.currentTime += skipAmount;
        });
    });

    // play/pause button
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = symbolPause;
        } else {
            video.pause();
            playPauseBtn.textContent = symbolPlay;
        }
    });

    // update progress bar
    video.addEventListener('timeupdate', () => {
    if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.flexBasis = `${percent}%`;
        }
    });

    // volume slider
    const volumeSlider = document.getElementById('volume');

    volumeSlider.addEventListener('input', function() {
        video.volume = this.value;
    });
});