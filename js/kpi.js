function calcChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function formatChange(p) {
  if (p > 0) return `<span class="text-green-600">↑ ${p}%</span>`;
  if (p < 0) return `<span class="text-red-600">↓ ${Math.abs(p)}%</span>`;
  return `<span class="text-gray-500">→ 0%</span>`;
}

async function loadKPIs(businessId, prefix = "") {

  const now = new Date();
  const startCurrent = new Date();
  startCurrent.setDate(now.getDate() - 30);

  const startPrevious = new Date();
  startPrevious.setDate(now.getDate() - 60);

  const { data: current } = await supabaseClient
    .from("visits")
    .select("customer_id")
    .eq("business_id", businessId)
    .gte("visit_date", startCurrent.toISOString());

  const { data: previous } = await supabaseClient
    .from("visits")
    .select("customer_id")
    .eq("business_id", businessId)
    .gte("visit_date", startPrevious.toISOString())
    .lt("visit_date", startCurrent.toISOString());

  const curSet = new Set(current.map(v => v.customer_id));
  const prevSet = new Set(previous.map(v => v.customer_id));

  const curRepeat = curSet.size > 0
    ? Math.round((current.length / curSet.size - 1) * 100)
    : 0;

  const prevRepeat = prevSet.size > 0
    ? Math.round((previous.length / prevSet.size - 1) * 100)
    : 0;

  document.getElementById(prefix + "customers30").innerText = curSet.size;
  document.getElementById(prefix + "visits30").innerText = current.length;
  document.getElementById(prefix + "repeat30").innerText = curRepeat + "%";

  document.getElementById(prefix + "customersChange").innerHTML =
    formatChange(calcChange(curSet.size, prevSet.size));

  document.getElementById(prefix + "visitsChange").innerHTML =
    formatChange(calcChange(current.length, previous.length));

  document.getElementById(prefix + "repeatChange").innerHTML =
    formatChange(calcChange(curRepeat, prevRepeat));
}
