<template>
  <div class="post-wrapper" v-bind:style="[{'background-color': fields.bgColor},{'background-image': 'url(' + fields.imageUrl + ')' }]">
    <div class="post-color-fade" v-bind:style="[{'background': 'linear-gradient(to top, ' + fields.bgColor + ' 80%, transparent)'},{'color': fields.textColor }]">
      <div class="post-toolbar">
        <div class="v-loop-wrapper button-previous">
          <div v-for="(item, index) in posts" :key="index">
            <template v-if="item.id == documentId">
              <template v-if="posts[index-1]">
                <router-link :to="linkResolver(posts[index-1])" class="previous-link">
                  Edellinen
                </router-link>
              </template>
              <template v-else>
                <div class="button-previous-disabled">Edellinen</div>
              </template>
            </template>
          </div>
        </div>
        <div class="button-close">
          <router-link to="/">
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M10,1.529c-4.679,0-8.471,3.792-8.471,8.471c0,4.68,3.792,8.471,8.471,8.471c4.68,0,8.471-3.791,8.471-8.471C18.471,5.321,14.68,1.529,10,1.529 M10,17.579c-4.18,0-7.579-3.399-7.579-7.579S5.82,2.421,10,2.421S17.579,5.82,17.579,10S14.18,17.579,10,17.579 M14.348,10c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.446,0.446-0.446h5C14.146,9.554,14.348,9.755,14.348,10 M14.348,12.675c0,0.245-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.201-0.446-0.446s0.2-0.445,0.446-0.445h5C14.146,12.229,14.348,12.43,14.348,12.675 M7.394,10c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.446,0.446-0.446h0.849C7.194,9.554,7.394,9.755,7.394,10 M7.394,12.675c0,0.245-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.201-0.446-0.446s0.201-0.445,0.446-0.445h0.849C7.194,12.229,7.394,12.43,7.394,12.675 M14.348,7.325c0,0.246-0.201,0.446-0.446,0.446h-5c-0.246,0-0.446-0.2-0.446-0.446c0-0.245,0.2-0.446,0.446-0.446h5C14.146,6.879,14.348,7.08,14.348,7.325 M7.394,7.325c0,0.246-0.2,0.446-0.446,0.446H6.099c-0.245,0-0.446-0.2-0.446-0.446c0-0.245,0.201-0.446,0.446-0.446h0.849C7.194,6.879,7.394,7.08,7.394,7.325"></path>
            </svg>
          </router-link>
        </div>
        <div class="v-loop-wrapper button-next">
          <div v-for="(item, index) in posts" :key="index">
            <template v-if="item.id == documentId">
              <template v-if="posts[index+1]">
                <router-link :to="linkResolver(posts[index+1])" class="next-link">
                  Seuraava
                </router-link>
              </template>
              <template v-else>
                <div class="button-next-disabled">Seuraava</div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="post-date">
        {{ fields.date_formatted }}
      </div>
      <div class="post-content">
        <h1 class="post-title" v-bind:style="{ color: fields.textColor }">
          {{ $prismic.richTextAsPlain(fields.title) }}
        </h1>
        <p class="post-story" v-bind:style="{ color: fields.textColor }">
          <prismic-rich-text :field="fields.story"/>
        </p>
        <div class="post-gallery">
          <figure v-for="(item, index) in fields.gallery" :key="'photo-item-' + index">
            <prismic-image :field="item.gallery_image.small" class="post-gallery-image"/>
            <div class="open-lightbox" v-on:click="showLightbox = !showLightbox, itemToShow = index">
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
              </svg>
            </div>
            <figcaption class="post-gallery-caption">
              {{ item.gallery_caption }}
            </figcaption>
            <div class="lightbox" v-bind:class="{ lightboxOpen : showLightbox }">
              <div class="close-lightbox" v-on:click="showLightbox = !showLightbox">
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                </svg>
              </div>
              <prismic-image :field="fields.gallery[itemToShow].gallery_image" class="lightbox-image" ref="lightboxImage"/>
            </div>
          </figure>
          <div class="disqus-comments">
            <vue-disqus shortname="papanavaaranpuput" :identifier="documentId" url="https://mandakos.netlify.com/"></vue-disqus>
          </div>
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
      posts: [],
      showLightbox: false,
      itemToShow: 0,
      documentId: '',
      documentUid: '',
      fields: {
        title: null,
        description: null,
        story: null,
        imageUrl: null,
        gallery: [],
        textColor: null,
        bgColor: null,
        date: null,
        date_formatted: null,
      },
      linkResolver: this.$prismic.linkResolver,
      jsonLD: null
    }
  },
  head: {
    title () {
      return { inner: this.fields.title[0].text }
    },
    meta () {
      return [{ name: 'description', content: this.fields.description, id: 'desc' }]
    },
    script () {
      return [{ t:'application/ld+json', i: JSON.stringify(this.jsonLD) }]
    }
  },
  methods: {
    getPosts () {
      //Query to get blog posts
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'blog_post'),
        { orderings : '[my.blog_post.date desc]'}
      ).then((response) => {
        this.posts = response.results
      })
    },
    getContent (uid) {
      this.$prismic.client.getByUID('blog_post', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.documentUid = document.uid
            if (document.data.title) this.fields.title = document.data.title
            if (document.data.short) this.fields.description = document.data.short
            if (document.data.story) this.fields.story = document.data.story
            if (document.data.image.url) this.fields.imageUrl = document.data.image.url
            if (document.data.gallery) this.fields.gallery = document.data.gallery
            if (document.data.text_color) this.fields.textColor = document.data.text_color
            if (document.data.bg_color) this.fields.bgColor = document.data.bg_color
            if (document.data.date) this.fields.date = document.data.date
            if (this.fields.date) {
              this.fields.date_formatted = Intl.DateTimeFormat('fi-FI',{
                year: 'numeric',
                month: 'long',
                day: 'numeric'}).format(new Date(this.fields.date));
            }
            this.jsonLD = this.getJsonLD(document)
          } else {
            this.$router.push({ name: 'not-found' })
          }
        })
    },
    documentClick (e){
        let el = this.$refs.lightboxImage
        let target = e.target
        if (!this.$el.contains(event.target)) {
          this.showLightbox = false
        }
      },
    getJsonLD (document) {
      return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": document.data.title[0].text,
            "description": document.data.description,
            "url": "https://varisloki.netlify.com/#/" + document.uid,
            "image" : {
              "@type": "ImageObject",
              "url": document.data.image.url,
            },
            "author": {
              "@type": "Person",
              "name": "Manda K"
            },
            "datePublished": document.data.date
          }
    },
    updateHeadTags() {
      var self = this;
      setTimeout(function() {
        self.$nextTick(function() {
          self.$emit('updateHead')
        })
      }, 2000);
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
    this.getPosts()
    this.updateHeadTags()
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    this.getPosts()
    this.updateHeadTags()
    next()
  }
}
</script>
