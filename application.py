import os

from flask import Flask, session, render_template, request
from flask_session import Session
from flask_socketio import SocketIO, emit

app = Flask(__name__)

# COnfigure secret key
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

socketio = SocketIO(app)
Session(app)

@app.route("/")
def index():
    nickname = session.get('nickname')
    if nickname is None:
        nickname = 'Guest User'
    return render_template('index.html', nickname=nickname)

@app.route("/store-nickname", methods=["POST"])
def store_nickname():
    nickname = request.form.get('nickname')
    session['nickname'] = nickname
    return nickname