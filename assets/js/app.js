var films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        title: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

function displayFilms() {
    var tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; 

    films.forEach(function (film, index) {
        addFilmToTable(film, index);
    });
}

function addFilmToTable(film, index) {
    var tableBody = document.querySelector('table tbody');
    var row = tableBody.insertRow(index);

    var titleCell = row.insertCell(0);
    titleCell.textContent = film.title;

    var yearCell = row.insertCell(1);
    yearCell.textContent = film.years;

    var authorCell = row.insertCell(2);
    authorCell.textContent = film.authors;

    var deleteCell = row.insertCell(3);
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.addEventListener('click', function () {
        if (confirm('Voulez-vous vraiment supprimer ce film ?')) {
            tableBody.deleteRow(index);
        }
    });
    deleteCell.appendChild(deleteButton);
}

var addFilmBtn = document.getElementById('addFilmBtn');
var addFilmForm = document.getElementById('addFilmForm');

addFilmBtn.addEventListener('click', function () {
    addFilmForm.style.display = 'block';
});


var saveFilmBtn = document.getElementById('saveFilmBtn');

saveFilmBtn.addEventListener('click', function () {
    var titleInput = document.getElementById('title');
    var yearInput = document.getElementById('year');
    var authorInput = document.getElementById('author');
    var isValid = true;
    var errorMessage = '';

    if (titleInput.value.length < 2) {
        isValid = false;
        errorMessage += 'Titre : minimum 2 caractères\n';
    }

    var currentYear = new Date().getFullYear();
    if (yearInput.value < 1900 || yearInput.value > currentYear) {
        isValid = false;
        errorMessage += 'Année : format de l\'année 4 chiffres compris entre 1900 et ' + currentYear + '\n';
    }

    if (authorInput.value.length < 5) {
        isValid = false;
        errorMessage += 'Auteur : minimum de 5 caractères\n';
    }

    if (isValid) {
        var newFilm = {
            title: titleInput.value.charAt(0).toUpperCase() + titleInput.value.slice(1),
            years: parseInt(yearInput.value),
            authors: authorInput.value.charAt(0).toUpperCase() + authorInput.value.slice(1)
        };

        films.push(newFilm); 
        addFilmToTable(newFilm, films.length - 1);

        addFilmForm.style.display = 'none';
        addFilmForm.reset();

        displayAlertMessage('Film ajouté avec succès', 3000);
    } else {
        displayAlertMessage('Erreur dans le formulaire\n' + errorMessage, 5000);
    }
});


function displayAlertMessage(message, duration) {
    var alertMessage = document.createElement('div');
    alertMessage.textContent = message;
    alertMessage.classList.add('alert', 'alert-success');
    document.body.appendChild(alertMessage);

    setTimeout(function () {
        alertMessage.remove();
    }, duration);
}

var filterSelect = document.getElementById('filter');

filterSelect.addEventListener('change', function () {
    var selectedValue = filterSelect.value;

    if (selectedValue === 'title') {
        films.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
    } else if (selectedValue === 'year') {
        films.sort(function (a, b) {
            return b.years - a.years;
        });
    }

    displayFilms(); 
});


displayFilms();
