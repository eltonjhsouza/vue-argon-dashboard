<template>
  <Transition name="modal">
    <div v-if="openModal" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{localProduct.productName}}</h3>
        </div>
        <div style="display: flex; margin-top: 10px">
          <div>
            <div class="dropdown">
              <img style="padding: 6px; cursor: pointer;" :src="currFlag" />
              <div class="dropdown-content" >
                <option href="#" v-for="item in pais" :key="item.value" @click="selectCountry(item)">
                  {{ item.text }}
                </option>
              </div>
            </div>
            
            <div class="dropdown">
              <img :src="localProduct.currentcy === 'USD' ? flag_dolar : flag_real" style="width: 30px; padding: 6px;"/>
              <div class="dropdown-content" >
                <option v-for="(option, index) in optionsCurrency" @click="selectCurrency(option)" :key="index">
                  {{ option.text }}
                </option>
              </div>
            </div>
          </div>
          <div style="margin-left: 10px;">
            <div>
            <span style="margin-left: 10px;">Plataforma: </span>
              <select class="form-control form-control-sm" style=" margin-left: 10px;" v-model="localProduct.plataforma">
                <option v-for="(itemPlatform, index) in optionsPlatform" @click="selectPlatform(itemPlatform)" :key="index">
                  {{ itemPlatform.text }}
                </option>
              </select>
            </div>
          </div>
        </div>

          <div class="row">
            <div class="col">
              <label for="serachVolum">Produto</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="Nome do Produto" v-model="localProduct.productName">
            </div>
          </div>

        <div class="modal-header">
          <span>Tamanho da Oportunidade</span>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col">
              <label for="serachVolum">Volume de Buscas</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="2" v-model="localProduct.searchVolum">
            </div>
            <div class="col">
              <label for="serachVolum">Anunciantes</label>
              <input type="text" class="form-control" id="serachVolum" placeholder="2" v-model="localProduct.qtdAdvertiser">
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
          <div class="row">
            <div class="col" style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
              <label for="serachVolum">Fundo de Funil</label>
              <input type="checkbox" v-model="localProduct.isFF" @click="selectFF">
            </div>

            <div class="col">
              <label for="temperature">Temperatura</label>
              <img :src="flag_temp" style="width: 30px; padding: 6px;"/>
              <input type="text" class="form-control" id="temperature" placeholder="22" v-model="localProduct.temperature">
            </div>
          </div>
        </div>
        

        <div class="modal-footer">
          <button type="button" @click="close" class="btn btn-outline-warning">Cancelar</button>
          <button v-if="isEdit" type="button" class="btn alert-success" style="color: #fff" @click="save">Próximo</button>
          <button v-else type="button" class="btn alert-success" style="color: #fff" @click="addNew">Adicionar</button>
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
import DOLAR from "@/assets/img/icons/flags/dolar.png";
import FF from "@/assets/img/icons/flags/ff.png";
import TEMP from "@/assets/img/icons/flags/temp.png";
import Product from '../Model/Product';

const props = defineProps({
  openModal: Boolean,
  isEdit: Boolean,
  product: Product
})

let localProduct = computed(() => props.product)

const flag_br = ref(BR)
const flag_eua = ref(EUA)
const flag_real = ref(REAL)
const flag_dolar = ref(DOLAR)
const flag_ff = ref(FF)
const flag_temp = ref(TEMP)
const currFlag = ref(flag_br.value)
const emit = defineEmits(['close'])

const options = ref([
  { text: 'Sim', value: true },
  { text: 'Não', value: false }
])

const pais = ref([
  { text: 'Gringa', value: 0 },
  { text: 'Brasil', value: 1 }
])

const optionsPlatform = ref([
  { text: 'Hotmart'},
  { text: 'Kiwify'},
  { text: 'Eduzz'},
  { text: 'Monetizze'},
  { text: 'Ticto'},
  { text: 'Doppus'},
  { text: 'ClickBank'},
  { text: 'BuyGoods'},
  { text: 'Digistore24'}
])

const optionsCurrency = ref([
  { text: 'R$', value: 'BRL', flag: REAL },
  { text: 'US$', value: 'USD', flag: DOLAR }
])

const optionsrRecurrency = ref([
  { text: 'Sim', value: true },
  { text: 'Não', value: false }
])

function close() {
  // localProduct.value = {}
  // console.log('fechou')
    emit('close');
}

// const getCorrelacao = computed(() => {
//   const type = props.product.correlacao
//   if (type == 'Ótimo') return 'alert-success'
//   if (type == 'Regular') return 'alert-warning text-black'
//   if (type == 'Ruim') return 'alert-danger text-white'
//   return 'alert-info' // valor padrão
// })

function save() {
  emit('saveProduct', localProduct.value)
}

function addNew() {
  console.log(localProduct.value)
  if (localProduct.value.productName && localProduct.value.plataforma && localProduct.value.searchVolum && localProduct.value.qtdAdvertiser && localProduct.value.salesPage && localProduct.value.isRecurrent) {
    emit('addNewProduct', localProduct.value)
  } else {
    alert('Por favor, preencha todos os campos.')
  }
}

function selectCountry(item) {
  console.log(item)
  localProduct.value.country = item.value === 0 ? 'en' : 'br'
}

function selectCurrency(item) {
  console.log(item)
  localProduct.value.currentcy = item.value
}

function selectFF() {
  localProduct.value.isFF = !localProduct.value.isFF
}

function selectPlatform(item) {
  console.log('item')
  console.log(item)
  localProduct.value.plataforma = item.value
}

watch(() => localProduct.value?.country, (newCountry) => {
  if (newCountry === 'br') {
    currFlag.value = flag_br.value
  } else if (newCountry === 'en') {
    currFlag.value = flag_eua.value
  }
}, { immediate: true })

watch(() => localProduct.values?.isFF, (newFF) => {
  if (newFF) {
    flag_ff.value = FF
  } else {
    flag_ff.value = FF
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