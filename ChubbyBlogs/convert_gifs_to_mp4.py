"""
Convert GIF cover images to MP4 for better compatibility and performance.
Uses imageio with its bundled ffmpeg — no system ffmpeg needed.

Output: same filename with .mp4 extension alongside each .gif in public/images/
"""

import imageio.v3 as iio
from pathlib import Path
import sys

IMAGES_DIR = Path(__file__).parent / "chubby-blogs-app" / "public" / "images"

# Only the cover GIFs used in post frontmatter
COVER_GIFS = [
    "neuroplasticity-cover.gif",
    "loop-engineering-cover.gif",
    "youtube-view-count-cover.gif",
    "jspace-cover.gif",
    "atg-cover.gif",
]

def convert_gif_to_mp4(gif_path: Path) -> Path:
    mp4_path = gif_path.with_suffix(".mp4")
    if mp4_path.exists():
        print(f"  [skip] Already exists: {mp4_path.name}")
        return mp4_path

    print(f"  [convert] {gif_path.name} -> {mp4_path.name} ...")
    frames = iio.imread(str(gif_path), index=None, plugin="pillow")  # shape: (N, H, W, C)

    # imageio ffmpeg writer expects uint8 RGB
    if frames.ndim == 3:
        # single frame
        frames = frames[None]

    # Strip alpha channel if present (MP4 doesn't support transparency)
    if frames.shape[-1] == 4:
        frames = frames[..., :3]

    fps = 10  # conservative; GIF metadata is often unreliable
    try:
        meta = iio.immeta(str(gif_path), plugin="pillow")
        duration_ms = meta.get("duration", 100)  # ms per frame
        if duration_ms and duration_ms > 0:
            fps = round(1000 / duration_ms)
            fps = max(1, min(fps, 30))  # clamp to sane range
    except Exception:
        pass

    iio.imwrite(
        str(mp4_path),
        frames,
        fps=fps,
        codec="libx264",
        in_pixel_format="rgb24",
        out_pixel_format="yuv420p",
        plugin="pyav",
    )

    orig_kb = gif_path.stat().st_size / 1024
    new_kb = mp4_path.stat().st_size / 1024
    savings = (1 - new_kb / orig_kb) * 100
    print(f"     [done] {orig_kb:.0f} KB -> {new_kb:.0f} KB  ({savings:.0f}% smaller)")
    return mp4_path


def main():
    missing = [g for g in COVER_GIFS if not (IMAGES_DIR / g).exists()]
    if missing:
        print("Missing GIFs:", missing)
        sys.exit(1)

    print(f"\nConverting {len(COVER_GIFS)} cover GIFs -> MP4\n")
    for name in COVER_GIFS:
        gif_path = IMAGES_DIR / name
        convert_gif_to_mp4(gif_path)

    print("\nAll done! Update your MDX frontmatter to add coverVideo fields.")


if __name__ == "__main__":
    main()
