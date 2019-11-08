<template>
  <div class="bird-live">
    <div class="bird-live-header">
      <h1>{{ $prismic.richTextAsPlain(fields.title) }}</h1>
    </div>
    <div class="bird-live-stream">
      <iframe src="https://www.youtube.com/embed/live_stream?channel=UCMUUTa8FeOUgxZJFpRpo9bw" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="bird-live-description">
      <prismic-rich-text :field="fields.text"/>
    </div>
    <div class="bird-live-gallery">
      <figure v-for="(item, index) in fields.gallery" :key="'photo-item-' + index">
        <prismic-image :field="item.kuva" class="post-gallery-image"/>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BirdLive',
  data () {
    return {
      fields: {
        title: null,
        text: null,
        gallery: []
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('birdlive')
        .then((document) => {
          if (document) {
            if(document.data.otsikko) this.fields.title = document.data.otsikko
            if(document.data.live_teksti) this.fields.text = document.data.live_teksti
            if (document.data.kuvia) this.fields.gallery = document.data.kuvia
          } else {
            this.$router.push({ name: 'not-found' })
          }
        })
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