"""
make_youtube_gifs.py — Converts YouTube view-count post PNGs into animated GIFs.

Effects:
  YouTube 1 (golden network / signal branching) → slow drift + brightness pulse (cover image)
  YouTube 2 (chart / glowing line)              → slow zoom pulse with brightness glow
"""

from PIL import Image, ImageEnhance
import math
import os

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "chubby-blogs-app", "public", "images")

SRC1 = os.path.join(IMAGES_DIR, "YouTube's New View Count Isn't a Metric Anymore. It's a Marketing Number. 1.png")
SRC2 = os.path.join(IMAGES_DIR, "YouTube's New View Count Isn't a Metric Anymore. It's a Marketing Number. 2.png")


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


# ─── 1. YouTube 1 — slow drift + brightness pulse (cover) ────────────────────

def make_youtube_cover_gif():
    dst = os.path.join(IMAGES_DIR, "youtube-view-count-cover.gif")

    base = Image.open(SRC1).convert("RGBA")
    # Downscale to a web-friendly size for GIF
    base = base.resize((800, 800), Image.LANCZOS)
    w, h = base.size

    FRAMES   = 48        # slightly more frames for smoother drift
    DURATION = 60        # ms per frame  → ~48*60 = 2.9 s per cycle

    # Drift parameters (pixels to wander around the canvas)
    DRIFT_X  = 18
    DRIFT_Y  = 10
    ZOOM_MIN = 1.00
    ZOOM_MAX = 1.08

    # Brightness oscillates between these values (1.0 = original)
    BRIGHT_MIN = 0.88
    BRIGHT_MAX = 1.12

    frames = []
    for i in range(FRAMES):
        t = i / FRAMES
        angle = 2 * math.pi * t

        # Drift: slow lemniscate (figure-8) path
        dx = int(DRIFT_X * math.sin(angle))
        dy = int(DRIFT_Y * math.sin(2 * angle) * 0.5)

        # Gentle zoom
        zoom = ZOOM_MIN + (ZOOM_MAX - ZOOM_MIN) * ease_inout(abs(math.sin(math.pi * t)))

        # Brightness pulse (golden glow feel)
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
    print(f"[OK] youtube-view-count-cover.gif  ({len(frames)} frames @ {DURATION}ms)")


# ─── 2. YouTube 2 — slow zoom pulse with brightness glow ──────────────────────

def make_youtube_chart_gif():
    dst = os.path.join(IMAGES_DIR, "youtube-view-count-chart.gif")

    base = Image.open(SRC2).convert("RGBA")
    base = base.resize((800, 800), Image.LANCZOS)

    FRAMES   = 40        # smooth loop
    ZOOM_MIN = 1.00
    ZOOM_MAX = 1.10
    DURATION = 75        # ms per frame → ~40*75 = 3s cycle

    # Brightness oscillates (the glow of the light trail)
    BRIGHT_MIN = 0.90
    BRIGHT_MAX = 1.12

    frames = []
    for i in range(FRAMES):
        t = i / FRAMES
        angle = 2 * math.pi * t

        # Zoom pulse — slightly offset from brightness for visual interest
        zoom = ZOOM_MIN + (ZOOM_MAX - ZOOM_MIN) * ease_inout(abs(math.sin(math.pi * t)))

        # Brightness pulse (golden glow feel)
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
    print(f"[OK] youtube-view-count-chart.gif  ({len(frames)} frames @ {DURATION}ms)")


# ─── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("Creating animated GIFs for YouTube view count blog post...")
    make_youtube_cover_gif()
    make_youtube_chart_gif()
    print("\nDone! Both GIFs saved to public/images/")
