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
                <span class="text-secondary text-xs font-weight-bold">{{item.temperature}}</span>
              </td>
              <td class="align-middle text-center">
                <span class="badge badge-sm bg-gradient-secondary">{{item.estrategia}}</span>
              </td>
              <td class="align-middle text-center">
                <!-- <span class="badge badge-sm" :class="getReason(item).key === 1 ? 'bg-gradient-success' : 'bg-gradient-error'">
                        {{ getReason(item).value.length > 10 ? getReason(item).value.substring(0, 10) + '...' : getReason(item).value }}
                </span> -->
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
    <modal
      :openModal="showModal"
      :isEdit="isEdit"
      style="z-index: 2"
      @close="showModal = false"
      @saveProduct="saveProduct"
      @addNewProduct="addNewProduct"
      :product="product">
    </modal>
    
  </div>
</template>

<script setup>
  import { onMounted, ref, toRaw } from 'vue'
  import Modal from '../../components/Modal.vue'
  import localStorage from 'localforage';
  // import Product from 
  // '../../Model/Product'

  localStorage.config({
      driver: localStorage.LOCALSTORAGE,
      storeName: 'products'
    });

  let showModal = ref(false)
  let product = ref({})
  let isEdit = ref(false)
  let products = ref([])
  let platforms = ref([])

  const reasons = [
   { key: 0, value: 'Sem oportunidade e nem possibilidade de ROI' },
   { key: 1, value: 'Só Bora' },
   { key:2, value: 'Sem oportunidade e nem possibilidade de ROI'},
   { key:3, value: 'Número de anunciantes acima do esperado'},
   { key:4, value: 'Comissão Abaixo de R$80,00'}
  ]

  function getReason(val) {
    let teste = reasons.filter(item => {
      return item.key === val.motivo
    })
    console.log(teste)

    return teste
  }

  console.log(getReason({ motivo: 1 }))

  function openModal (item) {
    product.value = item
    isEdit.value = true
    showModal.value = true
  
  }

  function openCreateModal () {
    product.value = {}
    showModal.value = true
    isEdit.value = false
  }
  
  function remove(item) {
    const index = products.value.findIndex(product => product.id === item.id);
    console.log(index)

    if (index !== -1) {
      products.value.splice(index, 1);
      localStorage.setItem('products', products.value).then(() => {
        console.log('Product removed from localforage');
      }).catch(err => {
        console.error('Error removing product from localforage', err);
      });
    }
  }
  
  function saveProduct(val) {
    showModal.value = false
    const index = products.value.findIndex(product => product.id === val.id);
      console.log("Product Salvo >>", products)
    
    if (index !== -1) {
      products[index] = toRaw(val.value);
      console.log("Product Salvo >>", products)
    }
  } 
  function addNewProduct(newProduct) {
    products.value.push(newProduct);
    showModal.value = false
    // adicionar ao localforage

    localStorage.setItem('products', products.value).then(() => {
      console.log('Products saved to localforage');
    }).catch(err => {
      console.error('Error saving products to localforage', err);
    });

    getProducts();
  }

  function getProducts() {
    localStorage.getItem('products').then((value) => {
      console.log(value)
      if (value) {
        products.value = value;
      }
    }).catch(err => {
      console.error('Error loading products from localforage', err);
    });
  }

  onMounted(() => {
    console.log('%cIACOPI!', 'color: green; font-size: 20px; font-weight: bold;');
    getProducts();
    localStorage.getItem('platforms').then((value) => {
      console.log(value)
      if (value) {
        platforms.value = value;
      }
    }).catch(err => {
      console.error('Error loading platforms from localforage', err);
    });
    
  })
</script>
<style scoped>
.bg-gradient-error {
  background-image: linear-gradient(310deg, #460202 0%, #ff5f67 100%);
}

</style>