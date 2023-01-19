const darkmodeToggle = document.querySelector("#darkmode-toggle");

/* css customprops detect the default automatically, but this makes sure the starting switch position also corresponds */
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  darkmodeToggle.checked = true;
}

/* These classes are for when a user decides to not go with their default setting */
darkmodeToggle.addEventListener("change", () => {
  if (darkmodeToggle.checked) {
    document.container.classList.add("darkmode");
    document.body.classList.remove("lightmode");
  } else {
    document.body.classList.remove("darkmode");
    document.body.classList.add("lightmode");
  }
});
