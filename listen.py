import os


import whisper
model = whisper.load_model("base.en")


def jam_gpt(au_path):
    pmt = model.transcribe(au_path)
    os.remove(au_path)
    pmt = pmt["text"]
    # jam_gpt model is still under development
    res = f"cmd : {pmt}"
    return res
