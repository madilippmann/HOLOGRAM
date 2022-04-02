from flask import Blueprint, render_template, redirect, url_for
# from app.froms import PostForm
from app.models import db, Post


bp = Blueprint('posts', __name__, url_prefix="/")


@bp.route('/')
def index():
  return 'bruh'
