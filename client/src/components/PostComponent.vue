<template>
  <div class="container">
    <h1>Lates Posts</h1>
    <!-- Create Post form -->
    <div class="create-post">
      <label for="create-post">Write Something here...</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button v-on:click="createPost">Save!</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
       v-for="(post, index) in posts"
       v-bind:item="post"
       v-bind:index="index"
       v-bind:key="post._id"
       v-on:dblclick="deletePost(post._id)">

        <p format="yyyy-MM-dd HH:mm"
          type="datetime">{{ post.createdAt }}</p>
        
         <!-- <p format="yyyy-MM-dd HH:mm"
          type="datetime">{{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</p> -->
        <p class="text">{{ post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostServices'

export default {
  name: 'Post Component',
  data(){
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created(){
    try {
      this.posts = await PostService.getPosts();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  /* max-width: 800px; */
  margin-left: 20%;
  margin-right: 20%;
  align-content: center;
  justify-content: center;
  justify-items: center;
  justify-self: center;
  margin: 1 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  color: white;
  font-size: 13px;
  background: darkgreen;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
