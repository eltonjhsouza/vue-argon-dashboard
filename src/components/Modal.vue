<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">{{ localProduct.productName }}</slot>
        </div>
        {{ product }}
        <div >
          <img style="padding: 6px;" :src="currFlag" />
          <img  :src="flag_real" style="width: 30px; padding: 6px;"/>
          <img  :src="flag_ff" style="width: 30px; padding: 6px;"/>
          <img  :src="flag_temp" style="width: 26px; padding: 6px;"/>
          <span>22º</span>
        </div>

        <div class="modal-header">
          <span>Tamanho da Oportunidade</span>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col">
              <label for="serachVolum">Produto</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="Nome do Produto" v-model="localProduct.productName">
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="serachVolum">Volume de Buscas</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="02" v-model="localProduct.searchVolum">
            </div>
            <div class="col">
              <label for="serachVolum">Anunciantes</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="02" v-model="localProduct.qtdAdvertiser">
            </div>
            <div class="w-100"></div>
            <div class="col" style="margin-top: 10px">
              <label for="serachVolum">Página de Vendas</label>
              <select class="form-control" v-model="localProduct.salesPage">
                <option v-for="(option, index) in options" :value="option.value" :key="index">
                  {{ option.text }}
                </option>
              </select>
            </div>

            <div class="col" style="margin-top: 10px">
              <label for="serachVolum">Recorrencia</label>
              <select class="form-control" v-model="localProduct.isRecurrent">
                <option v-for="(option, index) in optionsrRecurrency" :value="option.value" :key="index">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
            <div class="row" style="margin: 10px">
              <div class="alert alert-dismissible fade show" :class="getCorrelacao" role="alert">
                  <span class="alert-text"><strong>Correlação: </strong>{{ product.correlacao }}</span>
                  <span class="alert-icon" style="margin-left: 0.5em"><i class="ni ni-like-2"></i></span>
              </div>
            </div>
        </div>
        

        <div class="modal-footer">
          <button type="button" @click="close" class="btn btn-outline-warning">Cancelar</button>
          <button type="button" class="btn alert-success" style="color: #fff" @click="save">Próximo</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import BR from "@/assets/img/icons/flags/BR.png";
import EUA from "@/assets/img/icons/flags/US.png";
import REAL from "@/assets/img/icons/flags/real.png";
import FF from "@/assets/img/icons/flags/ff.png";
import TEMP from "@/assets/img/icons/flags/temp.png";

const props = defineProps({
  show: Boolean,
  product: Object
})

let localProduct = ref({...props.product})
// let salesPage = ref(props.produ}ct.salesPage)
// let isRecurrent = ref(props.product.isRecurrent)

const flag_br = ref(BR)
const flag_eua = ref(EUA)
const flag_real = ref(REAL)
const flag_ff = ref(FF)
const flag_temp = ref(TEMP)
const currFlag = ref(flag_br.value)
const emit = defineEmits(['close'])

const options = ref([
  { text: 'Sim', value: true },
  { text: 'Não', value: false }
])

const optionsrRecurrency = ref([
  { text: 'Sim', value: true },
  { text: 'Não', value: false }
])

function close() {
  localProduct.value = {}
  console.log('fechou')
    emit('close');
}

const getCorrelacao = computed(() => {
  const type = props.product.correlacao
  if (type == 'Ótimo') return 'alert-success'
  if (type == 'Regular') return 'alert-warning text-black'
  if (type == 'Ruim') return 'alert-danger text-white'
  return 'alert-info' // valor padrão
})

function save(val) {
  Object.assign(localProduct.value, val)
  console.log(localProduct.value)
  // emit('saveProduct', localProduct.value)
}

// watch(() => salesPage.value, (newValue) => {
//   localProduct.value.salesPage = newValue
// }, { immediate: true })

watch(() => localProduct.value?.country, (newCountry) => {
  if (newCountry === 'br') {
    currFlag.value = flag_br.value
  } else if (newCountry === 'en') {
    currFlag.value = flag_eua.value
  }
}, { immediate: true })


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

/* .text-grey {
  color: #c9c9c9;
}
.text-black {
  color: #000000 !important;
} */
</style>