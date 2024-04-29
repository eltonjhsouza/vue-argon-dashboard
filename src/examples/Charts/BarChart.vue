<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: "300",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  chart: {
    type: Object,
    required: true,
    labels: Array,
    datasets: {
      type: Array,
      label: String,
      data: Array,
    },
  },
});

onMounted(() => {
  var gradientLineChart = document.getElementById(props.id).getContext("2d");

  // var gradientStroke1 = gradientLineChart.createLinearGradient(0, 230, 0, 50);

  // gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
  // gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
  // gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

  // var gradientStroke2 = gradientLineChart.createLinearGradient(0, 230, 0, 50);

  // gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
  // gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");
  // gradientStroke2.addColorStop(0, "rgba(20,23,39,0)"); //purple colors
  // eslint-disable-next-line no-undef
  // let labels = Utils.months({count: 12});
  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  new Chart(gradientLineChart, {
    type: "bar",
    data: {
      labels: [
                'Dom',
                'Seg',
                'Ter',
                'Qua',
                'Qui',
                'Sex',
                'Sáb'
              ],
      datasets: [{
        label: 'Campanhas Ativas',
        data: [5, 5, 4, 5, 6, 5, 7],
        backgroundColor: [
          'rgba(45, 206, 137, 100)',
        ],
        borderWidth: 1
      },
      {
        label: 'Campanhas Pausadas',
        data: [3, 3, 4, 3, 2, 3, 1],
        backgroundColor: [
          'rgba(245, 54, 92, 100)',
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#fbfbfb",
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: true,
            display: false,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#ccc",
            padding: 20,
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  });
});
</script>
<template>
  <div class="card z-index-2">
    <div class="pb-0 card-header mb-0">
      <h6>{{ props.title }}</h6>
      <!--  eslint-disable-next-line vue/no-v-html -->
      <p v-if="props.description" class="text-sm" v-html="props.description" />
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas
          :id="props.id"
          class="chart-canvas"
          :height="props.height"
        ></canvas>
      </div>
    </div>
  </div>
</template>
