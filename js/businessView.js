async function renderBusinessView(containerId, businessId, prefix) {

  const container = document.getElementById(containerId);

  container.innerHTML = `
    <div class="space-y-12">

      <!-- KPI -->
      <div>
        <h2 class="text-lg font-semibold mb-4">Son 30 Gün Performansı</h2>

        <div class="grid grid-cols-3 gap-4 text-center">

          <div class="bg-gray-50 p-4 rounded">
            <p class="text-xs text-gray-500">Aktif Müşteri (30g)</p>
            <p id="${prefix}customers30" class="text-xl font-bold">0</p>
            <p id="${prefix}customersChange" class="text-xs mt-1"></p>
          </div>

          <div class="bg-gray-50 p-4 rounded">
            <p class="text-xs text-gray-500">Ziyaret (30g)</p>
            <p id="${prefix}visits30" class="text-xl font-bold">0</p>
            <p id="${prefix}visitsChange" class="text-xs mt-1"></p>
          </div>

          <div class="bg-gray-50 p-4 rounded">
            <p class="text-xs text-gray-500">Tekrar Oranı (30g)</p>
            <p id="${prefix}repeat30" class="text-xl font-bold">0%</p>
            <p id="${prefix}repeatChange" class="text-xs mt-1"></p>
          </div>

        </div>

        <p class="text-xs text-gray-400 mt-3">
          Tüm Zamanlar:
          <span id="${prefix}allCustomers">0</span> müşteri •
          <span id="${prefix}allVisits">0</span> ziyaret
        </p>
      </div>

      <!-- SEGMENT 7 -->
      <div>
        <h3 class="font-semibold mb-4">Son 7 Gün Segmentasyonu</h3>

        <div class="grid grid-cols-3 gap-4 text-center">

          <div class="bg-green-50 p-4 rounded">
            <p class="text-xs text-gray-500">Yeni (1 ziyaret)</p>
            <p id="${prefix}segmentNew7"
               class="text-xl font-bold text-green-600">0</p>
          </div>

          <div class="bg-yellow-50 p-4 rounded">
            <p class="text-xs text-gray-500">Gelişen (2–4 ziyaret)</p>
            <p id="${prefix}segmentGrow7"
               class="text-xl font-bold text-yellow-600">0</p>
          </div>

          <div class="bg-blue-50 p-4 rounded">
            <p class="text-xs text-gray-500">Sadık (5+ ziyaret)</p>
            <p id="${prefix}segmentLoyal7"
               class="text-xl font-bold text-blue-600">0</p>
          </div>

        </div>
      </div>

      <!-- SEGMENT 30 -->
      <div>
        <h3 class="font-semibold mb-4">Son 30 Gün Segmentasyonu</h3>

        <div class="grid grid-cols-3 gap-4 text-center">

          <div class="bg-green-50 p-4 rounded">
            <p class="text-xs text-gray-500">Yeni (1 ziyaret)</p>
            <p id="${prefix}segmentNew30"
               class="text-xl font-bold text-green-600">0</p>
          </div>

          <div class="bg-yellow-50 p-4 rounded">
            <p class="text-xs text-gray-500">Gelişen (2–4 ziyaret)</p>
            <p id="${prefix}segmentGrow30"
               class="text-xl font-bold text-yellow-600">0</p>
          </div>

          <div class="bg-blue-50 p-4 rounded">
            <p class="text-xs text-gray-500">Sadık (5+ ziyaret)</p>
            <p id="${prefix}segmentLoyal30"
               class="text-xl font-bold text-blue-600">0</p>
          </div>

        </div>
      </div>

      <!-- BAND 7 -->
      <div>
        <h3 class="font-semibold mb-2">Harcama Bandı (7g)</h3>
        <div id="${prefix}band7"></div>
      </div>

      <!-- BAND 30 -->
      <div>
        <h3 class="font-semibold mb-2">Harcama Bandı (30g)</h3>
        <div id="${prefix}band30"></div>
      </div>

      <!-- TREND 30 -->
      <div>
        <h3 class="font-semibold mb-2">30 Gün Günlük Trend</h3>
        <canvas id="${prefix}trend30"></canvas>
      </div>

      <!-- TREND 7 HOURLY -->
      <div>
        <h3 class="font-semibold mb-2">7 Gün Saatlik Yoğunluk</h3>
        <canvas id="${prefix}trend7hour"></canvas>
      </div>

    </div>
  `;

  await loadKPIs(businessId, prefix);

  let { count: allCustomers } = await supabaseClient
    .from("customers")
    .select("*", { count: "exact", head: true })
    .eq("business_id", businessId);

  let { count: allVisits } = await supabaseClient
    .from("visits")
    .select("*", { count: "exact", head: true })
    .eq("business_id", businessId);

  document.getElementById(prefix + "allCustomers").innerText =
    allCustomers || 0;

  document.getElementById(prefix + "allVisits").innerText =
    allVisits || 0;

  await loadSegments(businessId, 7, prefix);
  await loadSegments(businessId, 30, prefix);

  await loadBand(businessId, 7, prefix + "band7");
  await loadBand(businessId, 30, prefix + "band30");

  await loadTrend30(businessId, prefix + "trend30");
  await loadHourly7(businessId, prefix + "trend7hour");
}
