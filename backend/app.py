from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

import jwt

app = Flask(__name__)
CORS(app) # added when testing mvp

SECRET_KEY = "random_string"

# sample user database - in prodution should store encrypted info in database
users = {
    "user": "password"
}

def generate_jwt_token(username):
    payload = {"username": username}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # verify user credentials
    if users.get(username) == password:
    # generated token for authentication user - > required when scratch fizzbuzz data
        token = generate_jwt_token(username)
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# FizzBuzz endpoint to generate a JSON list of numbers from 1 to 100,
@app.route('/fizzbuzz', methods=['GET'])
# logic based on description
def fizzbuzz():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Authentication token missing'}), 401

    token = token.split(' ')[1]  # remove prefix from the token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        # if authenticated
        result = []
        for num in range(1, 101):
            if num % 3 == 0 and num % 5 == 0:
                result.append('FizzBuzz')
            elif num % 3 == 0:
                result.append('Fizz')
            elif num % 5 == 0:
                result.append('Buzz')
            else:
                result.append(num)
        return jsonify(result)
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
