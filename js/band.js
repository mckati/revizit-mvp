async function loadBand(businessId, days, elementId) {

  const date = new Date();
  date.setDate(date.getDate() - days);

  const { data } = await supabaseClient
    .from("visits")
    .select("spending_band")
    .eq("business_id", businessId)
    .gte("visit_date", date.toISOString());

  const bands = {
    "0-250": 0,
    "251-500": 0,
    "501-1000": 0,
    "1001+": 0
  };

  data.forEach(v => {
    if (bands[v.spending_band] !== undefined) {
      bands[v.spending_band]++;
    }
  });

  const total = data.length;
  let html = "";

  for (let band in bands) {

    const percent = total > 0
      ? Math.round((bands[band] / total) * 100)
      : 0;

    html += `
      <div class="mb-2">
        <div class="flex justify-between text-sm">
          <span>${band}</span>
          <span>${percent}%</span>
        </div>
        <div class="w-full bg-gray-200 h-2 rounded">
          <div class="bg-black h-2 rounded" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  }

  document.getElementById(elementId).innerHTML = html;
}
