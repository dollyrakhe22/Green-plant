fetch("https://openapi.programming-hero.com/api/categories")
  .then(res => res.json())
  .then(data => {
    data.categories.forEach(cat => {
      const li = document.createElement("li");
      li.textContent = cat.category;
      li.className = "cursor-pointer p-2 rounded hover:bg-green-100";
      li.onclick = () => loadPlants(cat.id); // ক্লিক করলে গাছ লোড হবে
      categoryList.appendChild(li);
    });
  });
function closeModal() {
  plantModal.classList.add("hidden");
}
