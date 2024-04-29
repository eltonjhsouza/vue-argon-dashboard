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
    type: "doughnut",
    data: {
      labels: [
        'Anular',
        'Testar',
        'Total'
      ],
      datasets: [{
        label: '',
        data: [10, 5, 15],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Doughnut Chart'
        }
      }
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
      <div class="chart" style="height: 337px; margin-left: 50px">
        <canvas
          :id="props.id"
          class="chart-canvas"          
        ></canvas>
      </div>
    </div>
  </div>
</template>
