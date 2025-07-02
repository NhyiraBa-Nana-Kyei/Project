function getAdvice(drug) {
  const rules = {
    "paracetamol": "Avoid overdose. Max 4g per day.",
    "ibuprofen": "Take with food to avoid ulcers.",
    "amoxicillin": "Finish full dose even if you feel better."
  };
  return rules[drug] || "No special advice for this drug.";
}

module.exports = { getAdvice };
