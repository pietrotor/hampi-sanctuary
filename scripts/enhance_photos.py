"""Web masters for every photograph on the site, built from the originals.

Each photo is cropped, restored with Real-ESRGAN where the original has fewer
pixels than the layout needs, given a light retouch (levels, tone, vibrance,
sharpening) and written as WebP to public/photos.

Run with the photo-enhance venv:
    ~/.venvs/photo-enhance/bin/python scripts/enhance_photos.py [name ...]
"""

from __future__ import annotations

import sys
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ORIGINALS = ROOT / "assets" / "client-photos"
OUT = ROOT / "public" / "photos"
WEIGHTS = Path.home() / ".cache" / "photo-enhance" / "RealESRGAN_x2plus.pth"


@dataclass
class Job:
    name: str
    source: str
    width: int
    # (left, top, width, height) in the EXIF-upright original.
    crop: tuple[int, int, int, int] | None = None
    # Restore with the model first; only for originals short on pixels or
    # carrying compression from a screenshot.
    ai: bool = False
    tone: dict = field(default_factory=dict)


# People get less bite than landscapes: clarity and sharpening that look
# crisp on reeds turn skin and hair crunchy.
PORTRAIT = {"clarity": 0.08, "sharpen": 26, "vibrance": 0.07, "denoise": 1.3}

# The 2x restore specks in chroma. Same softer grade the screenshot heroes use.
AI = {"denoise": 0.9, "clarity": 0.1, "sharpen": 24}
AI_PORTRAIT = {**PORTRAIT, "denoise": 0.9}

# Widths follow the largest rendered size at 2x (3x for mobile portrait
# hero), capped at what the original can honestly supply.
JOBS = [
    # Hero: drawn object-cover across the full viewport.
    Job("pond-gathering", "_MG_9448.JPG", 3648),
    # The mobile hero used to download the whole landscape even though CSS
    # discarded roughly three quarters of it. This crop is the exact useful
    # centre of that frame at tall-phone proportions.
    Job("pond-gathering-mobile", "_MG_9448.JPG", 960, crop=(1250, 0, 960, 2048)),
    # A quarter of this frame is sky the camera already clipped. Pulling
    # levels only turns more of it white, so the sky is left alone.
    Job("garden-cacti-sky", "DSC03114.JPG", 3840, tone={"levels": 0.15, "vibrance": 0.06}),
    Job("garden-run", "_MG_5175.JPG", 3648, tone={"denoise": 0.6}),
    Job("lavender-oven", "2hampi.jpg.png", 3840, ai=True, tone={"denoise": 0.9, "clarity": 0.1, "sharpen": 24}),
    Job("pond-platform", "Screen by me.png", 3840, ai=True, tone={"denoise": 0.9, "clarity": 0.1, "sharpen": 24}),
    # Hero 2026. Width is a ceiling. Camera files stay at their real size.
    # Exports under ~2800px are restored 2x first so a retina hero is not
    # stretching them. The mobile crop is the useful centre of the opener
    # at tall-phone proportions, taken before the restore.
    Job("garden-dogs-run", "hero-2026/garden-dogs-run.png", 3840, ai=True, tone=AI_PORTRAIT),
    Job(
        "garden-dogs-run-mobile",
        "hero-2026/garden-dogs-run.png",
        960,
        crop=(528, 0, 480, 1024),
        ai=True,
        tone=AI_PORTRAIT,
    ),
    Job("sanctuary-facade", "hero-2026/sanctuary-facade.png", 3840, ai=True, tone=AI),
    Job("angels-trumpet-entrance", "hero-2026/angels-trumpet-entrance.png", 3840, ai=True, tone=AI_PORTRAIT),
    Job("palo-santo-ceremony", "hero-2026/palo-santo-ceremony.png", 3840, ai=True, tone=AI_PORTRAIT),
    Job("lavender-cactus-oven", "hero-2026/lavender-cactus-oven.png", 3840, ai=True, tone=AI),
    Job("san-pedro-bloom", "web-dani/San Pedro.png", 3840, ai=True, tone=AI),
    Job("pond-lilies-yellow", "hero-2026/pond-lilies-yellow.png", 3840, ai=True, tone=AI),
    Job("lavender-circle-share", "_MG_9500.JPG", 3840),
    Job("integration-candlelight", "hero-2026/integration-candlelight.png", 3840, ai=True, tone=AI_PORTRAIT),
    Job("altar-buddha-offering", "web-dani/_MG_3522.JPG", 3840),
    Job(
        "bonfire-circle-night",
        "hero-2026/bonfire-circle-night.png",
        3840,
        ai=True,
        tone={"denoise": 0.9, "clarity": 0.08, "sharpen": 22, "levels": 0.2},
    ),
    # 2808px wide is enough on a laptop, but a 3x phone covers this
    # frame by its short side and stretches it. Restore, then cap at 3840.
    Job(
        "waterfall-connection",
        "hero-2026/waterfall-connection.png",
        3840,
        ai=True,
        tone=AI_PORTRAIT,
    ),
    Job("quiet-inward", "hero-2026/quiet-inward.png", 3840, ai=True, tone=AI_PORTRAIT),
    Job("pond-reeds", "hero-2026/pond-reeds.jpeg", 3840, ai=True, tone=AI),
    # Sections.
    # Already 3:2. Shifting it right used to run past the frame and pad black.
    Job("pond-lilies", "web-dani/_MG_9107.JPG", 2000, tone={"clarity": 0.1, "sharpen": 34, "vibrance": 0.07, "denoise": 0.45}),
    Job("garden-mountains", "DSC03113.JPG", 2000),
    Job("community-conversation", "_MG_9500.JPG", 2400),
    Job("pond-afternoon", "_MG_9447.JPG", 3200, tone={"vibrance": 0.05}),
    Job("garden-bowl", "web-dani/Alimentos/_MG_2941.JPG", 1600, crop=(0, 365, 2432, 1824), tone={"denoise": 0.7}),
    Job("garden-work", "web-dani/IMG_1342.jpg", 1760, tone=PORTRAIT),
    Job("quiet-meditation", "DSC03073.JPG", 1600, tone={**PORTRAIT, "levels": 0.2}),
    # Portraits: small on the page, so no upscaling.
    # Shared photo of Daniel and Andrea for the People section. Original is
    # 1086px wide, so it is graded but not restored or enlarged.
    Job("daniel-andrea", "ultimas-imagenes-hampy/Daniel y Andrea.png", 1086, tone=PORTRAIT),
    Job("daniel-portrait", "web-dani/IMG_2360.jpg", 990, crop=(0, 20, 990, 1238), tone=PORTRAIT),
    Job("andrea-portrait", "_MG_5175.JPG", 800, crop=(981, 430, 800, 1000), tone={**PORTRAIT, "denoise": 0.6}),
]

