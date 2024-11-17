<template>
  <div class="card">
    <div class="card-header pb-0" style="display: flex; justify-content: space-between">
      <h6>Plataformas</h6>
      {{ showModal }}
      <button type="button" class="btn btn-success" @click="openCreateModal()">Adicionar</button>
    </div>
    <div class="card-body px-0 pt-0 pb-2" style="min-height: 60vh;">
      <div class="table-responsive p-0" style="min-height: 40vh;">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Name
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Link
            </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in platforms" :key="index">
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
                    <h6 class="mb-0 text-sm">{{item.name}}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{item.url}}</p>
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
      @savePlatform="savePlatform"
      @addNewPlatform="addNewPlatform"
      :platform="plaform">
    </modal>
    
  </div>
</template>

<script setup>
  import { onMounted, ref, toRaw } from 'vue'
  import Modal from '../../components/ModalPlatform.vue'
  import localforage from 'localforage';

  localforage.config({
      driver: localforage.LOCALSTORAGE,
      storeName: 'platforms'
    });

  let showModal = ref(false)
  let platform = ref({})
  let isEdit = ref(false)

  let platforms = ref([])

  function openModal (item) {
    platform.value = item
    isEdit.value = true
    showModal.value = true
  
  }

  function openCreateModal () {
    platform.value = { id: 0, name: '', url: '', image: '' }
    showModal.value = true
    isEdit.value = false
  }
  
  function remove(item) {
    const index = platforms.value.findIndex(platform => platform.id === item.id);
    console.log(index)

    if (index !== -1) {
      platforms.value.splice(index, 1);
    }
  }
  
  function savePlatform(val) {
    showModal.value = false
    const index = platfoms.value.findIndex(platform => platform.id === val.id);
      console.log("Product Salvo >>", platforms)
    
    if (index !== -1) {
      platforms[index] = toRaw(val.value);
      console.log("Product Salvo >>", platforms)
    }
  }

  function addNewPlatform(newPlatform) {
    platforms.value.push(toRaw(newPlatform));
    showModal.value = false
    // adicionar ao localforage

    localforage.setItem('platforms', platforms.value).then(() => {
      console.log('Platforms saved to localforage');
    }).catch(err => {
      console.error('Error saving platforms to localforage', err);
    });
    
  }

  onMounted(() => {
    localforage.getItem('platforms').then((value) => {
      if (value) {
        platforms.value = value;
      }
    }).catch(err => {
      console.error('Error getting platforms from localforage', err);
    });
  });

</script>
<style scoped>
.bg-gradient-error {
  background-image: linear-gradient(310deg, #460202 0%, #ff5f67 100%);
}

</style>