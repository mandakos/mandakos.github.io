<template>
  <div v-if="posts.length !== 0" class="blog-list-wrapper">
    <!-- Template for blog posts -->
    <div v-for="post in posts" :key="post.id" class="blog-list-item-wrapper" v-bind:post="post">
        <div class="blog-list-item" v-bind:style="[{'background-color': post.data.bg_color},{'background-image': 'url(' + post.data.image.url + ')' }]">
          <p class="blog-list-date">{{ post.data.date }}</p>
          <div class="text-overlay">
            <router-link :to="linkResolver(post)" class="title-link">
              <h2 class="blog-list-title">{{ $prismic.richTextAsPlain(post.data.title) }}</h2>
            </router-link>
            <router-link :to="linkResolver(post)" class="read-more-btn-link">
              <div class="btn read-more-btn">Avaa</div>
            </router-link>
          </div>
        </div>
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
