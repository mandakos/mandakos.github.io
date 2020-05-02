<template>
  <div class="speechSearchView">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates&family=Nunito+Sans:wght@400;900&family=Oswald:wght@700&display=swap" rel="stylesheet">
    <div id="nav">
      <router-link to="/lintuhaku"><font-awesome-icon icon="times" class="close-icon" /></router-link>
    </div>
    <SpeechSearch/>
    <SpeechFooter/>
  </div>
</template>

<script>
import SpeechSearch from '@/components/SpeechSearch.vue'
import SpeechFooter from '@/components/SpeechFooter.vue'

export default {
  name: 'SpeechSearchView',
  components: {
    SpeechSearch,
    SpeechFooter
  }
}
</script>
