let posts = [];
const feed = document.getElementById("feed");
const captionInput = document.getElementById("caption");
const imageInput = document.getElementById("image-url");

function randomUsername() {
  const names = [
    "skibidi",
    "sigma",
    "cat",
    "pixel",
    "alpha",
    "omega",
    "luna",
    "nova",
  ];
  const num = Math.floor(Math.random() * 1000);
  return names[Math.floor(Math.random() * names.length)] + num;
}

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addPost(captionVal, imageVal) {
  const caption =
    captionVal !== undefined ? captionVal : captionInput.value.trim();
  const image = imageVal !== undefined ? imageVal : imageInput.value.trim();

  if (!caption && !image) return;

  const newPost = {
    id: Date.now(),
    username: randomUsername(),
    profileColor: randomColor(),
    caption: caption,
    image: image,
    likes: 0,
    comments: [],
  };

  posts.unshift(newPost);
  savePosts();
  renderPosts();

  captionInput.value = "";
  imageInput.value = "";
}

function likePost(id) {
  const post = posts.find((p) => p.id === id);
  post.likes++;
  savePosts();
  renderPosts();
}

function addComment(id) {
  const comment = prompt("Enter your comment:");
  if (comment) {
    const post = posts.find((p) => p.id === id);
    post.comments.push(comment);
    savePosts();
    renderPosts();
  }
}

function deletePost(id) {
  posts = posts.filter((p) => p.id !== id);
  savePosts();
  renderPosts();
}

function renderPosts() {
  feed.innerHTML = "";
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.className = "post";

    postEl.innerHTML = `
      <div class="post-header">
        <div class="pfp" style="background:${post.profileColor}"></div>
        <strong>${post.username}</strong>
      </div>
      ${
        post.image
          ? `<img class="post-image" src="${post.image}" alt="post image">`
          : ""
      }
      <div class="post-buttons">
        <button onclick="likePost(${post.id})">❤️ ${post.likes}</button>
        <button onclick="addComment(${post.id})">💬</button>
        <button onclick="deletePost(${post.id})">🗑️</button>
      </div>
      <div class="post-content">
        <strong>${post.username}</strong> ${post.caption}
        ${
          post.comments.length
            ? `<div class="comments"><strong>Comments:</strong><br>${post.comments.join(
                "<br>"
              )}</div>`
            : ""
        }
      </div>
    `;

    feed.appendChild(postEl);
  });
}

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
  const saved = JSON.parse(localStorage.getItem("posts"));
  if (saved) posts = saved;
  else generateRandomPosts();
  renderPosts();
}

function generateRandomPosts(){
  for(let i = 0; i < 5; i++){
    const caption = "This is a random post #" + (i+1);
    const image = i % 2 === 0 ? "https://picsum.photos/400/300?random=" + i : "";
    addPost(caption, image);
  }
}


loadPosts();
