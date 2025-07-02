const express = require("express");
const fs = require("fs");
const path = require("path");
const ai = require("./ai/logic");

const app = express();
app.use(express.static(__dirname));
app.use(express.json());

app.get("/verify", (req, res) => {
  const drugName = req.query.name.toLowerCase();
  const drugs = JSON.parse(fs.readFileSync("./data/drugs.json"));
  const found = drugs.find(d => d.name.toLowerCase() === drugName);
  res.json(found ? { found: true, ...found } : { found: false });
});

app.get("/interaction", (req, res) => {
  const { drugA, drugB } = req.query;
  const interactions = [
    {
      pair: ["paracetamol", "ibuprofen"],
      message: "Mild interaction. Monitor stomach discomfort."
    },
    {
      pair: ["amoxicillin", "ibuprofen"],
      message: "Safe combination, monitor for allergy."
    }
  ];
  const a = drugA.toLowerCase(), b = drugB.toLowerCase();
  const result = interactions.find(i => i.pair.includes(a) && i.pair.includes(b));
  res.json(result ? { found: true, message: result.message } : { found: false });
});

app.get("/ai", (req, res) => {
  const name = req.query.name.toLowerCase();
  const advice = ai.getAdvice(name);
  res.json({ advice });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`MediScan AI running on http://localhost:${PORT}`));
