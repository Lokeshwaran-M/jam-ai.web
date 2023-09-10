document.addEventListener('DOMContentLoaded', function () {
    const scanButton = document.getElementById('scanButton');
    const scannedDataDisplay = document.getElementById('scannedData');

    // Function to start the camera and scan QR codes
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            await video.play();

            const canvasElement = document.createElement('canvas');
            const canvas = canvasElement.getContext('2d');
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;
            video.width = video.videoWidth;
            video.height = video.videoHeight;

            const scan = async () => {
                canvas.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const imageData = canvas.getImageData(0, 0, video.videoWidth, video.videoHeight);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    scannedDataDisplay.textContent = code.data;
                }

                requestAnimationFrame(scan);
            };

            requestAnimationFrame(scan);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    // Add click event listener to the "Scan" button
    scanButton.addEventListener('click', () => {
        startCamera();
    });
});
