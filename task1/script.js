let pairList =[{}];
pairList.splice(0, 1);

function showErrorModal(message) {
    document.getElementById('errorMessageText').textContent = message;
    document.getElementById('errorModal').style.display = 'block';
}
function closeErrorModal() {
    document.getElementById('errorModal').style.display = 'none';
}
function validateAndParsePair(input) {
    if (input.indexOf('=') === -1) {
        showErrorModal("Error: Pair must contain an equal sign - name=value.");
        return null;
    }
    const parts = input.split(/=(.*)/s);
    let name = parts[0].trim();
    let value = parts.length > 1 ? parts[1].trim() : '';
    if (name === '' || value === '') {
        showErrorModal("Error: Name and Value cannot be empty.");
        return null;
    }
    if (name.match(/^[a-zA-Z0-9]+$/) === null) {
        showErrorModal(`Error: Name ('${name}') must contain only alphanumeric characters.`);
        return null;
    }
    if (value.match(/^[a-zA-Z0-9]+$/) === null) {
        showErrorModal(`Error: Value ('${value}') must contain only alphanumeric characters.`);
        return null;
    }
    return { name: name, value: value };
}
function addPair() {
    const inputField = document.getElementById('pairInput');
    const inputString = inputField.value;
    const pair = validateAndParsePair(inputString);
    if (pair) {
        pairList.push(pair);
        printList();
        inputField.value = '';
    }
}
function printList() {
    const container = document.getElementById('pairList');
    container.innerHTML = '';
    pairList.forEach((pair, index) => {
        const p = document.createElement('p');
        p.textContent = `${pair.name} = ${pair.value}`;
        p.dataset.index = index;
        p.addEventListener('click', (e) => {
            p.classList.toggle('selected');
        });
        container.appendChild(p);
    });
}
function deletePair() {
    const selectedIndices = getSelectedParagraphs();

    if (selectedIndices.length === 0) {
        showErrorModal('Pair is not selected');
        return;
    }
    for (let i = selectedIndices.length - 1; i >= 0; i--) {
        pairList.splice(selectedIndices[i], 1);
    }
    printList();
}
function getSelectedParagraphs() {
    const selected = document.querySelectorAll('.pairList p.selected');
    return Array.from(selected).map(p => parseInt(p.dataset.index));
}
function sortPairName() {
    pairList.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    printList();
}
function sortPairValue() {
    pairList.sort((a, b) => {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    });
    printList();
}