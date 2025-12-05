fetch('https://jsonplaceholder.typicode.com/users')
    .then(value => value.json())
    .then(Users => {
        for(const user of Users) {
            const userBox=document.getElementById('userBox')
            const userContainer=document.createElement('div')
            userContainer.classList.add('userContainer')

            const name_id=document.createElement('div');
            name_id.classList.add('name_id');
            name_id.innerText=`${user.id} Name: ${user.name}`;

            const btnUser=document.createElement('button');
            btnUser.classList.add('btn');
            btnUser.innerText=`user-details`
            btnUser.addEventListener('click', (event)=>{
                window.location.href = `user-details.html?userId=${user.id}`;
            })
            userContainer.append(name_id,btnUser);
            userBox.appendChild(userContainer);
        }
    })





