from flask import Blueprint, request, jsonify

bp = Blueprint('login', __name__)


@bp.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400

    username = data['username']
    password = data['password']

    if authenticate(username, password):
        return jsonify({}), 200
    else:
        return jsonify({'error': 'Invalid username and password'}), 403


def authenticate(username, password) -> bool:
    # todo: fetch password hash from database and check if it matches with the
    #       provided password
    return False


def generate_token(user_id):
    # todo: implement secure token generation using PyJWT library or similar
    return f'not_a_real_token{user_id}'
