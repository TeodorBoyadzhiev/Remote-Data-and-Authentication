function attachEvents() {
    automaticAppend();
    document.getElementById('btnLoad').addEventListener('click', async function () {
        const url = 'http://localhost:3030/jsonstore/phonebook';
        const response = await fetch(url);
        const data = await response.json();

        const phonebook = document.getElementById('phonebook');

        phonebook.innerHTML = '';
        const appendData = Object.entries(data).forEach(([key, value]) => {
            let liElement = document.createElement('li');
            let currentPhone = `${value.person}: ${value.phone}`;

            liElement.setAttribute('id', key);
            liElement.textContent = currentPhone;

            phonebook.appendChild(liElement);
            deleteAttribute(liElement);
        });

        phonebook.addEventListener('click', (e) => {
            if (e.target.textContent == '[Delete]') {
                let liId = e.target.parentNode.getAttribute('id');

                deleteReq(liId);

                e.target.parentNode.remove();
            }
        });
    });
}
attachEvents();

async function getElements() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const data = await response.json();

    const phonebook = document.getElementById('phonebook');

    phonebook.innerHTML = '';
    const appendData = Object.entries(data).forEach(([key, value]) => {
        let liElement = document.createElement('li');
        let currentPhone = `${value.person}: ${value.phone}`;

        liElement.setAttribute('id', key);
        liElement.textContent = currentPhone;

        phonebook.appendChild(liElement);
        deleteAttribute(liElement);
    });
}

function automaticAppend() {
    document.getElementById('btnCreate').addEventListener('click', async function () {
        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;
        if (person === '' || phone === '') {
            alert('All inputs are require');
        } else {
            const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
                method: 'post',
                headers: { 'Content-type': 'aplication/json' },
                body: JSON.stringify({ person, phone }),
            });

            document.getElementById('person').value = '';
            document.getElementById('phone').value = '';
            getElements();
        }
    });
    
}
async function deleteAttribute(liElement) {

    const aElement = document.createElement('a');
    const textNode = document.createTextNode('[Delete]');
    aElement.appendChild(textNode);
    aElement.href = '#';
    aElement.style.background = 'red';

    liElement.appendChild(aElement);
}

async function deleteReq(liId) {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + liId, {
        method: 'delete'
    });
}





