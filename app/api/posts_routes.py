from flask import Blueprint, render_template, redirect, url_for
# from app.froms import PostForm
from app.models import db, Post


bp = Blueprint('posts', __name__, url_prefix="/posts")


@bp.route('/')
def get_posts():
  posts = Post.query.all()
  # CHECK do posts need to be converted to json?
  return posts
  
@bp.route('/<int:postId>')
def get_post():
  # get the postId from params and query DB, send back as json
  pass
  
@bp.route('/', methods=["POST"])
def create_post():
  # get the post from request body
  # create instance of post passing in info
  # save to session and send the new post from db back 
  pass

@bp.route('/<int:postId>', methods=["PUT"])
def edit_post():
  # get post from req body
  # query db for the existing post
  # set all properties equal to request's post
  # save to session
  # send back new post
  pass

@bp.route('/<int:postId>', methods=["DELETE"])
def delete_post():
  # get userId from the request body
  # query for post in db with postId
  # ^ post = Post.query.get(postId)
  # check if the post's userId == userId in body
  # delete the post 
  # ^ db.session.delete(post)
  # send back the postId and userId as json
  pass
