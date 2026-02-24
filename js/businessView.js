async function renderBusinessView(containerId, businessId, prefix) {

  const container = document.getElementById(containerId);

  container.innerHTML = `
    <div class="space-y-10">

      <!-- KPI -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-xs text-gray-500">Aktif Müşteri (30g)</p>
          <p id="${prefix}customers30" class="font-bold">0</p>
          <p id="${prefix}customersChange" class="text-xs"></p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Ziyaret (30g)</p>
          <p id="${prefix}visits30" class="font-bold">0</p>
          <p id="${prefix}visitsChange" class="text-xs"></p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Tekrar Oranı (30g)</p>
          <p id="${prefix}repeat30" class="font-bold">0%</p>
          <p id="${prefix}repeatChange" class="text-xs"></p>
        </div>
      </div>

      <!-- SEGMENT 7 -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-xs text-gray-500">Yeni (7g)</p>
          <p id="${prefix}segmentNew7" class="font-bold">0</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Gelişen (7g)</p>
          <p id="${prefix}segmentGrow7" class="font-bold">0</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Sadık (7g)</p>
          <p id="${prefix}segmentLoyal7" class="font-bold">0</p>
        </div>
      </div>

      <!-- SEGMENT 30 -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-xs text-gray-500">Yeni (30g)</p>
          <p id="${prefix}segmentNew30" class="font-bold">0</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Gelişen (30g)</p>
          <p id="${prefix}segmentGrow30" class="font-bold">0</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Sadık (30g)</p>
          <p id="${prefix}segmentLoyal30" class="font-bold">0</p>
        </div>
      </div>

      <!-- BAND -->
      <div>
        <h3 class="font-semibold mb-2">Harcama Bandı (30g)</h3>
        <div id="${prefix}band30"></div>
      </div>

      <!-- TREND -->
      <div>
        <canvas id="${prefix}trend30"></canvas>
      </div>

    </div>
  `;

  await loadKPIs(businessId, prefix);
  await loadSegments(businessId, 7, prefix);
  await loadSegments(businessId, 30, prefix);
  await loadBand(businessId, 30, prefix + "band30");
  await loadTrend30(businessId, prefix + "trend30");
}
