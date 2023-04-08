const BASE_API = "https://api.github.com/users/";
const form = document.querySelector("form");
const main = document.querySelector(".main");
const search = document.querySelector("#search");
const btn = document.querySelector(".btn");

// Hide the main div on page load
main.style.display = "none";

async function getData(username) {
  try {
    const data = await fetch(BASE_API + username);
    const response = await data.json();
    return response;
  } catch (error) {}
}

function showCard(data) {
  const imageElement = document.createElement("img");
  imageElement.src = data.avatar_url;
  main.appendChild(imageElement);

  const nameElement = document.createElement("h1");
  nameElement.innerText = `${data.login}`;
  nameElement.classList.add("username");
  main.appendChild(nameElement);

  const followersElement = document.createElement("p");
  followersElement.innerText = `Followers: ${data.followers}`;
  main.appendChild(followersElement);

  const followingElement = document.createElement("p");
  followingElement.innerText = `Following: ${data.following}`;
  main.appendChild(followingElement);

  const reposElement = document.createElement("p");
  reposElement.innerText = `Number of Repositories: ${data.public_repos}`;
  main.appendChild(reposElement);

  console.log(data);
}

async function getRepos(username) {
  const data = await fetch(BASE_API + username + "/repos");
  const response = await data.json();
  return response;
}

function showRepos(repos) {
  const reposHeadingElement = document.createElement("h2");
  reposHeadingElement.innerText = "Repositories:";
  main.appendChild(reposHeadingElement);

  const reposListElement = document.createElement("ul");
  main.appendChild(reposListElement);

  repos.forEach((repo) => {
    const repoItemElement = document.createElement("li");
    repoItemElement.innerText = repo.name;
    reposListElement.appendChild(repoItemElement);
  });
}

btn.addEventListener("click", () => {
  const user = search.value;
  getData(user).then((data) => {
    showCard(data);
  });
  getRepos(user).then((repos) => {
    showRepos(repos);
  });
  search.style.display = "none";
  btn.style.display = "none";
  main.style.display = "block";
});
