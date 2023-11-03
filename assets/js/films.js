$(document).ready(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var year = $('#year').val();
        var type = $('#type').val();
        var omdbURL = 'https://www.omdbapi.com/?apikey=a470592d&s=' + title + '&y=' + year + '&type=' + type;

        $.get(omdbURL, function (data) {
            if (data.Search) {
                displayResults(data.Search);
            } else {
                $('#results').html('<p>Aucun résultat trouvé.</p>');
            }
        });
    });

    function displayResults(results) {
        var resultsContainer = $('#results');
        resultsContainer.empty();

        if (!results || results.length === 0) {
            resultsContainer.append('<p>Aucun résultat trouvé.</p>');
            return;
        }

        var rows = Math.ceil(results.length / 3);

        for (var i = 0; i < rows; i++) {
            resultsContainer.append('<div class="row">');
            for (var j = 0; j < 3; j++) {
                var index = i * 3 + j;
                if (index < results.length) {
                    var result = results[index];
                    var poster = result.Poster !== 'N/A' ? result.Poster : 'assets/img/film-roll.jpg';
                    var title = result.Title;
                    var year = result.Year;

                    var card = `
                    <div class="col-md-4">
                    <div class="card" style="width: 18rem; margin: 10px;">
                        <img src="${poster}" class="card-img-top" style="height: 200px;" alt="${title} Poster">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">Année: ${year}</p>
                        </div>
                    </div>
                </div>
                `;

                    $('.row:last').append(card);
                }
            }
            resultsContainer.append('</div>');
        }

        var pagination = '<ul class="pagination justify-content-center">';
        var pageCount = Math.ceil(results.length / 3);

        for (var page = 1; page <= pageCount; page++) {
            pagination += `<li class="page-item"><a class="page-link" href="#">${page}</a></li>`;
        }

        pagination += '</ul>';
        resultsContainer.append(pagination);

        $('.page-link').on('click', function () {
            var page = $(this).text();
            var startIndex = (page - 1) * 3;
            var endIndex = startIndex + 3;
            var pageResults = results.slice(startIndex, endIndex);

            displayResults(pageResults);
        });
    }
});


const choreographer = new Choreographer({
    animations: [
        {
            range: [-1, window.innerWidth],
            selector: '#titre',
            type: 'change',
            style: 'color',
            to: getRandomColor(),
        },
    ],
  });

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let isChangingColor = false; 

window.addEventListener('mousemove', (e) => {
    if (!isChangingColor) {
        isChangingColor = true;
        choreographer.runAnimationsAt(e.clientX);
        setTimeout(() => {
            choreographer.updateAnimations([{
                range: [-1, window.innerWidth],
                selector: '#titre',
                type: 'change',
                style: 'color',
                to: getRandomColor(),
            }]);
            isChangingColor = false;
        }, 1000); 
    }
});
