# import sys
# from pathlib import Path

# parent_dir = Path(__file__).parent.parent
# sys.path.append(str(parent_dir))

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)