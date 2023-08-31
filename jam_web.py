import datetime
import os
from flask import Flask, render_template, request, jsonify
import soundfile as sf
from listen import jam_gpt


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/audio', methods=['POST'])
def audio_api():
    # GET request
    if request.method == 'GET':
        message = {'jamRes': 'test output from jam'}
        return jsonify(message)  # serialize and use JSON headers
    # POST request
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file provided', 400

        audio_file = request.files['file']

        # # Do something with the audio data, e.g. save it to disk
        if not os.path.exists("./audios"):
            os.makedirs("./audios")
        current_time = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
        path = f'audios/au-{current_time}.wav'
        audio_file.save(path)
        res = jam_gpt(path)
        res = {"res": f"{res}"}
        return jsonify({"res": f"{res}"}), 200


@app.route("/get-res", methods=['GET'])
def res_api():
    return "hi"


if __name__ == '__main__':
    app.run(debug=True)
