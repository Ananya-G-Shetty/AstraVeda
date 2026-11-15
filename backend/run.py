import os

from app import create_app

app = create_app()

if __name__ == "__main__":
    # Debug mode is OFF unless you explicitly set FLASK_DEBUG=1 on your own machine.
    app.run(debug=os.environ.get("FLASK_DEBUG") == "1")