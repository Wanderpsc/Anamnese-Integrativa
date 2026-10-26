import argparse
import json
import re
import shutil
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}


def normalize_space(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "")).strip()


def extract_blocks(docx_path: Path):
    with zipfile.ZipFile(docx_path) as z:
        rels_root = ET.fromstring(z.read("word/_rels/document.xml.rels"))
        rid_to_target = {
            rel.attrib["Id"]: rel.attrib["Target"]
            for rel in rels_root
            if rel.attrib.get("Type", "").endswith("/image")
        }

        doc_root = ET.fromstring(z.read("word/document.xml"))
        body = doc_root.find("w:body", NS)
        blocks = []

        for child in body:
            if child.tag != f"{{{NS['w']}}}p":
                continue

            texts = [t.text for t in child.findall(".//w:t", NS) if t.text]
            paragraph_text = normalize_space(" ".join(texts))

            images = []
            for blip in child.findall(".//a:blip", NS):
                rid = blip.attrib.get(f"{{{NS['r']}}}embed")
                if rid and rid in rid_to_target:
                    images.append(rid_to_target[rid])

            if paragraph_text or images:
                blocks.append({"text": paragraph_text, "images": images})

        media_files = [n for n in z.namelist() if n.startswith("word/media/")]

    return blocks, media_files


def build_entries(blocks):
    groups = []
    pending_images = []

    for block in blocks:
        text = block["text"]
        images = [image_target.split("/")[-1] for image_target in block["images"]]

        if images:
            if pending_images and any(group["texts"] for group in pending_images):
                groups.extend(pending_images)
                pending_images = []

            for image in images:
                pending_images.append({"image": image, "texts": []})

            if text and pending_images:
                for group in pending_images:
                    group["texts"].append(text)
            continue

        if text and pending_images:
            for group in pending_images:
                group["texts"].append(text)

    if pending_images:
        groups.extend(pending_images)

    by_image = {}
    for group in groups:
        image = group["image"]
        if image not in by_image:
            by_image[image] = []
        by_image[image].extend(group["texts"])

    cleaned = []
    for index, image in enumerate(sorted(by_image.keys()), start=1):
        texts = [normalize_space(t) for t in by_image[image] if normalize_space(t)]
        unique_texts = list(dict.fromkeys(texts))
        full_text = normalize_space(" ".join(unique_texts))
        if not full_text:
            full_text = "Sem descrição textual extraída para esta imagem."

        sentences = [s.strip() for s in re.split(r"(?<=[\.!?])\s+", full_text) if s.strip()]
        title = sentences[0] if sentences else full_text[:90]
        title = re.sub(r"^(?:\d+[\.|\)]?\s*)+", "", title).strip() or title
        if title in {"-", ".", "", "1", "1."}:
            title = full_text[:90]
            title = re.sub(r"^(?:\d+[\.|\)]?\s*)+", "", title).strip() or "Imagem clínica"
        if len(title) > 90:
            title = title[:87].rstrip() + "..."

        cleaned.append(
            {
                "id": f"subclinico-{index:03d}",
                "title": title,
                "image": image,
                "diagnosis": full_text,
                "observations": full_text,
                "treatments": [],
            }
        )

    return cleaned


def save_assets(docx_path: Path, output_dir: Path, media_files):
    output_dir.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(docx_path) as z:
        for media in media_files:
            image_name = Path(media).name
            dest = output_dir / image_name
            with z.open(media) as src, open(dest, "wb") as dst:
                shutil.copyfileobj(src, dst)


def main():
    parser = argparse.ArgumentParser(description="Extrai imagens e dados de DOCX para Anamnese Subclínico")
    parser.add_argument(
        "--docx",
        default="TIPO SANGUÍNEO - ANAMNESE CONFORME BIORRESSONÂNCIA.docx",
        help="Caminho do arquivo DOCX",
    )
    parser.add_argument(
        "--assets-out",
        default="public/assets/subclinico-biorressonancia",
        help="Pasta de saída das imagens",
    )
    parser.add_argument(
        "--json-out",
        default="src/data/subclinicalIntegrativeData.json",
        help="Arquivo JSON de saída",
    )
    args = parser.parse_args()

    docx_path = Path(args.docx)
    if not docx_path.exists():
        raise FileNotFoundError(f"Arquivo DOCX não encontrado: {docx_path}")

    blocks, media_files = extract_blocks(docx_path)
    entries = build_entries(blocks)

    assets_dir = Path(args.assets_out)
    save_assets(docx_path, assets_dir, media_files)

    json_out = Path(args.json_out)
    json_out.parent.mkdir(parents=True, exist_ok=True)
    json_out.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Blocos lidos: {len(blocks)}")
    print(f"Imagens copiadas: {len(media_files)} em {assets_dir}")
    print(f"Entradas geradas: {len(entries)}")
    print(f"JSON salvo em: {json_out}")


if __name__ == "__main__":
    main()
