import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.posts_routes import posts_routes
from .api.comments_routes import comments_routes
from .api.postLikes_routes import postLikes_routes
from .api.follows_routes import follows_routes
from .api.s3_routes import s3_routes
from .api.threads_routes import threads_routes
from .api.search_routes import search_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(posts_routes, url_prefix='/api/posts')
app.register_blueprint(comments_routes, url_prefix='/api/posts')
app.register_blueprint(postLikes_routes, url_prefix='/api/posts')
app.register_blueprint(follows_routes, url_prefix='/api/follow')
app.register_blueprint(s3_routes, url_prefix='/api/s3')
app.register_blueprint(threads_routes, url_prefix='/api/threads')

app.register_blueprint(search_routes, url_prefix='/api/search')

db.init_app(app)
Migrate(app, db)

if os.environ.get('FLASK_ENV') == 'production':
    origin = 'https://hologram--app.herokuapp.com'
else:
    origin = "*"


socketio = SocketIO(app, cors_allowed_origins=origin)

# Application Security
CORS(app)

# SOCKETS

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







# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')



if __name__ == '__main__':
    socketio.run(app)
