<template>
  <div class="author">
    <div class="author-image" v-bind:style="{'background-image': 'url(' + fields.image + ')' }"></div>
    <a class="site-author-name" href="/">
      {{ $prismic.richTextAsPlain(fields.name) }}
    </a>
    <!--
    <p class="author-text">
      {{ $prismic.richTextAsPlain(fields.text) }}
    </p>
    <div class="author-some-links">
      <li v-for="(item, index) in fields.some" :key="'some-item-' + index">
        <prismic-link :field="item.some_link">
            <prismic-image :field="item.some_icon" class="some-icon"/>
        </prismic-link>
      </li>
    </div>
    -->
  </div>
</template>

<script>
export default {
  name: 'author',
  data () {
    return {
      fields: {
        name: null,
        image: null,
        text: null,
        some: []
      }
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('author')
        .then((document) => {
          if (document) {
            if(document.data.name) this.fields.name = document.data.name
            if(document.data.photo.url) this.fields.image = document.data.photo.url
            if(document.data.text) this.fields.text = document.data.text
            if(document.data.some_links) this.fields.some = document.data.some_links
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
