from audioop import reverse
from concurrent.futures import thread
from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.forms import CreatePostForm, EditPostForm
from app.models import db, Thread, Message, User, Message
from app.api.utils import validation_errors_to_error_messages
# from sqlalchemy import in_
from flask_socketio import emit, send
from app.forms import CreateMessageForm


threads_routes = Blueprint('threads', __name__)

# ROUTES ##################################################################################


@threads_routes.route('/<int:threadId>/')
def get_thread(threadId):
    thread = Thread.query.get(threadId)
    return jsonify(thread.to_dict())


@threads_routes.route('/', methods=['POST'])
def create_thread():
    print('INSIDE \n\n\n\n\n')
    sessionUserId = int(session['_user_id'])
    users = request.get_json()
    if len(users) == 0:
        return jsonify('error: must send users to add to thread')

    # PLAN:
    # query for all users that are going to be in the thread
    # (OPTIONAL?) check in db for a thread that already has all of the specified users
    # make new thread with a name of the first names of the users in the thread
    # append each user to the 'users' property of the new thread
    # db.session.commit()
    # return the newly created thread
    # CHECK
    # check the users property of the thread after adding the thread to every user

    users = User.query.filter(User.id.in_([sessionUserId, *users])).all()

    thread_name = ""
    for user in users:
        thread_name += f"{user.firstName}, "

    thread = Thread(name=thread_name[0:-2])
    db.session.add(thread)
    db.session.commit()
    sessionUser = [user for user in users if user.id == sessionUserId][0]

    # this message prevents threadPreviews route from erroring out due to no messages (list index out of range)
    initial_message = Message(
        threadId=thread.id,
        userId=sessionUserId,
        content=f"HOLOGRAM: {sessionUser.firstName} {sessionUser.lastName} started a new message thread with you. Say hi!"
    )
    db.session.add(initial_message)

    for user in users:
        thread.users.append(user)
    db.session.commit()

    print('\n\n\n THREAD', thread.to_dict(), '\n\n\n')
    return jsonify(thread.to_dict())


@threads_routes.route('/<int:threadId>/', methods=["POST"])
def create_message(threadId):
    form = CreateMessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = {
            "threadId": threadId,
            "userId": session['_user_id'],
            "content": form.data["content"],
        }

        message = Message(**data)
        db.session.add(message)
        db.session.commit()
        return jsonify(message.to_dict_lite())

    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@threads_routes.route('/threadPreviews/')
def get_thread_previews():
    sessionUserId = int(session['_user_id'])

    user = User.query.get(sessionUserId)

    threads_array = [thread for thread in user.threads]
    threads_array.sort(
        key=lambda thread: thread.messages[-1].createdAt, reverse=True)
    threadPreviews = [{
        "threadId": thread.id,
        "threadName": thread.name,
        "preview": thread.messages[-1].content,
        "profileImage": thread.messages[-1].user.profileImageUrl
    } for thread in threads_array]

    return jsonify(threadPreviews)
