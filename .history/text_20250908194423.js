const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadAllCards=()=>{
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res)=> res.json())
    .then(data=> displayPlantCards(data.plants));
}

const loadCategories=()=>{
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
    .then((res) => res.json())
    .then((json)=> displayCategories(json.categories));
};




const addCard = (card) => {
  const cartList = document.getElementById('cartList');

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="flex justify-between items-center bg-[#F0FDF4] p-3 mb-2">
        <div>
            <p>${card.name}</p>
            <p>৳${card.price}</p>
        </div>
        <button class="remove-btn text-red-500 text-2xl">x</button>
    </div>
  `;
  cartList.append(li);
  

  const grandTotal = document.getElementById('cartTotal');
  let currentTotal = parseInt(grandTotal.innerText);
  grandTotal.innerText = currentTotal + card.price;

  
li.querySelector(".remove-btn").addEventListener("click", () => {
    li.remove(); 
    let newTotal = parseInt(grandTotal.innerText) - card.price;
    grandTotal.innerText = newTotal;
  });
  
}

const removeActive = ()=>{
  const categoryActiveButtons = document.getElementsByClassName('cat-btn');
  // console.log(categoryButtons);
  for(let btn of categoryActiveButtons){
    btn.classList.remove("active");
  }
}

const loadTree = (id)=>{
  manageSpinner(true);
  // console.log(id);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res)=> res.json())
    .then(data=> {
      removeActive();
      const clickCatBtn = document.getElementById(`btn-plant-${id}`)
      // console.log('clickBtn');
      clickCatBtn.classList.add("active");
      displayPlantCards(data.plants)
    });

}

const loadPlantDetail=async(id)=>{
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPlant(data.plants);
}
displayPlant=(plant)=>{
  // console.log(plant);
  const modelContainer = document.getElementById('details-container');
  modelContainer.innerHTML=`<div class="bg-white rounded-xl p-4 shadow-sm">
            <img class="w-full h-[300px] " src="${plant.image} alt="">
            <button onclick="loadPlantDetail(${plant.id})" class="font-bold text-2xl">${plant.name}</button>
            <p class="">${plant.description}</p>
            <div class="flex justify-between items-center m-2">
                <button class="bg-[#DCFCE7] text- text-green-500 px-3 py-1 rounded-full">${plant.category}</button>
                <p class="font-bold">৳${plant.price}</p>
                </div>
          </div>`;
  
  document.getElementById('plant_modal').showModal();
  
}
const displayPlantCards=(cards)=>{
    // console.log(cards);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML= "";
    
    for(let card of cards){
const cardDiv = document.createElement('div');
        cardDiv.innerHTML=`
          <div class="bg-white rounded-xl p-4 shadow-sm">
            <img class="w-[350px] h-[300px] " src="${card.image} alt="">
            <button onclick="loadPlantDetail(${card.id})" class="font-bold">${card.name}</button>
            <p class="w-[200px] truncate overflow-hidden whitespace-nowrap">${card.description}</p>
            <div class="flex justify-between items-center m-2">
                <button class="bg-[#DCFCE7] text- text-green-500 px-3 py-1 rounded-full">${card.category}</button>
                <p class="font-bold">৳${card.price}</p>
                </div>
                
                <button 
                  onclick="addCard({ id: ${card.id}, name: '${card.name}', price: ${card.price} })" 
                  class="bg-[#15803D] text-white px-3 py-2 rounded-3xl w-full">
                  Add to Cart
                </button>
          </div>`
        cardContainer.append(cardDiv);
    }
  manageSpinner(false);
}

const displayCategories=(categories)=>{
    // console.log(categories);
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML= "";
    for(let category of categories){
      // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML=`<button id="btn-plant-${category.id}" class="cat-btn text-left px-3 py-2 rounded-md  w-full hover:bg-green-900 hover:text-white" onclick="loadTree('${category.id}')">${category.category_name}</button> 
        `
        categoriesContainer.append(categoryDiv);
    }
}

loadCategories();
loadAllCards();