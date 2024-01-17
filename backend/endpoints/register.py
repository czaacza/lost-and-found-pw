from flask import Blueprint

bp = Blueprint('register', __name__)


@bp.route('/users/register', methods=['POST'])
def register():
    # todo: implement "register" endpoint
    pass
