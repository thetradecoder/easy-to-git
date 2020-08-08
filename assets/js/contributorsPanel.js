// add github name here

// feel free to add a role if not it will default to contributor

const contributors = [
		{
			githubName: "DavidMatthewFraser",
			displayName: "david fraser",
		},
		{
			githubName: "Syntappz",
			displayName: "Biscuitmanz",
		},
		{
			githubName: "RandellDawson",
			displayName: "Randell Dawson",
		},
	 	{
			githubName: "thetradecoder",
			displayName: "Mamun Abdullah",
		},
		{
			githubName: "misterybodon",
			displayName: "Mister Nobody",
		},
		{
			githubName: "fort3",
			displayName: "Fortune Okon",
		},
		{
			githubName: "EmmaVZ89",
			displayName: "Emmanuel Zelarayan",
		},
		{
			githubName: "benjithorpe",
			displayName: "Benjamin I. Thorpe",
		},
		{
			githubName: "gwmatthews",
			displayName: "George W. Matthews",
    }
	];

const sidePanel = document.querySelector(".panel");
const panelButton = document.querySelector(".contributors-btn");
const main = document.querySelector(".main");
let panelOpen = false;

const getFollowers = async (name) => {
  const url = `https://api.github.com/users/${name}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.message) {
      throw data.message;
    } else {
      return { followers: data.followers, repos: data.public_repos };
    }
  } catch (error) {
    console.error(error);
    return { followers: 0, repos: 0 };
  }
};

const appendComponents = (contributorComponent) => {
  contributors.forEach(async (contributor) => {
    const component = contributorComponent(contributor);
    sidePanel.innerHTML += component;
  });
};

const fetchFollowers = async (contributorComponent) => {
  for (let contributor of contributors) {
    if (contributor.githubName) {
      const { followers } = await getFollowers(contributor.githubName);
      contributor.followers = followers;
    }
  }
  appendComponents(contributorComponent);
};

const panel = () => {
  const githubUrl = (name) => `https://github.com/${name}`;
  const contributorComponent = ({
    githubName,
    displayName,
    role,
    followers,
  }) => {
    displayName =
      displayName.length > 18 ? displayName.slice(0, 18) + "..." : displayName;
    const url = githubUrl(githubName);
    const defaultAvatar = `https://api.adorable.io/avatars/60/${displayName}.png`;

    const href = githubName ? `href="${url}"` : null;
    const avatar = githubName ? `${url}.png` : defaultAvatar;
    const github = githubName ? "github" : "no link";
    const noLink = githubName ? "" : "no-link";

    return `
  <div class="contributor">
    <div class="flex">
      <div class="avatar-wrap">
        <div class="avatar">
          <img src="${avatar}" alt="github-avatar" />  
        </div>
      </div>
      <div>
         <h4 class="name">${displayName}</h4>
         <p class="followers">followers: ${followers || 0}</p>
         <div class="role">
           <p>${role || "contributor"}</p>
         </div>
      </div>
    </div>
    <div class="github-wrap">
      <a class="github-btn ${noLink}" target="_" ${href}>
        <i class="fab fa-github-alt"></i>
      </a>
      <p class="link-text ${noLink}">${github}</p>
    </div>
</div>`;
  };
  fetchFollowers(contributorComponent);
};

const closeFromMain = () => {
  if (panelOpen) {
    closePanel();
  }
};

const closePanel = () => {
  sidePanel.style.right = "-400px";
  sidePanel.style.opacity = 0;
  panelOpen = !panelOpen;
  main.removeEventListener("click", closeFromMain);
};

const openPanel = () => {
  sidePanel.style.right = 0;
  sidePanel.style.opacity = 1;
  panelOpen = !panelOpen;
  main.addEventListener("click", closeFromMain);
};

const togglePanel = () => {
  if (panelOpen) {
    closePanel();
  } else {
    openPanel();
  }
};

window.onload = () => {
  panel();
  panelButton.addEventListener("click", togglePanel);
};
