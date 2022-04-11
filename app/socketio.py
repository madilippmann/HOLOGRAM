from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import request, session, jsonify
from .models import User
import os

if os.environ.get('FLASK_ENV') == 'production':
    origins = ['https://hologram--app.herokuapp.com', 'http://hologram--app.herokuapp.com']
else:
    origins = "*"



socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)


# CONNECTION STUFF
@socketio.on('connect')
def test_connect(auth):
    print('\n\n INSIDE OF CONNECT \n\n')
    emit('my_response', broadcast=True)

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


# MESSAGE
@socketio.on('message')
def handle_message(data):
    print("\n\n\n NEW MESSAGE: ", data, "\n\n\n")
    send(data, room=data["room"])


# ROOM STUFF
@socketio.on('on_join')
def on_join(data):
    handle = data['handle']
    room = data['room']
    print('\n\n\n\n', 'HANDLE', handle, 'JOINING: ', room,'\n\n\n\n')
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)

@socketio.on('on_leave')
def on_leave(data):
    handle = data['handle']
    room = data['room']
    print('\n\n\n\n', 'HANDLE', handle, 'LEAVING: ', room,'\n\n\n\n')
    leave_room(room)
    emit(handle + ' has left the room.', to=room)
