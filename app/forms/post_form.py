from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL, ValidationError
# from app.models import User, Post

class CreatePostForm(FlaskForm):
    postImageUrl = StringField('ImageURL', validators=[DataRequired(), URL(require_tld=False, message='Invalid image URL.')])
    caption = StringField('Caption')


class EditPostForm(FlaskForm):
    caption = StringField('Caption')
