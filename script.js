// Check jika sudah login; jika belum, redirect ke login
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const downloadBtn = document.getElementById('downloadBtn');
const retryBtn = document.getElementById('retryBtn');
const logoutBtn = document.getElementById('logoutBtn'); // Tombol logout

let mediaStream = null;
let capturedImage = null;

// Event logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    // Hentikan stream jika sedang berjalan
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
    window.location.href = 'login.html';
});

// Fungsi untuk memulai kamera
startBtn.addEventListener('click', async () => {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 320, height: 240 } 
        });
        video.srcObject = mediaStream;
        startBtn.disabled = true;
        captureBtn.disabled = false;
        startBtn.textContent = 'Kamera Berjalan';
    } catch (err) {
        alert('Gagal mengakses kamera: ' + err.message);
    }
});

// Fungsi untuk mengambil foto
captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    capturedImage = canvas.toDataURL('image/png');
    video.style.display = 'none'; // Sembunyikan video setelah capture
    canvas.style.display = 'block';
    captureBtn.disabled = true;
    downloadBtn.style.display = 'inline-block';
    retryBtn.style.display = 'inline-block'; // Tampilkan tombol ulangi
});

// Fungsi untuk unduh foto
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'photo-booth-pink.png';
    link.href = capturedImage;
    link.click();
});

// Fungsi menggunakan foto untuk diedit


// Fungsi untuk ulangi foto (reset tampilan ke kamera)
retryBtn.addEventListener('click', () => {
    video.style.display = 'block'; // Tampilkan kembali video
    canvas.style.display = 'none'; // Sembunyikan canvas
    captureBtn.disabled = false; // Aktifkan tombol capture
    downloadBtn.style.display = 'none'; // Sembunyikan unduh
    retryBtn.style.display = 'none'; // Sembunyikan tombol ulangi
    capturedImage = null; // Reset gambar yang diambil (opsional, untuk clean state)
});

// Hentikan stream saat halaman ditutup
window.addEventListener('beforeunload', () => {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
});

