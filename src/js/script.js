import create_ripple from "./rippleEffect.js";

const btns = document.getElementsByClassName("btn");
const btnAdd = document.querySelector(`.btn`);
const blogContainer = document.querySelector(`.blog`);
const input = document.querySelector(`.header__input`);

const htmlLoad = `
    <h2 class="post__title">
      ████ ██████ ██████████ ███████ ██ ███████████
    </h2>
    <div class="author">
      <img
        src="src/img/loadingAuthor.png"
        alt="authorImage"
        class="author__img"
      />
      <h3 class="author__name">██ ██████ ████</h3>
      <p class="author__location">██████ ████████</p>
      <p class="post__date">████ ████</p>
    </div>
    <img
      src="src/img/loadingPost.png"
      class="post__img"
      alt="postImage"
    />
    <p class="post__body">
      ████████ ██████████ █████ ██ ███████████████ ███████ ████████████
      ████████ ██████████ █████ ██ ███████████████ ███████ ████████████
      ████████ ██████████ █████ ██ ███████████████ ███████ ████████████
      ████████ ██████████ █████ ███████ ████████████ ████████ ██████████
      █████ ███████ ████████████ ████████ ██████████ █████ ███████
      ████████████ ███████████████ ██████████ ██████████ █████ ██
      ███████████████ ███████ ████████████ ███████████████ ███████
      ████████████ ████████ ██████████ █████ ██ ███████████████ ███████
      ████████████ ███████████████ ███ ████████ ██████████ █████ ██
      ███████████████████ ███████████████ ███████ ███████████████ █████ ██
      ███████████████ ███████ ███████████ ███████ ████████████ ████████
      ██████████████████ ███████ ████████████ ███████████████ ███ ████████
      ██████████ █████ ██ ███████████████████ ███████████████ ███████
      ███████████████ █████ ██ ███████████████ ███████ ████████████
      ███████████████ ███████ ████████████ ████████ ██████████ █████ ██
      ███████████████ ███████ ████████████ ███████████████ ███████
      ████████████ ████████ ██████████ █████ ██████ ███████ ████████████
      ███████████████ ████████ ████████ ██████████ █████ ██
      ███████████████ ████████ ███████████████ ███████ ████████████
      ███████ █████ ██ ███████████████ ███████ ████████████
      ██████████████████ ███████ ████████████ ████████ ██████████ █████
      ██████ ███████ ████████████ ███████████████ ████████ ████████
      ██████████ █████ ██ ███████████████ ████████ ███████████████ ███████
      ████████████ ███████ █████ ██ ███████████████ ███████ ████████████
      ███████████ ████████████ ████████ ██████████ █████ ████████████
      ███████████████ ███████ ████████████
    </p>
`;

for (const btn of btns) {
  btn.addEventListener("click", create_ripple);
}

async function fetchNews(topic = "tech") {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
      "X-RapidAPI-Key": "bb29e62583msh10c5bfe768c328bp121b43jsn96ae4388c74c",
    },
  };
  const response = await fetch(
    `https://newscatcher.p.rapidapi.com/v1/search_free?q=${topic}&lang=en&media=True`,
    options
  );
  const data = await response.json();
  return data;
}

async function fetchAuthor() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "random-user.p.rapidapi.com",
      "X-RapidAPI-Key": "bb29e62583msh10c5bfe768c328bp121b43jsn96ae4388c74c",
    },
  };
  const response = await fetch(
    "https://random-user.p.rapidapi.com/getuser",
    options
  );
  const data = await response.json();
  return data.results[0];
}

async function getNews() {
  const newsData = await fetchNews(!input.value ? "tech" : input.value);
  const authorData = await fetchAuthor();
  const randomNumber = Math.floor(Math.random() * 50);
  const news = newsData.articles[randomNumber];
  const object = {
    title: news.title,
    body: news.summary,
    image: news.media,
    date: news.published_date,
    authorName: `${authorData.name.first} ${authorData.name.last}`,
    authorPhoto: authorData.picture.large,
    location: `${authorData.location.state}, ${authorData.location.country}`,
  };

  return object;
}

async function addPost() {
  btnAdd.disabled = true;
  try {
    const post = document.createElement("div");
    post.classList.add("post");
    post.classList.add("load");
    post.innerHTML = htmlLoad;
    blogContainer.insertBefore(post, blogContainer.children[0]);

    const postData = await getNews();

    post.classList.remove("load");
    post.innerHTML = `
      <h2 class="post__title">
        ${postData.title}
      </h2>
      <div class="author">
        <img
          src="${postData.authorPhoto}"
          alt="authorImage"
          class="author__img"
        />
        <h3 class="author__name">by ${postData.authorName}</h3>
        <p class="author__location">${postData.location}</p>
        <p class="post__date">${postData.date}</p>
      </div>
      <img
        src="${postData.image}"
        class="post__img"
        alt="postImage"
      />
      <p class="post__body">
        ${postData.body}
      </p>
      <div class="post__separator"></div>
    `;
  } catch (error) {
    alert(error);
  }
  btnAdd.disabled = false;
}

btnAdd.addEventListener("click", addPost);
