from flask import Flask, render_template, request
from flask_compress import Compress
from gevent.pywsgi import WSGIServer

app = Flask(__name__)
compress = Compress()

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    http_server = WSGIServer(('0.0.0.0', 8080), app)
    http_server.serve_forever()