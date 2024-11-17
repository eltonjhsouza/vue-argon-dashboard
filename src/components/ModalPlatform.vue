<template>
  <Transition name="modal">
    <div v-if="openModal" class="modal-mask">
      <div>
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{localplatform.name}}</h3>
          </div>
          <div class="row">
            <div class="col">
              <label for="serachVolum">Plataforma</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="Nome da Plataforma" v-model="localplatform.name">
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="serachVolum">Link</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="Nome da Plataforma" v-model="localplatform.url">
            </div>
          </div>
            <div class="modal-footer">
              <button type="button" @click="close" class="btn btn-outline-warning">Cancelar</button>
              <button v-if="isEdit" type="button" class="btn alert-success" style="color: #fff" @click="save">Próximo</button>
              <button v-else type="button" class="btn alert-success" style="color: #fff" @click="addNew">Adicionar</button>
            </div>
          </div>
        </div>
    </div>
  </Transition>
</template>

<script setup>
// import { computed } from 'vue'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  openModal: Boolean,
  isEdit: Boolean,
  platform: {
    id: Number,
    image: String,
    name: String,
    url: String
  }
})

let localplatform = ref(props.platform || { id: null, image: '', name: '', url: '' })
// computed(() => props.platform)
const emit = defineEmits(['close'])

function close() {
    emit('close');
}

function save() {
  emit('savePlatform', localplatform.value)
}

function addNew() {
  if (!localplatform.value.name || !localplatform.value.url) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  emit('addNewPlatform', localplatform.value);
}


</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 55vw;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  min-width: 160px;
  z-index: 1;
  background-color: #f6f9fc;
}

.dropdown-content option {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content option:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}
</style>