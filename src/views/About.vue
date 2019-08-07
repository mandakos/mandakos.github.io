<template>
  <div class="about content">
    <h1>
      {{ $prismic.richTextAsPlain(fields.title) }}
    </h1>
    <prismic-rich-text :field="fields.text"/>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      fields: {
        title: null,
        text: null
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('about')
        .then((document) => {
          if (document) {
            if(document.data.title) this.fields.title = document.data.title
            if(document.data.text) this.fields.text = document.data.text
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
