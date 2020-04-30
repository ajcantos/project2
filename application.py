import os

from flask import Flask, session, render_template, request, jsonify
from flask_session import Session
from flask_socketio import SocketIO, emit

app = Flask(__name__)

# Configure secret key
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

socketio = SocketIO(app)
Session(app)

class Channel:
    def __init__(self, name):
        self.name = name
        self.users = []
        self.messages = []

    # def add_user(self, user):
    #     if user not in self.users:     
    #         self.users.append(user)

    def add_message(self, user, message):                                                                                                                                                                                                                                                           
        message_tuple = (user, message)
        self.messages.append(message_tuple)


channels = []

# def add_user_to_channel(channel_name, channel_user):
#     for channel in channels:
#         if channel.name == channel_name:
#             channel.add_user(channel_user)
#             printf(f'User {channel_user} added to channel {channel_name}')
#     return

@app.route("/")
def index():
    nickname = session.get('nickname')
    if nickname is None:
        nickname = 'Guest User'
    return render_template('index.html', nickname=nickname, channels=channels)

@app.route("/store-nickname", methods=["POST"])
def store_nickname():
    nickname = request.form.get('nickname')
    session['nickname'] = nickname
    return jsonify({"success": True})

@app.route("/add-channel", methods=["POST"])
def add_channel():
    channel_name = request.form.get('channel_name')
    new_channel = Channel(channel_name)
    channels.append(new_channel)
    return jsonify({"success": True})

# @app.route("/add-user", methods=["POST"])
# def add_user():
#     channel_name = request.form.get('channel_name')
#     channel_user = request.form.get('channel_user')
#     add_user_to_channel(channel_name, channel_user)
#     return jsonify({"success": True})