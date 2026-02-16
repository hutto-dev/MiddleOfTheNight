document.getElementById("calc").addEventListener("click", calculate);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calculate();
});

function calculate() {
  const wakeVal = document.getElementById("wakeTime").value;
  const hours = parseInt(document.getElementById("sleepHours").value);
  const minutes = parseInt(document.getElementById("sleepMins").value);
  if (!wakeVal) return;

  const [wH, wM] = wakeVal.split(":").map(Number);
  const totalMin = hours * 60 + minutes;

  let bedM = wM - (totalMin % 60);
  let carry = Math.floor(totalMin / 60);
  if (bedM < 0) {
    bedM += 60;
    carry++;
  }
  const bedH = (((wH - carry) % 24) + 24) % 24;

  const ampm = bedH < 12 ? "am" : "pm";
  const h12 = bedH % 12 === 0 ? 12 : bedH % 12;
  const minStr = bedM.toString().padStart(2, "0");

  const wAmpm = wH < 12 ? "am" : "pm";
  const wH12 = wH % 12 === 0 ? 12 : wH % 12;
  const wMin = wM.toString().padStart(2, "0");

  const parts = [];
  if (hours > 0) parts.push(`${hours} hr${hours !== 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} min`);

  document.getElementById("bedtimeDisplay").textContent = `${h12}:${minStr}`;
  document.getElementById("ampmDisplay").textContent = ampm;
  document.getElementById("summaryText").innerHTML =
    `<strong>${parts.join(" ")}</strong> of sleep &nbsp;·&nbsp; wake at <strong>${wH12}:${wMin} ${wAmpm}</strong>`;

  const el = document.getElementById("result");
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "";
  el.style.display = "flex";
  setTimeout(
    () => el.scrollIntoView({ behavior: "smooth", block: "center" }),
    60,
  );
}
