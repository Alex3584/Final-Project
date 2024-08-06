document.addEventListener("DOMContentLoaded", () => {
  const charactersContainer = document.getElementById("characters-container");
  const scriptElement = document.querySelector("script[data-category]");
  const category = scriptElement.getAttribute("data-category");
  let apiURL;
  let characters = []; // Объявляем глобальную переменную characters

  if (category === "students") {
    apiURL = "https://hp-api.onrender.com/api/characters/students";
  } else if (category === "staff") {
    apiURL = "https://hp-api.onrender.com/api/characters/staff";
  } else {
    apiURL = "https://hp-api.onrender.com/api/characters";
  }

  async function fetchCharacters() {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      characters = await response.json(); // Присваиваем значение глобальной переменной

      displayCharacters(characters);
    } catch (error) {
      console.error("Error fetching characters:", error);
      displayErrorMessage();
    }
  }

  function displayCharacters(charactersToDisplay) {
    charactersContainer.innerHTML = "";

    charactersToDisplay.forEach((character) => {
      const characterCard = document.createElement("div");
      characterCard.classList.add("character-card");

      const characterImage = document.createElement("img");
      characterImage.classList.add("character-image");
      characterImage.src = character.image;
      characterImage.alt = character.name;

      const characterName = document.createElement("div");
      characterName.classList.add("character-name");
      characterName.textContent = character.name;

      const characterInfo = document.createElement("div");
      characterInfo.classList.add("character-info");
      characterInfo.innerHTML = `
        <p>${
          character.alternate_names.length > 0
            ? character.alternate_names[0]
            : ""
        }</p>
        <p>${character.house}</p>
        <p>${character.dateOfBirth}</p>
      `;

      const characterPopup = document.createElement("div");
      characterPopup.classList.add("character-info-popup");
      characterPopup.innerHTML = `
        <p><strong>Name:</strong> ${character.name}</p>
        <p><strong>Alternate names:</strong> ${character.alternate_names.join(
          ", "
        )}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>House:</strong> ${character.house}</p>
        <p><strong>Date of birth:</strong> ${character.dateOfBirth}</p>
        <p><strong>Year of birth:</strong> ${character.yearOfBirth}</p>
        <p><strong>Wizard:</strong> ${character.wizard}</p>
        <p><strong>Ancestry:</strong> ${character.ancestry}</p>
        <p><strong>Eye colour:</strong> ${character.eyeColour}</p>
        <p><strong>Hair colour:</strong> ${character.hairColour}</p>
        <p><strong>Wand:</strong> Wood: ${character.wand.wood}, core: ${
        character.wand.core
      }, length: ${character.wand.length}</p>
        <p><strong>Patronus:</strong> ${character.patronus}</p>
        <p><strong>Hogwarts student:</strong> ${character.hogwartsStudent}</p>
        <p><strong>Hogwarts staff:</strong> ${character.hogwartsStaff}</p>
        <p><strong>Actor:</strong> ${character.actor}</p>
        <p><strong>Alive:</strong> ${character.alive}</p>
      `;
      const moreInfoLink = document.createElement("a");
      moreInfoLink.classList.add("more-info-link");
      moreInfoLink.textContent = "Більше інформації";
      moreInfoLink.addEventListener("click", (event) => {
        event.preventDefault();
        characterPopup.style.display =
          characterPopup.style.display === "block" ? "none" : "block";
      });

      const infoIcon = document.createElement("img");
      infoIcon.src = "../images/arrow.png";
      infoIcon.alt = "info icon";
      moreInfoLink.appendChild(infoIcon);

      characterCard.appendChild(characterImage);
      characterCard.appendChild(characterName);
      characterCard.appendChild(characterInfo);
      characterCard.appendChild(characterPopup);
      characterCard.appendChild(moreInfoLink);
      charactersContainer.appendChild(characterCard);

      characterCard.addEventListener("mouseleave", () => {
        characterPopup.style.display = "none";
      });
    });
  }

  function displayErrorMessage() {
    charactersContainer.innerHTML =
      "<p>Не вдалося завантажити дані. Будь ласка, спробуйте пізніше.</p>";
  }

  function filterCharactersByHouse(house) {
    const filteredCharacters = characters.filter(
      (character) => character.house === house
    );
    displayCharacters(filteredCharacters);
  }

  document.querySelectorAll(".menu-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const house = event.target.getAttribute("data-house");
      filterCharactersByHouse(house);
    });
  });

  fetchCharacters();
});
