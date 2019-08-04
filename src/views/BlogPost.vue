<template>
  <div class="post-wrapper" v-bind:style="[{'background-color': fields.bg_color},{'background-image': 'url(' + fields.image.url + ')' }]">
    <div class="post-color-fade">
      <div class="post-toolbar">
        <div class="button-previous">Edellinen</div>
        <div class="button-close">
          <router-link to="/">
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M10,1.529c-4.679,0-8.471,3.792-8.471,8.471c0,4.68,3.792,8.471,8.471,8.471c4.68,0,8.471-3.791,8.471-8.471C18.471,5.321,14.68,1.529,10,1.529 M10,17.579c-4.18,0-7.579-3.399-7.579-7.579S5.82,2.421,10,2.421S17.579,5.82,17.579,10S14.18,17.579,10,17.579 M14.348,10c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.446,0.446-0.446h5C14.146,9.554,14.348,9.755,14.348,10 M14.348,12.675c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.445,0.446-0.445h5C14.146,12.229,14.348,12.43,14.348,12.675 M7.394,10c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.446,0.446-0.446h0.849C7.194,9.554,7.394,9.755,7.394,10 M7.394,12.675c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.445,0.446-0.445h0.849C7.194,12.229,7.394,12.43,7.394,12.675 M14.348,7.325c0,0.246-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.2-0.446-0.446c0-0.245,0.2-0.446,0.446-0.446h5C14.146,6.879,14.348,7.08,14.348,7.325 M7.394,7.325c0,0.246-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.2-0.446-0.446c0-0.245,0.201-0.446,0.446-0.446h0.849C7.194,6.879,7.394,7.08,7.394,7.325"></path>
            </svg>
          </router-link>
        </div>
        <div class="button-next">Seuraava</div>
      </div>
      <div class="post-date">
        {{ fields.date_formatted }}
      </div>
      <div class="post-content">
        <h1 class="post-title" v-bind:style="{ color: fields.text_color }">
          {{ $prismic.richTextAsPlain(fields.title) }}
        </h1>
        <p class="post-story" v-bind:style="{ color: fields.text_color }">
          {{ $prismic.richTextAsPlain(fields.story) }}
        </p>
        <div class="post-gallery">
          <figure v-for="(item, index) in fields.gallery" :key="'photo-item-' + index">
            <prismic-image :field="item.gallery_image.small" class="post-gallery-image"/>
            <figcaption class="post-gallery-caption">
              {{ item.gallery_caption }}
            </figcaption>
          </figure>
        </div>
      </div>
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
        image: null,
        gallery: [],
        date: null,
        date_formatted: null,
      }
    }
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getByUID('blog_post', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            if (document.data.title) this.fields.title = document.data.title
            if (document.data.story) this.fields.story = document.data.story
            if (document.data.image) this.fields.image = document.data.image
            if (document.data.gallery) this.fields.gallery = document.data.gallery
            if (document.data.date) this.fields.date = document.data.date
            if (this.fields.date) {
              this.fields.date_formatted = Intl.DateTimeFormat('fi-FI',{
                year: 'numeric',
                month: 'long',
                day: 'numeric'}).format(new Date(this.fields.date));
            }
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
