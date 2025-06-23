
from app import create_app, socketio


app = create_app()

@socketio.on('check_auth')
def handle_check_auth():
    from flask import session
    user = session.get("user")
    print(user)
    print("SocketIO check_auth:", user)
    if user:
        socketio.emit("auth_response", {
            "isAuthenticated": True,
            "user": user["user_name"]
        })
    else:
        socketio.emit("auth_response", {
            "isAuthenticated": False
        })

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
