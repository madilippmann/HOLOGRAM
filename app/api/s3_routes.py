import os
import boto3
# import requests
import random
import string
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, Post
from botocore.config import Config




s3_routes = Blueprint('s3_routes', __name__)

def get_presigned_url():

    file = request.files['file']

    print('\n\n\n\n\n', file, '\n\n\n\n\n')
    OBJECT_NAME_TO_UPLOAD = ''.join(random.choices(string.ascii_lowercase + string.digits, k=30))

    # response = s3_client.generate_presigned_url(
    #     'get_object',
    #     Params={
    #         'Bucket': os.environ.get('AWS_BUCKET_NAME'),
    #         'Key': OBJECT_NAME_TO_UPLOAD
    #     },
    #     ExpiresIn=3600,
    #     HttpMethod='PUT'
    # # )
    # print('\n\n\n\n', type(response), '\n\n\n\n')

    # return response


    # response = s3_client.generate_presigned_post(
    #     os.environ.get('AWS_BUCKET_NAME'),
    #     OBJECT_NAME_TO_UPLOAD,
    #     Fields=None,
    #     Conditions=None,
    #     ExpiresIn=60
    # )


    # http_response = requests.post(response['url'], data=response['fields'], files=files)


    # return {"url": response["url"], "fields": json.dumps(response["fields"])}


@s3_routes.route('/', methods=["GET"])
def s3_presigned_url():
    return jsonify(get_presigned_url())
