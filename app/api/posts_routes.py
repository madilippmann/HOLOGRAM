from flask import Blueprint, render_template, redirect, url_for, request
# from app.froms import PostForm
from app.models import db, Post


bp = Blueprint('posts', __name__, url_prefix="/posts")


@bp.route('/')
def get_posts():
  posts = Post.query.all()
  # ??? do posts need to be converted to json ???
  return posts
  
@bp.route('/<int:postId>')
def get_post(postId):
  post = Post.query.get(postId)
  # ??? do posts need to be converted to json ???
  return post
  
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
def delete_post(postId):
  post = Post.query.get(postId)
  userId = request.get_json(force=True)["sessionUserId"]
  
  if post.userId == userId:
    db.session.delete(post)
    return postId
  else:
    return
