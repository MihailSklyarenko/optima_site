const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const checkStateButton = document.querySelector(".search-button");

modalTriggerButtons.forEach((elem) => {
  elem.addEventListener("click", (event) =>
    toggleModal(event.currentTarget.getAttribute("data-modal-target"))
  );
});

modalCloseButtons.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    toggleModal(event.currentTarget.closest(".modal").id);
  });
});

modals.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      //toggleModal(event.currentTarget.id);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.querySelector(".modal.modal-show")) {
    toggleModal(document.querySelector(".modal.modal-show").id);
  }
});

function toggleModal(modalId) {
  const modal = document.getElementById(modalId);

  if (getComputedStyle(modal).display === "flex") {
    modal.classList.add("modal-hide");
    setTimeout(() => {
      document.body.style.overflow = "initial";
      modal.classList.remove("modal-show", "modal-hide");
      modal.style.display = "none";
    }, 200);
  } else {
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
    const searchInputText = document.querySelector("#modal_search-input");
    const tableBody = document.querySelector("#data-table tbody");
    searchInputText.value = "";
    tableBody.innerHTML = "";
  }
}

checkStateButton.addEventListener("click", (_) => {
  const searchInputText = document.querySelector("#modal_search-input").value;
  fetch("https://jsonplaceholder.typicode.com/todos/" + searchInputText)
    .then((res) => res.json())
    .then((json) => {
      const tableBody = document.querySelector("#data-table tbody");
      tableBody.innerHTML = "";

      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${json.title}</td>
            <td>${json.title}</td>
        `;

      tableBody.appendChild(row);
    })
    .catch((err) => console.log(err));
});
