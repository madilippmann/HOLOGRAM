from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .postLikes import seed_postLikes, undo_postLikes
from .follows import seed_follows, undo_follows
from .directMessages import seed_directMessages, undo_directMessages
from .threads import seed_threads, undo_threads
from .users_threads import seed_users_threads, undo_users_threads

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_posts()
    seed_comments()
    seed_postLikes()
    seed_follows()
    seed_directMessages()
    seed_threads()
    seed_users_threads()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_directMessages()
    undo_threads()
    undo_users_threads()
    undo_follows()
    undo_postLikes()
    undo_comments()
    undo_posts()
    undo_users()
    # Add other undo functions here
