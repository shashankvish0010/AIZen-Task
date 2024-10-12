from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.s3_service import S3Service
from models.file import File
from app import db
from .file_utils import validate_input_file, handle_errors
from hercai import Hercai
import os
import uuid

file_bp = Blueprint("file", __name__)
herc = Hercai()
s3_service = S3Service()

@file_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload():
    valid, error_message = validate_input_file(request.files)

    if not valid:
        return jsonify(error_message)
    try:
     file = request.files['file']
     user_id = get_jwt_identity()
     file_extension = file.filename.rsplit('.', 1)[1].lower()
     s3_filename=f"uploads/{user_id}/{str(uuid.uuid4())}.{file_extension}"

     if s3_service.upload_image(file, s3_filename):
        s3_url=s3_service.get_image_url(s3_filename)
        new_image = File(user_id=user_id, filename=s3_filename, s3_key=s3_filename, s3_url=f"{s3_url}")
        db.session.add(new_image)
        db.session.commit()

        all_images = File.query.filter_by(user_id=user_id).all()
        image_urls=[image.s3_url for image in all_images]

     if len(image_urls)>0:
        return jsonify({"message": "Image uploaded successfully", "images": image_urls}), 201
     else:
        return jsonify({"error": "Failed to upload file"}), 500
    except Exception as e:
     return jsonify({"error": str(e)}), 500
    
@file_bp.route('/generate/ai/images', methods=['POST'])
def generate_ai_image():
    prompt = request.json["prompt"]
    try:
        image_result = herc.draw_image(model='simurg', prompt=prompt)
        return jsonify({"ai_image": image_result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500