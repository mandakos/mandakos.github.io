<template>
  <div class="bird-post-wrapper" v-bind:style="[{'background-color': fields.bg_color},{'background-image': 'url(' + fields.image.url + ')' }]">
    <span class="bird-post-date">
      {{ fields.date_formatted }}
    </span>
    <div class="bird-post-color-fade" v-bind:style="{'background': 'radial-gradient(' +  fields.bg_color + ' 50%, rgba(255,255,255, 0) 70%)'}">
      <h1 class="bird-post-title" v-bind:style="{ color: fields.text_color }">
        {{ $prismic.richTextAsPlain(fields.title) }}
      </h1>
      <p class="bird-post-story" v-bind:style="{ color: fields.text_color }">
        {{ $prismic.richTextAsPlain(fields.story) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BirdPost',
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
      this.$prismic.client.getByUID('bird_post', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.title = document.data.bird_post_title
            this.fields.story = document.data.bird_post_story
            this.fields.bg_color = document.data.bird_post_bg
            this.fields.text_color = document.data.bird_post_color
            this.fields.date = document.data.bird_post_date
            this.fields.image = document.data.bird_post_image
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

<style>
.bird-post-wrapper {
  background-size: cover;
  background-position: center;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.bird-post-color-fade {
  position: fixed;
  bottom: 0;
  margin: auto;
  padding: 6rem;
  text-align: center;
}

.bird-post-color-fade p {
  max-height: 9rem;
  overflow: hidden;
  position: relative;
  margin-right: 0.6rem;
}

.bird-post-color-fade p::after {
  position: absolute;
  content: "...";
  margin-bottom: -0.1rem;
  bottom: 0;
  right: 0;
}

@media only screen and (min-width: 990px) {
  .bird-post-color-fade {
    left: 0;
    right: auto;
    padding: 4rem 8rem;
    max-width: 50%;
  }
}
</style>