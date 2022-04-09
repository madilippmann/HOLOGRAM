from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import request, session
from .models import User
import os

if os.environ.get('FLASK_ENV') == 'production':
    origin = 'https://hologram--app.herokuapp.com'
else:
    origin = "*"


socketio = SocketIO(cors_allowed_origins="*", logger=True, engineio_logger=True)


@socketio.on('connect')
def test_connect(auth):
    # print(session, 'sess\n\n\n')
    # userId = session["_user_id"]
    # User.sids[userId] = request.sid
    # print(User.sids)

    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('message')
def handle_message(message):
    # print('\n\n\n\n\n\n', request.sid, message, '\n\n\n\n\n\n')
    # room = data['room']

    # print(User.sids)

    emit('message', message, broadcast=True)
    return None

# @socketio.on('on_join')
# def on_join(data):
#     handle = data['handle']
#     room = data['room']
#     join_room(room)
#     print('\n\n\n\nJOINING:', handle, room,'\n\n\n\n')
#     data = {
#         ['content']: f"{handle} has entered the room."
#     }

#     send(data, to=room)

# @socketio.on('on_leave')
# def on_leave(data):
#     handle = data['handle']
#     room = data['room']

#     print('\n\n\n\nLEAVING:', handle, room,'\n\n\n\n')
#     leave_room(room)
#     emit(handle + ' has left the room.', to=room)




# # handle chat messages
# @socketio.on('connect')
# def on_connect():
#     print('\n\n\n\n\n\n\n\nuser connected\n\n\n\n\n\n\n')
#     retrieve_active_users()


# def retrieve_active_users():
#     emit('retrieve_active_users', broadcast=True)


# @socketio.on('activate_user')
# def on_active_user(data):
#     user = data.get('username')
#     emit('user_activated', {'user': user}, broadcast=True)


# @socketio.on('deactivate_user')
# def on_inactive_user(data):
#     user = data.get('username')
#     emit('user_deactivated', {'user': user}, broadcast=True)


# @socketio.on('join_room')
# def on_join(data):
#     room = data['room']
#     print('joinnning hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
#     join_room(room)
#     emit('open_room', {'room': room}, broadcast=True)

# @socketio.on("leave_room")
# def leave(data):
#     print('leaving hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
#     leave_room(data['room'])

# @socketio.on('message')
# def on_chat_sent(data):
#     print('data issssss hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
#     room = data['room']
#     send({'id':data['id'],'dm_room_id': data['dm_room_id'] , 'channel_id':data['channel_id'], 'content': data['content'], 'created_at': data['created_at'], 'room':data['room'], 'sender_username': data['sender_username'], 'sender_profile_picture': data['sender_profile_picture'] }, room=data['room'],)
