from flask import Flask
from endpoints import login, register

app = Flask(__name__)
app.register_blueprint(login.bp)
app.register_blueprint(register.bp)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run(debug=True)