"""
make_atg_gifs.py — Converts both ATG (Atomic Task Graph) blog PNGs into animated GIFs.

Effects:
  ATG 1 (chaotic lines → structured graph)  → slow zoom pulse + brightness glow (cover)
  ATG 2 (golden grid with glowing path)     → slow drift + brightness pulse
"""

from PIL import Image, ImageEnhance
import math
import os

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "chubby-blogs-app", "public", "images")


# ─── Shared helpers ──────────────────────────────────────────────────────────

def zoom_crop(img, zoom):
    """Return a version of img zoomed by `zoom` factor, centre-cropped to original size."""
    w, h = img.size
    new_w = int(w / zoom)
    new_h = int(h / zoom)
    left  = (w - new_w) // 2
    top   = (h - new_h) // 2
    return img.crop((left, top, left + new_w, top + new_h)).resize((w, h), Image.LANCZOS)


def ease_inout(t):
    """Smooth ease-in-out curve for t in [0, 1]."""
    return t * t * (3 - 2 * t)


# ─── 1. ATG Cover — chaos→order image: slow zoom pulse + brightness glow ────────

def make_atg1_gif():
    src = os.path.join(IMAGES_DIR, "Atomic Task Graph A Unified Framework for Agentic1.png")
    dst = os.path.join(IMAGES_DIR, "atg-cover.gif")

    base = Image.open(src).convert("RGBA")
    # Downscale to a web-friendly size for GIF
    base = base.resize((800, 450), Image.LANCZOS)

    FRAMES   = 40        # total frames per loop
    ZOOM_MIN = 1.00      # natural size
    ZOOM_MAX = 1.10      # max zoom-in
    DURATION = 75        # ms per frame -> ~40*75 = 3s cycle

    # Brightness oscillates for the golden glow effect
    BRIGHT_MIN = 0.88
    BRIGHT_MAX = 1.12

    frames = []
    for i in range(FRAMES):
        t = i / FRAMES
        angle = 2 * math.pi * t

        # Zoom pulse -- smooth breathe
        zoom = ZOOM_MIN + (ZOOM_MAX - ZOOM_MIN) * ease_inout(abs(math.sin(math.pi * t)))

        # Brightness pulse (golden glow -- slightly offset from zoom for visual interest)
        brightness = BRIGHT_MIN + (BRIGHT_MAX - BRIGHT_MIN) * (0.5 + 0.5 * math.cos(angle))

        # Apply zoom
        zoomed = zoom_crop(base, zoom)

        # Apply brightness
        zoomed = ImageEnhance.Brightness(zoomed).enhance(brightness)

        frame = zoomed.convert("P", palette=Image.ADAPTIVE, colors=256)
        frames.append(frame)

    frames[0].save(
        dst,
        save_all=True,
        append_images=frames[1:],
        optimize=False,
        loop=0,
        duration=DURATION,
    )
    print(f"[OK] atg-cover.gif  ({len(frames)} frames @ {DURATION}ms)")


# ─── 2. ATG Grid -- golden grid with path: brightness pulse + slow drift ──────────

def make_atg2_gif():
    src = os.path.join(IMAGES_DIR, "Atomic Task Graph A Unified Framework for Agentic2.png")
    dst = os.path.join(IMAGES_DIR, "atg-grid.gif")

    base = Image.open(src).convert("RGBA")
    base = base.resize((800, 450), Image.LANCZOS)
    w, h = base.size

    FRAMES   = 48        # more frames for smoother drift
    DURATION = 60        # ms per frame -> ~48*60 = 2.9s cycle

    # Drift parameters
    DRIFT_X  = 16
    DRIFT_Y  = 10
    ZOOM_MIN = 1.00
    ZOOM_MAX = 1.08

    # Brightness -- the golden path glowing
    BRIGHT_MIN = 0.85
    BRIGHT_MAX = 1.15

    frames = []
    for i in range(FRAMES):
        t = i / FRAMES
        angle = 2 * math.pi * t

        # Drift: slow lemniscate (figure-8) path
        dx = int(DRIFT_X * math.sin(angle))
        dy = int(DRIFT_Y * math.sin(2 * angle) * 0.5)

        # Gentle zoom
        zoom = ZOOM_MIN + (ZOOM_MAX - ZOOM_MIN) * ease_inout(abs(math.sin(math.pi * t)))

        # Brightness pulse
        brightness = BRIGHT_MIN + (BRIGHT_MAX - BRIGHT_MIN) * (0.5 + 0.5 * math.cos(angle))

        # Apply zoom
        zoomed = zoom_crop(base, zoom)

        # Apply drift via an offset crop
        zoomed_w, zoomed_h = zoomed.size
        crop_x = max(0, min(zoomed_w - w, (zoomed_w - w) // 2 + dx))
        crop_y = max(0, min(zoomed_h - h, (zoomed_h - h) // 2 + dy))
        shifted = zoomed.crop((crop_x, crop_y, crop_x + w, crop_y + h)).resize((w, h), Image.LANCZOS)

        # Brightness
        shifted = ImageEnhance.Brightness(shifted).enhance(brightness)

        frame = shifted.convert("P", palette=Image.ADAPTIVE, colors=256)
        frames.append(frame)

    frames[0].save(
        dst,
        save_all=True,
        append_images=frames[1:],
        optimize=False,
        loop=0,
        duration=DURATION,
    )
    print(f"[OK] atg-grid.gif  ({len(frames)} frames @ {DURATION}ms)")


# ─── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("Creating animated GIFs for Atomic Task Graph blog post...")
    make_atg1_gif()
    make_atg2_gif()
    print("\nDone! Both GIFs saved to public/images/")
