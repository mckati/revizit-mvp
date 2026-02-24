async function loadSegments(businessId, days, prefix = "") {

  const date = new Date();
  date.setDate(date.getDate() - days);

  const { data } = await supabaseClient
    .from("visits")
    .select("customer_id")
    .eq("business_id", businessId)
    .gte("visit_date", date.toISOString());

  const counts = {};

  data.forEach(v => {
    counts[v.customer_id] = (counts[v.customer_id] || 0) + 1;
  });

  let newCount = 0;
  let growCount = 0;
  let loyalCount = 0;

  Object.values(counts).forEach(c => {
    if (c === 1) newCount++;
    else if (c <= 4) growCount++;
    else loyalCount++;
  });

  if (days === 7) {
    document.getElementById(prefix + "segmentNew7").innerText = newCount;
    document.getElementById(prefix + "segmentGrow7").innerText = growCount;
    document.getElementById(prefix + "segmentLoyal7").innerText = loyalCount;
  } else {
    document.getElementById(prefix + "segmentNew30").innerText = newCount;
    document.getElementById(prefix + "segmentGrow30").innerText = growCount;
    document.getElementById(prefix + "segmentLoyal30").innerText = loyalCount;
  }
}
