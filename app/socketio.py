from flask_socketio import SocketIO, emit, send, join_room, leave_room
import os

if os.environ.get('FLASK_ENV') == 'production':
    origin = 'https://hologram--app.herokuapp.com'
else:
    origin = "*"


socketio = SocketIO(cors_allowed_origins=origin, logger=True)



@socketio.on('connect', namespace='/messages')
def test_connect(auth):
    # print(session, 'sess\n\n\n')
    # userId = session["_user_id"]
    # User.sids[userId] = request.sid
    # print(User.sids)

    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('message', namespace='/messages')
def handle_message(message):
    print('\n\n\n', request.sid, '\n\n\n')

    print(User.sids)

    emit('message', message, broadcast=True)
    return None

@socketio.on('join', namespace='/messages')
def on_join(data):
    handle = data['handle']
    room = data['room']
    join_room(room)
    print('\n\n\n\nJOINING:', handle, room,'\n\n\n\n')

    send(handle + ' has entered the room.', to=room)

@socketio.on('leave', namespace='/messages')
def on_leave(data):
    handle = data['handle']
    room = data['room']

    print('\n\n\n\nLEAVING:', handle, room,'\n\n\n\n')
    leave_room(room)
    emit(handle + ' has left the room.', to=room)
