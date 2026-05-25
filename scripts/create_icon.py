from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


SIZE = 256
ROOT_DIR = Path(__file__).resolve().parents[1]
BUILD_DIR = ROOT_DIR / "build"
OUTPUT_PATH = BUILD_DIR / "icon.ico"

BUILD_DIR.mkdir(exist_ok=True)

img = Image.new("RGBA", (SIZE, SIZE), (5, 7, 17, 255))
draw = ImageDraw.Draw(img)

# Glow layer
glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
g = ImageDraw.Draw(glow)

g.ellipse((28, 28, 228, 228), outline=(34, 211, 238, 180), width=8)
g.ellipse((46, 46, 210, 210), outline=(255, 138, 0, 160), width=6)

glow = glow.filter(ImageFilter.GaussianBlur(10))
img.alpha_composite(glow)

# Outer ring
draw.ellipse((32, 32, 224, 224), outline=(255, 255, 255, 220), width=6)

# Terminal window
draw.rounded_rectangle(
    (58, 74, 198, 170),
    radius=18,
    fill=(13, 18, 32, 240),
    outline=(255, 255, 255, 90),
    width=3
)

# Top bar
draw.rounded_rectangle(
    (58, 74, 198, 104),
    radius=18,
    fill=(255, 255, 255, 25)
)

# Window dots
draw.ellipse((74, 86, 84, 96), fill=(255, 138, 0, 255))
draw.ellipse((90, 86, 100, 96), fill=(34, 211, 238, 255))
draw.ellipse((106, 86, 116, 96), fill=(139, 92, 246, 255))

# Code symbol
draw.line((88, 126, 108, 146), fill=(255, 255, 255, 245), width=8)
draw.line((108, 106, 88, 126), fill=(255, 255, 255, 245), width=8)

draw.line((168, 106, 148, 126), fill=(255, 255, 255, 245), width=8)
draw.line((148, 146, 168, 126), fill=(255, 255, 255, 245), width=8)

draw.line((126, 150, 138, 106), fill=(255, 138, 0, 255), width=8)

# Bottom launcher line
draw.rounded_rectangle(
    (78, 188, 178, 200),
    radius=6,
    fill=(34, 211, 238, 220)
)

img.save(
    OUTPUT_PATH,
    sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
)

print(f"{OUTPUT_PATH.relative_to(ROOT_DIR)} olusturuldu.")
