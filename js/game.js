const CLUES = [
    {
        id: "log",
        label: "Logbook",
        x: "8%", y: "62%",
        tag: "Desk · Open",
        title: "The Logbook",
        body: "Entries run clean every hour until 03:30 — 'All well. Wind SW, 15 knots.'\n\nThe next line is unfinished. Only three words: 'Ship — south, too clo—'\n\nNo further entries."
    },



    {
        id: "lens",
        label: "Fresnel Lens",
        x: "62%", y: "34%",
        tag: "Lamp Room · Centre",
        title: "The Fresnel Lens",
        body: "The lens itself is undamaged — every prism intact.\n\nBut the rotation mechanism has been disengaged. The lens is fixed, pointed south-southwest.\n\nA working lighthouse sweeps 360°. This one stopped facing a single direction."
    },



    {
        id: "oil",
        label: "Oil Reservoir",
        x: "22%", y: "30%",
        tag: "Supply · Base of Lamp",
        title: "The Oil Reservoir",
        body: "Three-quarters full. Enough for four more hours of burn.\n\nThe wick is trimmed fresh — clean cut, no char. Someone prepared this lamp recently, and with care."
    },


    {
        id: "chart",
        label: "Tide Chart",
        x: "14%", y: "12%",
        tag: "Wall · Pinned",
        title: "The Tide Chart",
        body: "This week's tides, marked in pencil.\n\nAt the bottom, in the keeper's hand: 'South reef exposed — 03:40. Low water.'\n\nThe time is underlined twice."
    },



    {
        id: "binoculars",
        label: "Binoculars",
        x: "78%", y: "14%",
        tag: "Windowsill · Left Out",
        title: "The Binoculars",
        body: "Resting on the sill, still focused.\n\nPointed south-southwest — the same direction the lens is fixed.\n\nSalt spray on the objective lenses. They were used recently, in weather."
    },


    {
        id: "door",
        label: "Door",
        x: "82%", y: "72%",
        tag: "Exit · Seaward",
        title: "The Door",
        body: "The outer bolt is unlatched. The door is closed but not locked.\n\nWet footprints lead out across the walkway. None lead back.\n\nThe last set of prints is barefoot — the keeper's boots are still here, by the door."
    }


];




const DEDUCTION = {
    prompt: "The light stopped at 03:47 AM. Why?",
    options: [
        "The lamp ran out of oil.",
        "The keeper abandoned his post in fear.",
        "The keeper stopped the rotation to hold the beam on a ship in danger.",
        "The lens cracked in the storm."
    ],
    correct: 2,
    successTitle: "Case Closed",
    successBody: "there should be a clue to be added here clue 1!!!"
};

const found = new Set();
let solved = false;
const TOTAL_CLUES = CLUES.length;

const sceneEl = document.getElementById("scene");



const journalList = document.getElementById("journal-list");

const countEl = document.getElementById("clue-count");

const panel = document.getElementById("panel");

const panelTag = document.getElementById("panel-tag");



const panelTitle = document.getElementByIdmentById("panel-title");

const panelBody = document.getElementById("panel-body");

const panelClose = document.getElementById("panel-close");

const deductionEl = document.getElementById("deduction");

const promptEl = document.getElementById("deduction-prompt");



const optionsEl = document.getElementById("deduction-options");

const feedbackEl = document.getElementById("deduction-feedback");


const endingEl = document.getElementById("ending");

const endingTitle = document.getElementById("ending-title");

const endingBody = document.getElementById("ending-body");



