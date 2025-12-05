const boxPost=document.createElement('div');
boxPost.classList.add('box-Post');

const urlParams = new URLSearchParams(window.location.search);
const postId = parseInt(urlParams.get('userPost.id'));
const userId = urlParams.get('userId');

async function printPostComments() {
    let post=await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(value => value.json())
        .then(UserPosts => {

            for (let userPost of UserPosts) {
                if (userPost.id === postId) {
                    boxPost.innerHTML = `
                <p><strong>Post UserId: </strong> ${userPost.userId}</p>
                <p><strong>Post Id:</strong> ${userPost.id}</p>
                <p><strong>Title:</strong> ${userPost.title}</p>
                <p><strong>Comments:</strong> ${userPost.body}</p>`;
                }
            }
            document.body.appendChild(boxPost);
        })

    let comment=await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(value => value.json())
        .then(comments => {
            const titleComment=document.createElement('div');
            titleComment.classList.add('titleComment');
            titleComment.innerText=`Сomments to the post`;
            const boxComments = document.createElement('div');
            boxComments.classList.add('boxComments');
            for (let comment of comments) {
                const commentContainer = document.createElement('div');
                commentContainer.classList.add('commentContainer');
                commentContainer.innerText = comment.body;
                boxComments.appendChild(commentContainer);
            }
            document.body.append(titleComment,boxComments);
        })}
printPostComments();