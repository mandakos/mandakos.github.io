<template>
<div class="frontpage">
  <h1>
    {{ $prismic.richTextAsPlain(fields.title) }}
  </h1>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      fields: {
        title: null,
        header_image: null
      }
    }
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getSingle('frontpage')
        .then((document) => {
          if (document) {
            this.fields.title = document.data.title
            this.fields.header_image = document.data.header_image
          } else {
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.frontpage {
  background-size: cover;
  background-position: bottom;
  padding: 10rem;
  text-align: center;
}
h1 {
  margin: auto;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
