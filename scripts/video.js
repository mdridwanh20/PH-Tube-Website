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
const loadVideo = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => videoDisplay(data.videos))
    .catch((Error) => console.log('this is error', Error))
}


// load category video here:
const loadCategoriesVideo = (id) => {
    // alert(id)

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => videoDisplay(data.category))
    .catch((Error) => console.log('this is error', Error))
}


// const demoVideo = {
//     "category_id": "1003",
//     "video_id": "aaae",
//     "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
//     "title": "Inside Amy Schumer",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
//             "profile_name": "Amy Schumer",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "3.6K",
//         "posted_date": "15147"
//     },
//     "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
// }




            // problem 55 line kvabe aslo.
// video display:
const videoDisplay = (videos) => {
    const videosContainer = document.getElementById('videosContainer');
    videosContainer.innerHTML = "";

    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        
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

            <button onclick="loadCategoriesVideo(${item.category_id})" class="btn">
                ${item.category}
            </button>
            `
            categoriesContainer.append(buttonContainer)
        })
    };



loadCategories();
loadVideo()

