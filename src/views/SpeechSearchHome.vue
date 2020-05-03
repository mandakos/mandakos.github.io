<template>
  <div class="speech-home-wrapper">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates&family=Nunito+Sans:wght@400;900&family=Oswald:wght@700&display=swap" rel="stylesheet">
    <div class="speech-home">

      <h1>
        Lintuhaku puheen tunnistuksella
      </h1>
      <p class="ingress">Helppo lintuhaku, ilman kirjoittamista</p>
      <router-link to="/lintuhaku/puhu" class="speech-home-button btn">ALOITA LINTUHAKU</router-link>
      <p>
        Hae lintulajeja joko nimellä tai tuntomerkeillä (beta-ominaisuus).
      </p>
      <p>
        <b>VINKKI!</b> Jos haluat kuunnella linnun kuvauksen, sano myös "kuuntele". Esimerkiksi
        "kuuntele varpunen".
      </p>
      <p>
        <b>Huom</b> Puheentunnistusominaisuus toimii toistaiseksi vain
        Chrome-selaimella.
      </p>
    </div>
    <SpeechFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import SpeechFooter from '@/components/SpeechFooter.vue'

export default {
  name: 'SpeechSearch',
  components: {
    SpeechFooter
  }
}
</script>