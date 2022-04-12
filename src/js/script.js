import create_ripple from "./rippleEffect.js";

const btns = document.getElementsByClassName("btn");
const btnAdd = document.querySelector(`.btn`);
const blogContainer = document.querySelector(`.blog`);

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
  const newsData = await fetchNews();
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
