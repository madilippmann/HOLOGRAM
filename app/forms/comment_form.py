from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL, ValidationError
# from app.models import User, Post

class CreateCommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])


class EditCommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
