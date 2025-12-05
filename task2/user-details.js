const detailsContainer = document.getElementById('user-details-container');
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('User not found (HTTP ' + response.status + ')');
        }
        return response.json();
    })
    .then(user => {
        detailsContainer.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
                <p><strong>Website:</strong> <a href="mailto:${user.website}">${user.website}</a></p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Company:</strong> ${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode} <strong>geo:</strong> ${user.address.geo.lat},${user.address.geo.lng}  </p>
            `;
    })
    .catch(error => {
        console.error('Error loading data:', error);
        detailsContainer.innerHTML = `<h2>An error occurred while loading data: ${error.message}</h2>`;
    });
const btnUserPost=document.createElement('button');
btnUserPost.classList.add('btnPost');
btnUserPost.innerText=`post of current user`
btnUserPost.addEventListener('click', (event)=>{

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(value => value.json())
        .then(UsersPosts => {

            const boxPost=document.createElement('div');
            boxPost.classList.add('boxPost');
            for(let userPost of UsersPosts) {
                const postBtn=document.createElement('div');
                postBtn.classList.add('postBtn');

                const post=document.createElement('div');
                post.classList.add('post');
                post.innerText=userPost.title;

                const btnUserPost=document.createElement('button');
                btnUserPost.classList.add('btnPost');
                btnUserPost.innerText=`post-details`
                btnUserPost.addEventListener('click', (event)=>{
                    window.location.href = `post-details.html?userPost.id=${userPost.id}&userId=${userId}`;
                })
                postBtn.append(post,btnUserPost);
                boxPost.appendChild(postBtn);
            }
            document.body.appendChild(boxPost);
        })
})
document.body.appendChild(btnUserPost);





