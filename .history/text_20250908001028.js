const loadCategories =()=>{
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
    .then((res) => res.json())
    .then((json)=> displayCategories(json.categories));

};
//Tress
const loadTree=(id)=>{
     
    const url = "https://openapi.programming-hero.com/api/category/${id}"
    fetch(url)
    .then((res)=> res.json())
    .then(data=> displayPlantCards(data.plants));
};
const displayPlantCards=(cards)=>{
    // console.log(cards);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML= "";



    for(let card of cards){
         console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML=`
          <div class="bg-white rounded-xl p-4 flex flex-col h-[400px] shadow-sm">
            <img src="${card.image}" alt="" class="w-full h-50 object-cover">
            <h3 class="font-bold">${card.name}</h3>
            <p class="overflow-hidden h-16 mb-5">${card.description}</p>
            <div class="flex justify-between items-center mb-2">
                <button class="bg-[#DCFCE7] text-green-500 px-3 py-1 rounded-full w-25 truncate">${card.category}</button>
                <p class="font-bold">${card.price}</p>
                </div>
                <button class="bg-[#15803D] text-white px-3 py-2 rounded-3xl w-full">Add to Cart</button>
        </div>
        `
        cardContainer.append(cardDiv);
    }

}


//categories
const displayCategories=(categories)=>{
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML= "";

    for(let category of categories){
        // console.log(category);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `<button class="px-5 py-2 font-semibold  text-[#1F2937] hover:bg-green-900 hover:text-white " onclick="loadTree('${category.id}')">${category.category_name}</button> 
        `
        categoriesContainer.append(btnDiv);

    }

};

loadCategories();