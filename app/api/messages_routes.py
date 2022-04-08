from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.forms import CreatePostForm, EditPostForm
from app.models import db, Post, User
from app.api.utils import validation_errors_to_error_messages
from sqlalchemy import desc, or_
from flask_socketio import SocketIO
import os

from app.forms import CreateMessageForm

messages_routes = Blueprint('messsages', __name__)

if os.environ.get('FLASK_ENV') == 'production':
    origin = 'https://hologram--app.herokuapp.com'
else:
    origin = "*"


socketio = SocketIO(cors_allowed_origins=origin)

# ROUTES ##################################################################################
@messages_routes.route('/')
def get_threads():
    sessionUserId = session['__user_id']
    return

@messages_routes.route('/', methods=['POST'])
def create_thread():
    new
    return



@messages_routes.route('/:threadId/', methods=['POST'])
def create_message(threadId):

    form = CreateMessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = {
            "userId": session['_user_id'],
            "threadId": form.data["caption"],
            "content": form.data["content"],
        }

        message = Message(**data)
        db.session.add(message)
        db.session.commit()
        return jsonify(message.to_dict())

    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@messages_routes.route('/:threadId/')
def create_message(threadId):
    id = int(session['_user_id'])

    message = request.get_json(force=True)

    print('\n\n\n\n\n', message, '\n\n\n')

    return jsonify(posts)




# SOCKETS ##################################################################################

@socketio.on('message')
def handle_message(message):
    send(message)


# @socketio.on('join')
# def on_join(data):
#     username = data['username']
#     room = data['room']
#     join_room(room)
#     send(username + ' has entered the room.', to=room)

# @socketio.on('leave')
# def on_leave(data):
#     username = data['username']
#     room = data['room']
#     leave_room(room)
#     send(username + ' has left the room.', to=room)
