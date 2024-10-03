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

// card demo:
const cardDemo = {
    "category_id": "1003",
    "video_id": "aaac",
    "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
    "title": "Laugh at My Pain",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
            "profile_name": "Kevin Hart",
            "verified": true,
        }
    ],

    "others": {
        "views": "1.1K",
        "posted_date": "13885"
    },
    "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
};



// video display:
const videoDisplay = (videos) => {
    const videosContainer = document.getElementById('videosContainer');
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = `
        <figure class="h-[200px]">
            <img
            src="${video.thumbnail}"
            class="h-full w-full object-cover"
            alt="Shoes" />
        </figure>

         <div class="flex gap-5 py-4">

            <div>
                <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt="">
            </div>

            <div>
                <h2 class="font-bold">${video.title}</h2>

                <div class="flex items-center gap-2">
                    <p>${video.authors[0].profile_name}</p>
                    <img class="w-5 h-5 " src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000">
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
            console.log(item);

            const button = document.createElement('button')
            button.classList = "btn"
            button.innerText = item.category;

            categoriesContainer.append(button)
        })
    };



loadCategories();
loadVideo()

