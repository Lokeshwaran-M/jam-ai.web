let stream;
let recorder;

const startRecording = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", blob);

    fetch("/audio", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Audio file uploaded successfully");
      })
      .catch((error) => {
        console.log(
          "There was a problem uploading the audio file:",
          error
        );
      });
  };

  recorder.start();
};

const stopRecording = () => {
  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());
};

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

startBtn.addEventListener("click", startRecording);
stopBtn.addEventListener("click", stopRecording);