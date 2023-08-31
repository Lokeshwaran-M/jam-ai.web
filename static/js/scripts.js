async function transcribeAudio(audioData) {
  // Send the audio data to the server
  const response = await fetch("/api/audio", {
    method: "POST",
    body: audioData,
  });

  if (!response.ok) {
    throw new Error("Failed to send audio data to server.");
  }

  // Wait for the server to transcribe the audio
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Get the transcription from the server
  const transcriptionResponse = await fetch("/api/transcription");
  if (!transcriptionResponse.ok) {
    throw new Error("Failed to get transcription from server.");
  }
  const transcription = await transcriptionResponse.json();

  return transcription.text;
}

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const chunks = [];

  mediaRecorder.addEventListener("dataavailable", (event) => {
    chunks.push(event.data);
  });

  mediaRecorder.addEventListener("stop", async () => {
    const audioBlob = new Blob(chunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = audioUrl;

    const audioText = await transcribeAudio(audioBlob);
    const transcriptionElement = document.getElementById("transcription");
    transcriptionElement.innerText = audioText;
  });

  mediaRecorder.start();
}

function stopRecording() {
  mediaRecorder.stop();
}

function transcribe() {
  const audioBlob = new Blob(chunks, { type: "audio/wav" });
  transcribeAudio(audioBlob)
    .then((text) => {
      const transcriptionElement = document.getElementById("transcription");
      transcriptionElement.innerText = text;
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to transcribe audio.");
    });
}
