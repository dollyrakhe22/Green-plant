 
       
       
const loadCategories =()=>{
    const url = "h/";
    fetch(url)
    .then((res) => res.json())
    .then((json)=> displayCategories(json.categories));

};
//Tress
const loadTree=(id)=>{
     
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res)=> res.json())
    .then(data=> displayPlantCards(data.plants));
};
const displayPlantCards = (cards) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = " ";

    for (let card of cards) {
        const cardDiv = document.createElement('div');
        cardDiv.className = "bg-white rounded-xl shadow-md overflow-hidden flex flex-col";

        cardDiv.innerHTML = `
            <img class="w-full h-64 object-cover" src="${card.image}" alt="${card.name}">
            <div class="p-4 flex flex-col gap-2">
                <h3 class="font-bold text-lg md:text-xl">${card.name}</h3>
                <p class="text-gray-600 line-clamp-3">${card.description || ''}</p>
                <div class="flex justify-between items-center mt-2">
                    <button class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">${card.category}</button>
                    <p class="font-bold text-gray-800">৳${card.price}</p>
                </div>
                <button class="bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-3xl mt-3 w-full transition-colors duration-200">Add to Cart</button>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    }
};


//categories
const displayCategories=(categories)=>{
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML= "";

    for(let category of categories){
        // console.log(category);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `<button class="text-left px-3 py-2 rounded-md  w-full  text-[#1F2937] hover:bg-green-900
         hover:text-white " onclick="loadTree('${category.id}')">${category.category_name}</button> 
        `
        categoriesContainer.append(btnDiv);

    }
    

};

loadCategories();

