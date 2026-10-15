"""Builds the favicon and home-screen icon from the hero portrait: a face crop on the plum background."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PORTRAIT = ROOT / "assets" / "portrait.webp"
PLUM_900, PLUM_700, ROSE_300 = (25, 0, 25), (82, 43, 91), (223, 182, 178)
# Square crops of the 720×886 portrait as (left, top, size): tight on the face for the tiny tab icon, wider for home screens.
TAB_CROP = (262, 88, 200)
HOME_CROP = (205, 30, 300)
SCALE = 4  # Draw large, then downsample, for smooth edges.


def plum_background(size):
    """Radial plum gradient, lighter in the middle like the site's glass panels."""
    bg = Image.new("RGB", (size, size), PLUM_900)
    draw = ImageDraw.Draw(bg)
    steps = 40
    for i in range(steps):
        t = i / steps
        r = int(size * 0.75 * (1 - t))
        color = tuple(int(PLUM_900[c] + (PLUM_700[c] - PLUM_900[c]) * t) for c in range(3))
        draw.ellipse((size / 2 - r, size * 0.45 - r, size / 2 + r, size * 0.45 + r), fill=color)
    return bg


def face(size, crop):
    left, top, side = crop
    return Image.open(PORTRAIT).convert("RGBA").crop((left, top, left + side, top + side)).resize((size, size), Image.LANCZOS)


def build(size, crop, round_with_ring):
    big = size * SCALE
    canvas = plum_background(big).convert("RGBA")
    canvas.alpha_composite(face(big, crop))
    if not round_with_ring:
        return canvas.convert("RGB").resize((size, size), Image.LANCZOS)
    ring = max(2, big // 22)
    ImageDraw.Draw(canvas).ellipse((ring / 2, ring / 2, big - ring / 2, big - ring / 2), outline=ROSE_300, width=ring)
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, big - 1, big - 1), fill=255)
    canvas.putalpha(mask)
    return canvas.resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    build(64, TAB_CROP, round_with_ring=True).save(ROOT / "assets" / "favicon.png")
    build(180, HOME_CROP, round_with_ring=False).save(ROOT / "assets" / "apple-touch-icon.png")
    print("[favicon] wrote assets/favicon.png and assets/apple-touch-icon.png")
