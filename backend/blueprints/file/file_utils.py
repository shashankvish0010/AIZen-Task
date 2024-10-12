from flask import jsonify
from functools import wraps

def validate_input_file(files):
    if 'file' not in files:
        return False, jsonify({"error": "No file part"}), 400
    
    upload_file=files['file']

    if upload_file.filename == '':
        return False, jsonify({"error": "No selected file"}), 400
    
    return True, None

def handle_errors(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    try:
      return f(*args, **kwargs)
    except Exception as e:
      return jsonify({"error": str(e)}), 500
  return decorated_function