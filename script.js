function verifyDrug() {
  const drug = document.getElementById("verifyInput").value;
  fetch(`/verify?name=${drug}`)
    .then(res => res.json())
    .then(data => {
      const result = document.getElementById("verifyResult");
      result.innerHTML = data.found 
        ? `<strong>${data.name}</strong>: ${data.use}` 
        : "Drug not found.";
    });
}

function checkInteraction() {
  const drugA = document.getElementById("drugA").value;
  const drugB = document.getElementById("drugB").value;
  fetch(`/interaction?drugA=${drugA}&drugB=${drugB}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("interactionResult").innerText = 
        data.found ? data.message : "No known interaction.";
    });
}

function setReminder() {
  const drug = document.getElementById("reminderDrug").value;
  const time = document.getElementById("reminderTime").value;
  const now = new Date();
  const [h, m] = time.split(":");
  const reminderTime = new Date();
  reminderTime.setHours(h, m, 0);

  const delay = reminderTime - now;
  const status = document.getElementById("reminderStatus");

  if (delay > 0) {
    status.innerText = `Reminder set for ${time} to take ${drug}.`;
    setTimeout(() => {
      alert(`⏰ Time to take: ${drug}`);
    }, delay);
  } else {
    status.innerText = "Enter a future time.";
  }
}

function getAIAdvice() {
  const drug = document.getElementById("aiDrugInput").value;
  fetch(`/ai?name=${drug}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("aiAdviceResult").innerText = data.advice;
    });
}
