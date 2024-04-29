<template>
  <div class="card mb-4">
    <!-- <div class="card-header pb-0">
      <h6>Meta x Faturamento</h6>
    </div> -->
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Mês
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Orçamento
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Meta
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Faturamento
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Completion
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in results" :key="index">
              <td>
                <div class="d-flex px-2">
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{ item.month }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ `R$ ${item.budget},00`}}</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ `R$ ${item.meta},00`}}</span>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ `R$ ${item.faturamento},00`}}</span>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="me-2 text-xs font-weight-bold">60%</span>
                  <div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-gradient-info"
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 60%"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
    const results = [
      { month: 'Março', budget: 100, meta: 500, faturamento: 750, lucro: 0},
      { month: 'Fevereiro', budget: 70, meta: 400, faturamento: 500, lucro: 0},
      { month: 'Janeiro', budget: 30, meta: 100, faturamento: 200, lucro: 0}
    ]
</script>