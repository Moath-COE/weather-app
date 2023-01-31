/* Global Variables */
const absURL = 'http://127.0.0.1:8000' // website domain URL 
const baseURL = '/blog/recent-posts/'
const postsDiv = document.querySelector(".posts")
const loadMoreBtn = document.querySelector(".load-more")
let readMoreBtn = ""
let fetchPostNum = 5
let postFetched = 0

// Main functions
function main() {
    getPosts(fetchPostNum)
    .then((posts) => {
        renderPosts(posts)
    })
}


/*
*
* Script Functions
* 
*/ 


// Fetchin posts from databas function
const getPosts = async (num) => {
    const response = await fetch(absURL + baseURL + `${num}`)
    try {
        const posts = response.json()
        return posts
    } catch (error) {
        console.error('Failing to fetch posts from database!')
    }
}

// Rendring posts function
function renderPosts(posts) {
    const postsFrag = document.createDocumentFragment() // fragment varialbe

    // Looping through fetched posts
    posts.forEach(post => {
        let postDiv = document.createElement("div")
        postDiv.classList.add("post")
            
        postDiv.innerHTML = `
            <hr>
            <div class="post__body" >
                <img src="${post.image}" alt="img">
                <div class="post__info">
                    <div class="post__info__body">
                        <h3 class="post__title">
                            ${post.title}
                        </h3>
                        <span class="auther">
                            ${post.author}
                        </span>
                        <p class="post__prev">
                            ${post.description}
                        </p>
                    </div>
                    <div class="post__action">
                        <span class="time">
                        ${post.publish_date.slice(0, 10)}
                        </span>
                        <button class="read_more" value="${post.title}">Read more</button>
                    </div>
                </div>
            </div>
            `
        postsFrag.appendChild(postDiv)
    });
    postsDiv.appendChild(postsFrag)
    readMoreBtn = document.querySelectorAll(".read_more")
    readMoreBtn.forEach(btn => {
        btn.addEventListener("click", redirectUrl)
    });
}


// Routing function for read-more buttons
function redirectUrl(e) {
    e.preventDefault()
    window.location.href = window.location.href.slice(-8, 0) + `/post/${e.target.value}`
}


// Run script
main()