<template>
  <div class="bird-names content">
    <h1>Lintulajien kääntäjä</h1>
    <hr>
    <p>Valitse ensin minkälaisen käännöksen haluat tehdä:</p>
    <div class="bird-names-query">
      <select v-model="selectedFrom" @change="onChange($event, selectedFrom)">
        <option selected="selected" disabled value="">Mistä kielestä</option>
        <option value="speciesFI">Suomen kielestä</option>
        <option value="speciesEN">Englannin kielestä</option>
        <option value="speciesSV">Ruotsin kielestä</option>
        <option value="speciesSCI">Tieteellisestä nimestä</option>
      </select>
      <select v-model="selectedTo" @change="onChange($event, selectedTo)">
        <option selected="selected" disabled value="">Mille kielelle</option>
        <option value="speciesFI">suomen kielelle</option>
        <option value="speciesEN">englannin kielelle</option>
        <option value="speciesSV">ruotsin kielelle</option>
        <option value="speciesSCI">tieteelliseksi nimeksi</option>
      </select>
      <p>Kirjoita alle lajin nimi jonka haluat kääntää:</p>
      <input v-model="setName" @input="inputOnChange" placeholder="Kirjoita käännettävä nimi tähän">
      <div v-for="(value, index) in jsonData" v-bind:key="index">
        <template v-if="value[selectedFrom].toLowerCase() == setName.toLowerCase()">
          <h3>{{ value[selectedFrom] }} = {{ value[selectedTo] }}</h3>
        </template>
      </div>
    </div>
    <hr>
    <div class="bird-names-license">
      <p>Lintujen nimet <a href="http://atlas3.lintuatlas.fi/taustaa/kaytto">3. Lintuatlaksen aineistosta</a></p>
      <p>Luonnontieteellinen keskusmuseo Luomus, Helsingin yliopisto. Käyttö Creative Commons Nimeä 4.0 -lisenssillä.</p>
      <p>Finnish Museum of Natural History, University of Helsinki Luomus. Used with Creative Commons Attribution 4.0 -license.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bird-names',
  data () {
    return {
      selectedFrom: '',
      selectedTo: '',
      setName: '',
      result: '',
      translatedName: '',
      resultShow: false,
      jsonData: {}
    }
  },
  methods: {
    getContent () {
      this.axios.get('birdSpeciesFinland.json').then((response) => {
        this.jsonData = response.data
      })
    },
    onChange(event, selected) {
      this.selected = event.target.value
    }
  },
  created () {
    this.getContent()
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent()
    next()
  }
}
</script>

