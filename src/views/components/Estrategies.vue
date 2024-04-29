<template>
  <div class="card">
    <div class="card-header pb-0" style="display: flex; justify-content: space-between">
      <h6>Anulação Estratégica</h6>
      <button type="button" class="btn btn-success" @click="openCreateModal()">Novo</button>
    </div>
    <div class="card-body px-0 pt-0 pb-2" style="min-height: 60vh;">
      <div class="table-responsive p-0" style="min-height: 40vh;">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Produto
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Plataforma
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Correlação
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Data
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Graus
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Estratégia
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >Motivo
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      :src="item.image"
                      class="avatar avatar-sm me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{item.productName}}</h6>
                    <!-- <p class="text-xs text-secondary mb-0">
                      john@creative-tim.com
                    </p> -->
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{item.plataforma}}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm" :class="item.correlacao === 'Ruim' ? 'bg-gradient-error' : 'bg-gradient-success'">{{item.correlacao}}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{item.date}}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{item.graus}}</span>
              </td>
              <td class="align-middle text-center">
                <span class="badge badge-sm bg-gradient-secondary">{{item.estrategia}}</span>
              </td>
              <td class="align-middle text-center">
                <span class="badge badge-sm" :class="getReason(item).key === 1 ? 'bg-gradient-success' : 'bg-gradient-error'">
                        {{ getReason(item).value.length > 10 ? getReason(item).value.substring(0, 10) + '...' : getReason(item).value }}
                </span>
              </td>
              <td class="align-middle">
                <i
                  class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title
                  aria-hidden="true"
                  data-bs-original-title="Edit Card"
                  aria-label="Edit Card"
                  style="margin: 10px"
                  @click="openModal(item)"
                ></i>
                <span class="sr-only">Edit</span>
                <i
                  class="fas fa-trash-alt ms-auto text-dark cursor-pointer"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title
                  aria-hidden="true"
                  data-bs-original-title="Edit Card"
                  @click="remove(item)"
                ></i>
                <span class="sr-only">Remove</span>
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <modal :show="showModal"
    style="z-index: 2"
    @close="showModal = false"
    @saveProduct="saveProduct"
    :product="product">
      <template #header>
        <h3>{{product.productName}}</h3>
      </template>
    </modal>

  <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-5">Update your information.</span>
      <div class="flex align-items-center gap-3 mb-3">
          <label for="username" class="font-semibold w-6rem">Username</label>
          <InputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
          <label for="email" class="font-semibold w-6rem">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
          <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
  </Dialog>
    
  </div>
</template>

<script setup>
  import { ref, toRaw } from 'vue'
  import Modal from '../../components/Modal.vue'
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';



  const showModal = ref(false)
  const visible = ref(false)
  const product = ref({})
  const isEdit = ref(false)

  const reasons = [
   { key: 0, value: 'Sem oportunidade e nem possibilidade de ROI' },
   { key: 1, value: 'Só Bora' },
   { key:2, value: 'Sem oportunidade e nem possibilidade de ROI'},
   { key:3, value: 'Número de anunciantes acima do esperado'},
   { key:4, value: 'Comissão Abaixo de R$80,00'}
  ]

  let products = ref([
    {
      id: 1,
      date: '19/03/2024',
      image: 'https://static-media.hotmart.com/z5e6xuzWyxmPeviTlLhJRQLF8CQ=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/880dbcbc-efca-4d6d-81c4-db782cbd00f8/minidvg.jpg?w=920',
      productName: 'método dvg - decolando vendas com o google',
      graus: 9,
      plataforma: 'Hotmart',
      correlacao: 'Ótimo',
      motivo: 1,
      estrategia: 'E1',
      searchVolum: 10,
      qtdAdvertiser: 10,
      salesPage: true,
      isRecurrent: true,
      country: 'br',
      currentcy: 'real',
      isFF: true
    },
    {
      id: 2,
      date: '17/03/2024',
      image: 'https://static-media.hotmart.com/VQg2zFVbcKu8EvZhlOh0N7TusyI=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/0d378e11-b688-4ab1-8af8-bd9f24e10249/IMG_8661.PNG?w=920',
      productName: 'Ferramenta bot milionario',
      graus: 35,
      plataforma: 'Hotmart',
      correlacao: 'Ótimo',
      motivo: 1,
      estrategia: 'E1',
      searchVolum: 10,
      qtdAdvertiser: 10,
      salesPage: true,
      isRecurrent: true,
      country: 'br',
      currentcy: 'real',
      isFF: true
    },
    {
      id:3,
      date: '16/03/2024',
      image: 'https://media.licdn.com/dms/image/D4D0BAQE9zhy7ETHd2g/company-logo_200_200/0/1685379556850/filtrify_logo?e=1718841600&v=beta&t=Y2WlsrEaS2akmPSclt1wfcXVh806LfuEKMRW_39mT5k',
      productName: 'Filtrify',
      graus: 22,
      plataforma: 'Hotmart',
      correlacao: 'Regular',
      motivo: 1,
      estrategia: 'E1',
      searchVolum: 10,
      qtdAdvertiser: 10,
      salesPage: false,
      isRecurrent: true,
      country: 'en',
      currentcy: 'real',
      isFF: true
    },
    {
      id: 4,
      date: '16/03/2024',
      image: 'https://static-media.hotmart.com/LASECP5sHhoCYYnQsM9_AqTPQfA=/filters:background_color(white)/hotmart/product_pictures/79127419-9729-4192-8209-d9f432060da0/CapaMetodoRav.jpeg',
      productName: 'Método RAV',
      graus: 18,
      plataforma: 'Hotmart',
      correlacao: 'Ruim',
      motivo: 0,
      estrategia: 'E1',
      searchVolum: 10,
      qtdAdvertiser: 10,
      salesPage: true,
      isRecurrent: true,
      country: 'br',
      currentcy: 'real',
      isFF: true
    },
  ])

  function getReason(val) {
    let teste = reasons.filter(item => {
      return item.key === val.motivo
    })
    console.log(teste[0].value)

    return teste[0]
  }

  function openModal (item) {
    showModal.value = true
    product.value = item
  }

  function openCreateModal () {
    showModal.value = true
    isEdit.value = false
  }
  
function remove(item) {
  const index = products.value.findIndex(product => product.id === item.id);
  console.log(index)

  if (index !== -1) {
    products.value.splice(index, 1);
  }
}
 
  function saveProduct(val) {
    showModal.value = false
    const index = products.findIndex(product => product.id === val.id);
      console.log("Product Salvo >>", products)
    
    if (index !== -1) {
      products[index] = toRaw(val.value);
      console.log("Product Salvo >>", products)
    }

  } 
</script>
<style scoped>
.bg-gradient-error {
  background-image: linear-gradient(310deg, #460202 0%, #ff5f67 100%);
}

</style>