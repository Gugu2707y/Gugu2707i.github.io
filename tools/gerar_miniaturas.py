"""Gera miniaturas leves (.webp) para uma pasta de imagens.
Uso:  python tools/gerar_miniaturas.py assets/npcs
      python tools/gerar_miniaturas.py assets/mapas 1200
Requer: pip install pillow
Depois, em js/assets-data.js, preencha "thumb": "thumbs/NOME.webp" (ou deixe vazio para usar o original)."""
import os, sys
from PIL import Image
pasta = sys.argv[1]; lado = int(sys.argv[2]) if len(sys.argv) > 2 else 640
saida = os.path.join(pasta, "thumbs"); os.makedirs(saida, exist_ok=True)
for nome in sorted(os.listdir(pasta)):
    if nome.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".avif")):
        im = Image.open(os.path.join(pasta, nome)).convert("RGBA"); im.thumbnail((lado, lado))
        destino = os.path.splitext(nome)[0] + ".webp"
        im.save(os.path.join(saida, destino), "WEBP", quality=84, method=6); print("ok", destino)
