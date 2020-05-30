const axios = require("axios").default;

const url = "api/posts";

class PostService {
  // Get Posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(url).then((res) => {
          const data = res.data;
          resolve(
            data.map((post) => ({
              ...post,
              created_At: new Date(data.createdAt),
            }))
          );
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Post Service
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }
  // Delete Service
  static deletePost(id) {
    return axios.delete(`${url}/${id}`);
  }
}

export default PostService;
