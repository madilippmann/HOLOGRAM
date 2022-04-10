from audioop import reverse
from concurrent.futures import thread
from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from app.forms import CreatePostForm, EditPostForm
from app.models import db, Thread, Message, User
from app.api.utils import validation_errors_to_error_messages
from sqlalchemy import desc, or_
from flask_socketio import emit, send
from app.forms import CreateMessageForm


threads_routes = Blueprint('threads', __name__)

# ROUTES ##################################################################################


@threads_routes.route('/<int:threadId>/')
def get_thread(threadId):
    thread = Thread.query.get(threadId)
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
    threads_array.sort(key=lambda thread: thread.messages[-1].createdAt, reverse=True)

    # print("\n\n\n", [thread.messages[-1].createdAt for thread in threads_array], "\n\n\\n")

    threadPreviews = [{
        "threadId": thread.id,
        "threadName": thread.name,
        "preview": thread.messages[-1].content,
        "profileImage": thread.messages[-1].user.profileImageUrl
    }
        for thread in threads_array]

    return jsonify(threadPreviews)
