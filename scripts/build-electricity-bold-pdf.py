"""Build the Electrical Test 2 guide from the site's canonical study notes.

Run with the bundled Python (ReportLab and pypdf), from the repository root.
"""
from pathlib import Path
from collections import OrderedDict
from html import escape
import json
import re
import subprocess

from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output/pdf/Electrical-Test-2-Bold-Text-Study-Notes.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
result = subprocess.run([
    "node", "--input-type=module", "-e",
    'import {electricityBoldGuide,electricityBoldGuideMethod} from "./src/data/electricityBoldStudyNotes.js";'
    'import index from "./src/data/electricityBoldSourceIndex.json" with {type:"json"};'
    'console.log(JSON.stringify({groups:electricityBoldGuide,method:electricityBoldGuideMethod,index}));'
], cwd=ROOT, check=True, capture_output=True, encoding="utf-8")
data = json.loads(result.stdout)

font_dir = Path("C:/Windows/Fonts")
for name, filename in [("Guide", "arial.ttf"), ("GuideBold", "arialbd.ttf"), ("GuideItalic", "ariali.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
pdfmetrics.registerFontFamily("Guide", normal="Guide", bold="GuideBold", italic="GuideItalic", boldItalic="GuideBold")

BLUE, INK, MUTED, LINE = (HexColor(x) for x in ["#1755A0", "#182536", "#526174", "#D8E3EF"])
styles = getSampleStyleSheet()
styles.add(ParagraphStyle("GuideTitle", fontName="GuideBold", fontSize=25, leading=29, textColor=INK, spaceAfter=9))
styles.add(ParagraphStyle("GuideSub", fontName="Guide", fontSize=12, leading=17, textColor=BLUE, spaceAfter=12))
styles.add(ParagraphStyle("Intro", fontName="Guide", fontSize=10, leading=14.2, textColor=MUTED, spaceAfter=10))
styles.add(ParagraphStyle("SectionTitle", fontName="GuideBold", fontSize=19, leading=23, textColor=BLUE, spaceAfter=14))
styles.add(ParagraphStyle("NoteTitle", fontName="GuideBold", fontSize=10.5, leading=13, textColor=INK, spaceAfter=3))
styles.add(ParagraphStyle("NoteBody", fontName="Guide", fontSize=10, leading=13, textColor=INK, spaceAfter=3))
styles.add(ParagraphStyle("Source", fontName="Guide", fontSize=8, leading=10, textColor=MUTED, spaceAfter=7))
styles.add(ParagraphStyle("IndexTitle", fontName="GuideBold", fontSize=10.5, leading=13, textColor=INK, spaceAfter=4, keepWithNext=True))
styles.add(ParagraphStyle("Index", fontName="Guide", fontSize=8.4, leading=10.5, textColor=INK, spaceAfter=0))
styles.add(ParagraphStyle("IndexHeader", fontName="GuideBold", fontSize=9, leading=12, textColor=white))


def clean(text):
    return re.sub(r"[\u2010-\u2015]", "-", str(text)).replace("\u00a0", " ")


def paragraph(text, style):
    return Paragraph(escape(clean(text)), styles[style])


def references(slides):
    return "Slide " + str(slides[0]) if len(slides) == 1 else "Slides " + ", ".join(map(str, slides))


class GuideCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setTitle("Electrical Test 2 - Bold-Text Study Notes")
        self.setAuthor("BuzzaSolutions")
        self.setSubject("Source-backed review of emphasized material in Batteries, Electromagnetic Induction and DC Generators & Controls")


def page_frame(c, doc):
    c.saveState()
    if doc.page > 1:
        c.setFont("GuideBold", 8)
        c.setFillColor(BLUE)
        c.drawString(48, 761, "ELECTRICAL TEST 2  /  BOLD-TEXT REVIEW")
        c.setStrokeColor(LINE)
        c.line(48, 750, 564, 750)
    c.setStrokeColor(LINE)
    c.line(48, 40, 564, 40)
    c.setFillColor(MUTED)
    c.setFont("Guide", 8)
    c.drawString(48, 26, "AMEM 10001  |  Course-study guide  |  22 November 2026")
    c.drawRightString(564, 26, str(doc.page))
    c.restoreState()


story = [
    paragraph("Electrical Test 2", "GuideTitle"),
    paragraph("Bold-text study notes", "GuideSub"),
    paragraph("Batteries  /  Electromagnetic Induction  /  DC Generators & Controls", "NoteTitle"),
    paragraph("73 condensed notes covering 173 paragraphs with bold emphasis in your five supplied PowerPoint files. Repeated headings are combined; the text beneath a heading supplies the explanation. Slide references keep the original numbering across split files.", "Intro"),
    paragraph("How to use: learn the bold topic, explain the mechanism or distinction in your own words, then use the source reference to revisit the slide. The final source index shows the emphasized phrases used to select this material. This is a study guide, with no new calculation exercises.", "Intro"),
    paragraph("Source corrections are identified inside the relevant notes, including induced EMF versus inductance, mixed hand-rule wording and the ambiguous Ni-Cad cell-count example. Equipment-spill cleanup is kept separate from personal first aid.", "Intro"),
    Spacer(1, 10),
]

for group_index, group in enumerate(data["groups"]):
    if group_index:
        story.append(PageBreak())
    story.append(paragraph(f"0{group_index + 1}  {group['title'].split(' · ')[0]}", "SectionTitle"))
    for index, (title, slides, text) in enumerate(group["entries"], 1):
        story.append(KeepTogether([
            paragraph(f"{index:02d}  {title}", "NoteTitle"),
            paragraph(text, "NoteBody"),
            paragraph(references(slides), "Source"),
        ]))

story.append(PageBreak())
story.append(paragraph("Source emphasis index", "SectionTitle"))
story.append(paragraph(data["method"], "Intro"))
story.append(paragraph("Bold phrases are reproduced below as an audit of selection, not as an answer key. Repeated phrases are listed once with all their slide references. The study notes above explain or qualify misleading source wording.", "Intro"))
for group in data["groups"]:
    selected = [r for r in data["index"] if r["deck"] == group["deck"]]
    merged = OrderedDict()
    for row in selected:
        label = row["bold"]
        key = (label, row["speakerNote"])
        merged.setdefault(key, [])
        if row["slide"] not in merged[key]:
            merged[key].append(row["slide"])
    story.append(paragraph(group["title"].split(" · ")[0], "IndexTitle"))
    table_data = [[paragraph("Emphasized phrase / heading", "IndexHeader"), paragraph("Source slides", "IndexHeader")]]
    for (label, is_note), slides in merged.items():
        if is_note:
            label += " (speaker note)"
        table_data.append([paragraph(label, "Index"), paragraph(", ".join(map(str, slides)), "Index")])
    table = Table(table_data, colWidths=[394, 110], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LINEBELOW", (0, 1), (-1, -1), 0.3, LINE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, HexColor("#F4F7FB")]),
    ]))
    story.extend([table, Spacer(1, 16)])

doc = SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=48, leftMargin=48, topMargin=58, bottomMargin=54)
doc.build(story, onFirstPage=page_frame, onLaterPages=page_frame, canvasmaker=GuideCanvas)
reader = PdfReader(OUT)
text = "\n".join(page.extract_text() or "" for page in reader.pages)
for group in data["groups"]:
    for title, _, _ in group["entries"]:
        assert clean(title) in text, f"Missing PDF note: {title}"
assert "\ufffd" not in text, "Unexpected replacement glyph in PDF"
print(json.dumps({"path": str(OUT), "pages": len(reader.pages), "notes": sum(len(g["entries"]) for g in data["groups"]), "boldParagraphs": len(data["index"])}))
