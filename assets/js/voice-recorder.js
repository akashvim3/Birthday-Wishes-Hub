// ===== Voice Recorder Functionality =====
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let recordingTimer;
let recordingSeconds = 0;
let isRecording = false;

const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const playBtn = document.getElementById('playBtn');
const deleteBtn = document.getElementById('deleteBtn');
const timeDisplay = document.getElementById('timeDisplay');
const recordingStatus = document.getElementById('recordingStatus');
const audioElement = document.getElementById('audioElement');
const audioPlayer = document.getElementById('audioPlayer');
const createAudioCardBtn = document.getElementById('createAudioCard');
const voiceRecipient = document.getElementById('voiceRecipient');
const displayRecipient = document.getElementById('displayRecipient');
const audioDuration = document.getElementById('audioDuration');
const downloadAudioBtn = document.getElementById('downloadAudioBtn');
const shareAudioBtn = document.getElementById('shareAudioBtn');

// Audio Visualizer
const canvas = document.getElementById('audioVisualizer');
const canvasCtx = canvas.getContext('2d');
let audioContext;
let analyser;
let dataArray;
let bufferLength;

// Initialize Audio Visualizer
function initVisualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
}

// Draw Visualizer
function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = '#e3f2fd';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        const gradient = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

// Start Recording
recordBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        initVisualizer();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        drawVisualizer();

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioUrl = URL.createObjectURL(audioBlob);
            audioElement.src = audioUrl;
            audioPlayer.style.display = 'block';

            playBtn.disabled = false;
            deleteBtn.disabled = false;
            downloadAudioBtn.disabled = false;
            shareAudioBtn.disabled = false;

            // Update duration display
            const duration = recordingSeconds;
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            audioDuration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };

        mediaRecorder.start();
        isRecording = true;
        recordingSeconds = 0;
        audioChunks = [];

        recordBtn.disabled = true;
        stopBtn.disabled = false;
        recordingStatus.textContent = 'Recording...';
        recordingStatus.style.color = '#f5576c';

        // Start timer
        recordingTimer = setInterval(() => {
            recordingSeconds++;
            const minutes = Math.floor(recordingSeconds / 60);
            const seconds = recordingSeconds % 60;
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);

    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Unable to access microphone. Please check your permissions.');
    }
});

// Stop Recording
stopBtn.addEventListener('click', () => {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;

        clearInterval(recordingTimer);

        recordBtn.disabled = false;
        stopBtn.disabled = true;
        recordingStatus.textContent = 'Recording Complete';
        recordingStatus.style.color = '#38ef7d';

        // Stop all audio tracks
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
});

// Play Recording
playBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
    } else {
        audioElement.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i><span>Play</span>';
    }
});

audioElement.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fas fa-play"></i><span>Play</span>';
});

// Delete Recording
deleteBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this recording?')) {
        audioElement.src = '';
        audioPlayer.style.display = 'none';
        audioChunks = [];
        recordingSeconds = 0;
        timeDisplay.textContent = '00:00';
        recordingStatus.textContent = 'Ready to Record';
        recordingStatus.style.color = '#6c757d';

        playBtn.disabled = true;
        deleteBtn.disabled = true;
        downloadAudioBtn.disabled = true;
        shareAudioBtn.disabled = true;
    }
});

// Update recipient name display
voiceRecipient.addEventListener('input', (e) => {
    const name = e.target.value || 'Someone Special';
    displayRecipient.textContent = name;
});

// Theme Selection
const audioThemes = document.querySelectorAll('.audio-theme');
audioThemes.forEach(theme => {
    theme.addEventListener('click', () => {
        audioThemes.forEach(t => t.classList.remove('selected'));
        theme.classList.add('selected');

        const selectedTheme = theme.getAttribute('data-theme');
        const audioCard = document.querySelector('.audio-card');
        audioCard.className = `audio-card ${selectedTheme}`;
    });
});

// Create Audio Card
createAudioCardBtn.addEventListener('click', () => {
    if (!audioBlob) {
        alert('Please record a voice message first!');
        return;
    }

    const recipient = voiceRecipient.value || 'Someone Special';
    alert(`Audio card created for ${recipient}! 🎉`);
});

// Download Audio
downloadAudioBtn.addEventListener('click', () => {
    if (audioUrl) {
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `birthday-voice-wish-${Date.now()}.wav`;
        link.click();
    }
});

// Share Audio
shareAudioBtn.addEventListener('click', () => {
    if (audioBlob) {
        const recipient = voiceRecipient.value || 'someone special';
        const shareText = `Listen to my voice birthday wish for ${recipient}!`;

        if (navigator.share) {
            const file = new File([audioBlob], 'birthday-wish.wav', { type: 'audio/wav' });
            navigator.share({
                title: 'Birthday Voice Wish',
                text: shareText,
                files: [file]
            }).catch(err => console.log('Error sharing:', err));
        } else {
            alert('Share feature not supported on this browser. Use download instead!');
        }
    }
});
