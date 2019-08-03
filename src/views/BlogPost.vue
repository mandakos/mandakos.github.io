<template>
  <div class="post-wrapper" v-bind:style="[{'background-color': fields.bg_color},{'background-image': 'url(' + fields.image.url + ')' }]">
    <span class="post-date">
      {{ fields.date_formatted }}
    </span>
    <div class="post-color-fade" v-bind:style="{'background': 'radial-gradient(' +  fields.bg_color + ' 50%, rgba(255,255,255, 0) 70%)'}">
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

<style>
.post-wrapper {
  background-size: cover;
  background-position: center;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.post-color-fade {
  position: relative;
  bottom: 0;
  margin: auto;
  padding: 6rem;
  opacity: 0.9;
  text-align: center;
}

.post-color-fade p {
  max-height: 9rem;
  overflow: hidden;
  margin-right: 0.6rem;
}

.post-color-fade p::after {
  position: relative;
  content: "...";
  margin-bottom: -0.1rem;
  bottom: 0;
  right: 0;
}

@media only screen and (min-width: 990px) {
  .post-color-fade {
    left: 0;
    right: auto;
    padding: 4rem 8rem;
    max-width: 50%;
  }
}
</style>