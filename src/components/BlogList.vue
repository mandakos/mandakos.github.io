<template>
  <div v-if="posts.length !== 0" class="blog-list-wrapper">
    <!-- Template for blog posts -->
    <div v-for="post in posts" :key="post.id" class="blog-list-item-wrapper" v-bind:post="post">
      <router-link :to="linkResolver(post)">
        <div class="blog-list-item" v-bind:style="[{'background-color': post.data.bg_color},{'background-image': 'url(' + post.data.image.url + ')' }]">
          <div class="text-overlay">
            <p class="blog-list-date">{{ post.data.date }}</p>
            <h2 class="blog-list-title">{{ $prismic.richTextAsPlain(post.data.title) }}</h2>
            <p class="blog-list-short">{{ post.data.short }}<button>Lue lisää</button></p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <!-- If no blog posts return message -->
  <div v-else class="blog-list">
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  data () {
    return {
      posts: [],
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      linkResolver: this.$prismic.linkResolver
    }
  },
  methods: {
    getPosts () {
      //Query to get blog posts
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'blog_post'),
        { orderings : '[my.blog_post.date desc]'}
      ).then((response) => {
        this.posts = response.results;
      })
    }
  },
  created () {
    this.getPosts()
  },
  beforeRouteUpdate (to, from, next) {
    this.getPosts();
    next();
  }
}
</script>
