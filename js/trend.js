async function loadTrend30(businessId, canvasId) {

  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - 30);

  const { data } = await supabaseClient
    .from("visits")
    .select("visit_date")
    .eq("business_id", businessId)
    .gte("visit_date", start.toISOString());

  const daily = {};

  data.forEach(v => {
    const d = new Date(v.visit_date).toISOString().split("T")[0];
    daily[d] = (daily[d] || 0) + 1;
  });

  const labels = [];
  const values = [];

  for (let i = 30; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    labels.push(key.slice(5));
    values.push(daily[key] || 0);
  }

  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Toplam Ziyaret",
        data: values,
        borderColor: "black"
      }]
    },
    options: { responsive: true }
  });
}


async function loadHourly7(businessId, canvasId) {

  const date = new Date();
  date.setDate(date.getDate() - 7);

  const { data } = await supabaseClient
    .from("visits")
    .select("visit_date")
    .eq("business_id", businessId)
    .gte("visit_date", date.toISOString());

  const hours = Array(24).fill(0);

  data.forEach(v => {
    const h = new Date(v.visit_date).getHours();
    hours[h]++;
  });

  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels: Array.from({ length: 24 }, (_, i) => i + ":00"),
      datasets: [{
        label: "Ziyaret",
        data: hours,
        backgroundColor: "black"
      }]
    },
    options: { responsive: true }
  });
}
