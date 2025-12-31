import torch
import open_clip
from PIL import Image
from io import BytesIO
import numpy as np
from app.core.config import settings

# 앱 시작 시 1번만 로드
device = "cuda" if torch.cuda.is_available() else "cpu"

model, _, preprocess = open_clip.create_model_and_transforms(
    settings.CLIP_MODEL,                # "ViT-B-32"
    pretrained="laion2b_s34b_b79k"
)
model = model.to(device).eval()

def image_to_embedding(image_bytes: bytes) -> list[float]:
    image = preprocess(
        Image.open(BytesIO(image_bytes)).convert("RGB")
    ).unsqueeze(0).to(device)

    with torch.no_grad():
        feat = model.encode_image(image)
        feat = feat / feat.norm(dim=-1, keepdim=True)

    return feat.cpu().numpy()[0].tolist()