<template>
  <div class="footer-wrapper" v-bind:style="[{'background-color': fields.bgColor },{'color': fields.textColor }]">
    <footer>
      <div class="footer-first"><prismic-rich-text :field="fields.first"/></div>
      <div class="footer-second"><prismic-rich-text :field="fields.second"/></div>
      <div class="footer-third"><prismic-rich-text :field="fields.third"/></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'my-footer',
  data () {
    return {
      fields: {
        first: null,
        second: null,
        third: null,
        bgColor: null,
        textColor: null
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('footer')
        .then((document) => {
          if (document) {
            if(document.data.first) this.fields.first = document.data.first
            if(document.data.second) this.fields.second = document.data.second
            if(document.data.third) this.fields.third = document.data.third
            if(document.data.bg_color) this.fields.bgColor = document.data.bg_color
            if(document.data.text_color) this.fields.textColor = document.data.text_color
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
