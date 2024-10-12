import re
from flask import jsonify
from functools import wraps

def validate_registration_input(data):
    if not all (key in data for key in ('firstname', 'lastname', 'username', 'email', 'password')):
     return False, "Missing required fields"
    if len(data['firstname']) < 3:
     return False, "Firstname must be at least 3 charachter long"
    if len(data['lastname']) < 3:
     return False, "Lastname must be at least 3 charachter long"
    if len(data['username']) < 3:
     return False, "Username must be at least 3 charachter long"
    valid = re.match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}', data['email'])
    if not valid:
      return False, "Email is not valid"
    if len(data['password']) < 6:
      return False, "Password must be at least 6 charachter long"
    
    return True, None

def validate_login_input(data):
  if not all( key in data for key in ('username', 'password')):
     return False, "Missing required fields"
  return True, None

def handle_errors(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    try:
      return f(*args, **kwargs)
    except Exception as e:
      return jsonify({"error": str(e)}), 500
  return decorated_function