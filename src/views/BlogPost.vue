<template>
  <div class="post-wrapper" v-bind:style="[{'background-color': fields.bg_color},{'background-image': 'url(' + fields.image.url + ')' }]">
    <div class="post-toolbar">
      <div class="button-previous">Edellinen</div>
      <div class="button-close">
        <router-link to="/">
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
          </svg>
        </router-link>
      </div>
      <div class="button-next">Seuraava</div>
    </div>
    <div class="post-color-fade">
      <div class="post-date">
        {{ fields.date_formatted }}
      </div>
      <h1 class="post-title" v-bind:style="{ color: fields.text_color }">
        {{ $prismic.richTextAsPlain(fields.title) }}
      </h1>
      <p class="post-story" v-bind:style="{ color: fields.text_color }">
        {{ $prismic.richTextAsPlain(fields.story) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  data () {
    return {
      documentId: '',
      fields: {
        title: null,
        story: null,
        bg_color: null,
        text_color: null,
        date: null,
        date_formatted: null,
        image: null
      }
    }
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getByUID('blog_post', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.title = document.data.title
            this.fields.story = document.data.story
            this.fields.bg_color = document.data.bg_color
            this.fields.text_color = document.data.text_color
            this.fields.date = document.data.date
            this.fields.image = document.data.image
            this.fields.date_formatted = Intl.DateTimeFormat('fi-FI',{
              year: 'numeric',
              month: 'long',
              day: 'numeric'}).format(new Date(this.fields.date));
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
