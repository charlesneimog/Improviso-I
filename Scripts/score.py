import os
from random import randint

if os.name == "nt":
    os.environ["QT_QPA_PLATFORM"] = "windows"
import sys

from neoscore.common import *


def getpitchKey(pitch, cents=0):
    note = {
        # natural
        "c": ["c", ""],
        "d": ["d", ""],
        "e": ["e", ""],
        "f": ["f", ""],
        "g": ["g", ""],
        "a": ["a", ""],
        "b": ["b", ""],
        # sharp
        "c#": ["c", "accidentalSharp"],
        "d#": ["d", "accidentalSharp"],
        "e#": ["e", "accidentalSharp"],
        "f#": ["f", "accidentalSharp"],
        "g#": ["g", "accidentalSharp"],
        "a#": ["a", "accidentalSharp"],
        "b#": ["b", "accidentalSharp"],
        # flat
        "cb": ["c", "accidentalFlat"],
        "db": ["d", "accidentalFlat"],
        "eb": ["e", "accidentalFlat"],
        "fb": ["f", "accidentalFlat"],
        "gb": ["g", "accidentalFlat"],
        "ab": ["a", "accidentalFlat"],
        "bb": ["b", "accidentalFlat"],
        # quarter-tone sharp
        "c+": ["c", "accidentalQuarterToneSharpStein"],
        "d+": ["d", "accidentalQuarterToneSharpStein"],
        "e+": ["e", "accidentalQuarterToneSharpStein"],
        "f+": ["f", "accidentalQuarterToneSharpStein"],
        "g+": ["g", "accidentalQuarterToneSharpStein"],
        "a+": ["a", "accidentalQuarterToneSharpStein"],
        "b+": ["b", "accidentalQuarterToneSharpStein"],
        # quarter-tone flat
        "c-": ["c", "accidentalQuarterToneFlatStein"],
        "d-": ["d", "accidentalQuarterToneFlatStein"],
        "e-": ["e", "accidentalQuarterToneFlatStein"],
        "f-": ["f", "accidentalQuarterToneFlatStein"],
        "g-": ["g", "accidentalQuarterToneFlatStein"],
        "a-": ["a", "accidentalQuarterToneFlatStein"],
        "b-": ["b", "accidentalQuarterToneFlatStein"],
        # three-quarter-tone sharp
        "c#+": ["c", "accidentalThreeQuarterTonesSharpStein"],
        "d#+": ["d", "accidentalThreeQuarterTonesSharpStein"],
        "e#+": ["e", "accidentalThreeQuarterTonesSharpStein"],
        "f#+": ["f", "accidentalThreeQuarterTonesSharpStein"],
        "g#+": ["g", "accidentalThreeQuarterTonesSharpStein"],
        "a#+": ["a", "accidentalThreeQuarterTonesSharpStein"],
        "b#+": ["b", "accidentalThreeQuarterTonesSharpStein"],
        # three-quarter-tone flat
        "cb-": ["c", "accidentalThreeQuarterTonesFlatZimmermann"],
        "db-": ["d", "accidentalThreeQuarterTonesFlatZimmermann"],
        "eb-": ["e", "accidentalThreeQuarterTonesFlatZimmermann"],
        "fb-": ["f", "accidentalThreeQuarterTonesFlatZimmermann"],
        "gb-": ["g", "accidentalThreeQuarterTonesFlatZimmermann"],
        "ab-": ["a", "accidentalThreeQuarterTonesFlatZimmermann"],
        "bb-": ["b", "accidentalThreeQuarterTonesFlatZimmermann"],
    }
    return note[pitch]


# ===============================================
# ===============================================
# ===============================================


def chord(pitches):
    try:
        neoscore.shutdown()
    except BaseException:
        pass
    neoscore.setup()
    if isinstance(pitches, str):
        pitches = [pitches]
    pitches = [x.lower() for x in pitches]
    firstChar = pitches[0][0]

    py4pdTMPfolder = "./public/notes/"
    staffSoprano = Staff((Mm(0), Mm(0)), None, Mm(30))
    trebleClef = "treble"
    Clef(ZERO, staffSoprano, trebleClef)
    staffBaixo = Staff((ZERO, Mm(20)), None, Mm(30))
    bassClef = "bass"
    Clef(ZERO, staffBaixo, bassClef)
    Path.rect(
        (Mm(-10), Mm(-10)),
        None,
        Mm(42),
        Mm(42),
        Brush(Color(255, 255, 255, 0)),
        Pen(thickness=Mm(0)),
    )

    pitch = ""
    for pitch in pitches:
        # in pitch remove not number
        pitchWithoutNumber = pitch.replace(pitch[-1], "")
        pitchOctave = int(pitch[-1])
        pitchClass, accidental = getpitchKey(pitchWithoutNumber)
        if pitchOctave < 4:
            Chordrest(
                Mm(10),
                staffBaixo,
                [(pitchClass, accidental, pitchOctave)],
                (int(1), int(1)),
            )
        else:
            Chordrest(
                Mm(10),
                staffSoprano,
                [(pitchClass, accidental, pitchOctave)],
                (int(1), int(1)),
            )
    thepitch = pitches[0]
    thepitch = thepitch.replace("#", "s")
    notePathName = py4pdTMPfolder + thepitch + ".png"
    neoscore.render_image(rect=None, dest=notePathName, dpi=600, wait=True)
    neoscore.shutdown()
    return None


# ===============================================
#   ["Cri", "ou"], ["o", "na", "da"] ["di", "an", "te"], ["tan", "to", "tu", "do"],  ["an", "te"];  ["tu", "do"];

import multiprocessing

processes = []
processesCalls = 0

# check if notes folder exists
if not os.path.exists("./public/notes/"):
    os.makedirs("./public/notes/")

if not os.path.exists("./public/notes/a/"):
    os.makedirs("./public/notes/a/")

if not os.path.exists("./public/notes/b/"):
    os.makedirs("./public/notes/b/")

if not os.path.exists("./public/notes/c/"):
    os.makedirs("./public/notes/c/")

if not os.path.exists("./public/notes/d/"):
    os.makedirs("./public/notes/d/")

if not os.path.exists("./public/notes/e/"):
    os.makedirs("./public/notes/e/")

if not os.path.exists("./public/notes/f/"):
    os.makedirs("./public/notes/f/")

if not os.path.exists("./public/notes/g/"):
    os.makedirs("./public/notes/g/")


def create_note(notename, accidental, octave):
    chord(notename + accidental + str(octave))


notenames = ["c", "d", "e", "f", "g", "a", "b"]

for notename in notenames:
    accidentals = ["", "#", "-"]
    for accidental in accidentals:
        for octave in range(3, 6):
            p = multiprocessing.Process(
                target=create_note, args=(notename, accidental, octave)
            )
            processes.append(p)
            p.start()
            processesCalls += 1
            if processesCalls == 16:
                print("Waiting for processes to finish")
                for p in processes:
                    p.join()
                processesCalls = 0
                processes = []
