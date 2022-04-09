from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import request, session, jsonify
from .models import User
import os

if os.environ.get('FLASK_ENV') == 'production':
    origin = 'https://hologram--app.herokuapp.com'
else:
    origin = "*"


socketio = SocketIO(cors_allowed_origins="*", logger=True, engineio_logger=True)

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
    print(data)
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







# @socketio.on('join_room')
# def on_join(data):
#     room = data['room']
#     join_room(room)
#     emit('open_room', {'room': room}, broadcast=True)

# @socketio.on("leave_room")
# def leave(data):
#     leave_room(data['room'])

# @socketio.on('message')
# def on_chat_sent(data):
#     room = data['room']
#     send({'id':data['id'],'dm_room_id': data['dm_room_id'] , 'channel_id':data['channel_id'], 'content': data['content'], 'created_at': data['created_at'], 'room':data['room'], 'sender_username': data['sender_username'], 'sender_profile_picture': data['sender_profile_picture'] }, room=data['room'],)
