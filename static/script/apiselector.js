const apiselect = document.getElementById("api-version");
apiselect.addEventListener("change", (ev) => {
  location.href = ev.target.value;
});
