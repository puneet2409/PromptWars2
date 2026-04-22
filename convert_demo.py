"""Convert animated WebP to MP4 for LinkedIn upload."""
from PIL import Image
import imageio.v3 as iio
import numpy as np
import sys, os

src = r"C:\Users\2pune\.gemini\antigravity\brain\667955b4-dbc3-4ecb-a388-87d7b5b155b9\chunav_saathi_demo_1776873373242.webp"
dst = r"c:\Users\2pune\OneDrive\Desktop\CODEX\PromptWars\PromptWars2\ChunavSaathi_Demo.mp4"

print("Opening animated WebP...")
img = Image.open(src)

frames = []
durations = []
try:
    while True:
        frame = img.copy().convert("RGB")
        arr = np.array(frame)
        frames.append(arr)
        durations.append(img.info.get("duration", 100))
        img.seek(img.tell() + 1)
except EOFError:
    pass

print(f"Extracted {len(frames)} frames")

if not frames:
    print("ERROR: No frames extracted")
    sys.exit(1)

# Calculate average FPS from durations
avg_duration_ms = sum(durations) / len(durations)
fps = max(1, min(30, round(1000 / avg_duration_ms)))
print(f"Average frame duration: {avg_duration_ms:.0f}ms -> {fps} FPS")

print(f"Writing MP4 to {dst}...")
iio.imwrite(dst, frames, fps=fps, codec="libx264")
print(f"Done! File size: {os.path.getsize(dst) / 1024 / 1024:.1f} MB")