DEFAULT_TONE = {
    "levels": 0.4,  # How far to close a real black/white veil. Capped below.
    "contrast": 0.07,  # Gentle S-curve.
    "shadows": 0.05,  # Lift that fades out by the midtones.
    "vibrance": 0.09,  # Saturation, weighted toward muted colours.
    "clarity": 0.18,  # Broad luminance contrast. The thing that reads as "finished".
    "sharpen": 38,  # Luminance unsharp percent. Colour is never sharpened.
    "denoise": 0.0,  # Chroma blur radius. Only phone frames and AI restores.
}


def load(job: Job) -> Image.Image:
    image = ImageOps.exif_transpose(Image.open(ORIGINALS / job.source)).convert("RGB")
    if job.crop:
        left, top, w, h = job.crop
        if left < 0 or top < 0 or left + w > image.width or top + h > image.height:
            raise ValueError(
                f"{job.name}: crop {(left, top, w, h)} does not fit {image.size}"
            )
        image = image.crop((left, top, left + w, top + h))
    return image


_model = None


def restore(image: Image.Image) -> Image.Image:
    """2x Real-ESRGAN, tiled to fit a 6 GB card. Falls back to the CPU."""
    global _model
    import torch
    from spandrel import ModelLoader

    gpu = torch.cuda.is_available()
    device, dtype = ("cuda", torch.half) if gpu else ("cpu", torch.float)
    if _model is None:
        _model = ModelLoader().load_from_file(str(WEIGHTS)).model.eval().to(device, dtype)
        torch.set_num_threads(max(torch.get_num_threads(), 1))

    src = torch.from_numpy(np.asarray(image).copy()).permute(2, 0, 1).float().div(255)
    _, h, w = src.shape
    tile, pad, scale = 384, 16, 2
    out = torch.zeros(3, h * scale, w * scale)
    with torch.inference_mode():
        for y in range(0, h, tile):
            for x in range(0, w, tile):
                y0, x0 = max(y - pad, 0), max(x - pad, 0)
                y1, x1 = min(y + tile + pad, h), min(x + tile + pad, w)
                patch = src[:, y0:y1, x0:x1].unsqueeze(0).to(device, dtype)
                result = _model(patch)[0].float().clamp(0, 1).cpu()
                ty, tx = (y - y0) * scale, (x - x0) * scale
                th = (min(y + tile, h) - y) * scale
                tw = (min(x + tile, w) - x) * scale
                out[:, y * scale : y * scale + th, x * scale : x * scale + tw] = result[
                    :, ty : ty + th, tx : tx + tw
                ]
    array = out.permute(1, 2, 0).mul(255).round().byte().numpy()
    return Image.fromarray(array)


LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
BASE = Path.home() / ".cache" / "photo-enhance" / "base"


def as_image(rgb: np.ndarray) -> Image.Image:
    return Image.fromarray((np.clip(rgb, 0, 1) * 255).round().astype(np.uint8))


def chroma_denoise(rgb: np.ndarray, radius: float) -> np.ndarray:
    """Blur colour only. Phone frames and the AI restores speckle in chroma
    while the detail people notice lives in luminance."""
    y, cb, cr = as_image(rgb).convert("YCbCr").split()
    blur = ImageFilter.GaussianBlur(radius)
    return np.asarray(Image.merge("YCbCr", (y, cb.filter(blur), cr.filter(blur))).convert("RGB")).astype(np.float32) / 255


def clarity(rgb: np.ndarray, amount: float) -> np.ndarray:
    """Contrast at the scale of a subject, not an edge. Applied to luminance
    so it cannot shift colour."""
    h, w = rgb.shape[:2]
    small = max(24, w // 48)
    blurred = as_image(rgb).resize((small, max(16, round(h * small / w))), Image.Resampling.BOX)
    base = np.asarray(blurred.resize((w, h), Image.Resampling.BILINEAR)).astype(np.float32) / 255
    detail = (rgb @ LUMA) - (base @ LUMA)
    return np.clip(rgb + detail[..., None] * amount, 0, 1)


def luma_sharpen(image: Image.Image, percent: int) -> Image.Image:
    y, cb, cr = image.convert("YCbCr").split()
    y = y.filter(ImageFilter.UnsharpMask(radius=1.1, percent=percent, threshold=3))
    return Image.merge("YCbCr", (y, cb, cr)).convert("RGB")


def retouch(image: Image.Image, tone: dict) -> Image.Image:
    t = {**DEFAULT_TONE, **tone}
    rgb = np.asarray(image).astype(np.float32) / 255
    if t["denoise"]:
        rgb = chroma_denoise(rgb, t["denoise"])

    lum = rgb @ LUMA
    lo, hi = np.percentile(lum, [0.3, 99.7])
    # A hard stretch turns clipped sky whiter and backlit hair into a hole.
    # Only a real veil moves, and never by much.
    black = min(float(lo), 0.05) * t["levels"]
    white = 1 - min(1 - float(hi), 0.06) * t["levels"]
    rgb = np.clip((rgb - black) / max(white - black, 1e-3), 0, 1)

    s = rgb * rgb * (3 - 2 * rgb)
    rgb = np.clip(rgb + (s - rgb) * t["contrast"], 0, 1)
    rgb = np.clip(rgb + t["shadows"] * rgb * (1 - rgb) ** 3 * 4, 0, 1)

    if t["clarity"]:
        rgb = clarity(rgb, t["clarity"])

    # Vibrance: muted colours gain more than ones already at full saturation,
    # which is what keeps skin, flowers and the reeds from going synthetic.
    lum = (rgb @ LUMA)[..., None]
    sat = rgb.max(axis=2, keepdims=True) - rgb.min(axis=2, keepdims=True)
    rgb = np.clip(lum + (rgb - lum) * (1 + t["vibrance"] * (1 - sat)), 0, 1)

    return luma_sharpen(as_image(rgb), int(t["sharpen"]))


def prepare(job: Job) -> Image.Image:
    """Crop, restore and resize. Cached, because the restore is the slow part
    and the grade is the part that gets iterated."""
    BASE.mkdir(parents=True, exist_ok=True)
    cache = BASE / f"{job.name}.png"
    if cache.exists():
        return Image.open(cache).convert("RGB")

    image = load(job)
    if job.ai:
        image = restore(image)
    if image.width > job.width:
        height = round(image.height * job.width / image.width)
        image = image.resize((job.width, height), Image.Resampling.LANCZOS)
    image.save(cache)
    return image


def build(job: Job) -> None:
    image = retouch(prepare(job), job.tone)
    dest = OUT / f"{job.name}.webp"
    image.save(dest, "WEBP", quality=90, method=6)
    print(f"{job.name}\t{image.width}x{image.height}\t{dest.stat().st_size // 1024}K", flush=True)


if __name__ == "__main__":
    wanted = set(sys.argv[1:])
    for job in JOBS:
        if not wanted or job.name in wanted:
            build(job)
