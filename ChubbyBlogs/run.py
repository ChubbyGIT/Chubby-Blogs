#!/usr/bin/env python3
"""
run.py — Local dev server launcher for Chubby Blogs

Usage:
    python run.py

This script starts the Next.js dev server and opens the browser automatically.
The site will be available at http://localhost:3000
"""

import subprocess
import sys
import os
import time
import webbrowser
import threading

# Directory containing the Next.js app
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.join(SCRIPT_DIR, "chubby-blogs-app")
DEV_URL = "http://localhost:3000"

def open_browser():
    """Open the browser after a short delay to let the server start."""
    time.sleep(4)
    print(f"\n🌐  Opening {DEV_URL} in your browser...\n")
    webbrowser.open(DEV_URL)

def main():
    if not os.path.isdir(APP_DIR):
        print(f"❌  App directory not found: {APP_DIR}")
        sys.exit(1)

    # Determine the npm command based on OS
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"

    print("=" * 55)
    print("  🍩  CHUBBY BLOGS — Local Dev Server")
    print("=" * 55)
    print(f"\n📂  App directory: {APP_DIR}")
    print(f"🚀  Starting Next.js dev server at {DEV_URL}\n")
    print("  Press Ctrl+C to stop the server.\n")
    print("-" * 55)

    # Open browser in background after delay
    browser_thread = threading.Thread(target=open_browser, daemon=True)
    browser_thread.start()

    try:
        result = subprocess.run(
            [npm_cmd, "run", "dev"],
            cwd=APP_DIR,
            check=True
        )
    except KeyboardInterrupt:
        print("\n\n⛔  Server stopped. Goodbye!\n")
    except FileNotFoundError:
        print(f"\n❌  Could not find '{npm_cmd}'. Please make sure Node.js and npm are installed.")
        print("    Download from: https://nodejs.org/")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"\n❌  Server exited with error code {e.returncode}")
        sys.exit(e.returncode)

if __name__ == "__main__":
    main()
