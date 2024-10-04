// 1. fetch: load and show categories on html


// create loadCategories:
const loadCategories = () => {
// fetch the data:
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}
    
//  video categories
const loadVideo = (searchTex = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTex}`)

    .then((res) => res.json())
    .then((data) => videoDisplay(data.videos))
    .catch((Error) => console.log('this is error', Error))
}

// remove active class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for (let btn of buttons){
        btn.classList.remove("active")
    }
    
}

// load category video here:
const loadCategoriesVideo = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    
    .then((data) => {
        removeActiveClass()
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active')
        
        videoDisplay(data.category);
    })

    .catch((Error) => console.log('this is error', Error))
}

// load data button details:
const loadDetails = async(videoId) => {
    console.log('this is detail ', videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video)
}

// display details video:
const displayDetails = (video) => {

    // show modal here
    const detailContainer = document.getElementById('modelContent');
    document.getElementById('videoModal').showModal();

    // show modal innerHtml cnt;
    detailContainer.innerHTML = `
        <img src="${video.thumbnail}">
        <p class="mt-4">${video.description}</p>
    `;
}


        // problem 55 line kvabe aslo.
// video display:
const videoDisplay = (videos) => {
    const videosContainer = document.getElementById('videosContainer');
    videosContainer.innerHTML = "";
    // drawing work 
    if (videos.length === 0){
        videosContainer.classList.remove("grid")
        videosContainer.innerHTML = `
        
        <div class="w-full h-[300px] flex justify-center items-center flex-col gap-6">
            <img src="./Icon.png" alt="">
            <h2 class="text-center font-bold text-xl">No content here in this category</h2>
        </div>
        `
    } else {
        videosContainer.classList.add("grid")
    }

    videos.forEach((video) => {
        console.log(video);

        // video card create here
        const card = document.createElement('div');
        card.classList = 'card border p-4 card-compact'
        
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img
            src="${video.thumbnail}"
            class="h-full w-full object-cover"
            alt="Shoes"/>
            ${
                video.others.posted_date?.length == 0 
                ? ""
                : `<span class="absolute right-2 bottom-2 bg-black px-2 text-white">
                ${getTimeString(video.others.posted_date)}</span>`
            }
            
        </figure>

         <div class="flex gap-5 py-4">

            <div>
                <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt="">
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p>${video.authors[0].profile_name}</p>

                    ${video.authors[0].verified === true
                        ? `<img class="w-5 h-5 " src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000">` : ''}
                </div>
                <p>${video.others.views}</p>
            </div>
        </div>

            <div class="text-right">
                <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-primary rounded-sm text-white">Details</button></p>
            </div>

    `;
     videosContainer.append(card)

    })
}


// create display categories:
    const displayCategories = (categories) => {
        const categoriesContainer = document.getElementById('categories');

        categories.forEach((item) => {
            // console.log(item);
            const buttonContainer = document.createElement('div')
            buttonContainer.innerHTML = `

            <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn category-btn">
                ${item.category}
            </button>
            `
            categoriesContainer.append(buttonContainer)
        })
    };


// search input here
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        loadVideo(e.target.value);
    })


loadCategories();
loadVideo()


