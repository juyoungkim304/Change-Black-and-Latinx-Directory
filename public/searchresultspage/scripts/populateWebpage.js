// Populates webpage with data given in 'results' parameter, which is a list of json objects
function fillInData(results) {
    console.log("Inside populateWebpage.js")
    // Container where each row of results is appended to
    var searchResultContainer = document.querySelector("#resultsContainer");

    // Pagination bar at bottom of searchResultContainer - need to add rows before this
    var pagination = document.querySelector("#pagination");

    // Store each row to be appended
    var row;

    for(var i = 0; i < results.length; i++) {

        // Each row stores 4 results, so after every 4 elements in 'results' array, we append row to 
        // searchResultsContainer and create a new empty row
        if(i % 4 == 0) {
            if(i > 0) {
                var temp = row;
                searchResultContainer.insertBefore(temp, pagination);
            }
            row = document.createElement('div');
            row.setAttribute('class', 'row-div row');
        }

        // Generate HTML outer layer for each element in row
        var rowElement = document.createElement('div');
        rowElement.setAttribute('class', 'col-sm-3');

        // Fill this row element
        var element = createContent(results[i]);
        rowElement.appendChild(element);

        // Append back to row
        row.appendChild(rowElement);
    }

    // Append last row to container
    searchResultContainer.insertBefore(row, pagination);
}

// Fills, places, and formats data from 'content' parameter (the json object for a single result) into a div
// and return that div
function createContent(content) {

    // Create container for each element
    var outsideDiv = document.createElement('div');
    outsideDiv.setAttribute('class', 'card');

    // Get and format image
    var img = document.createElement('img');
    img.setAttribute('src', content['pic']);
    img.setAttribute('class', 'card-image card-img-top');

    // Create and format div to hold rest of information
    var innerDiv = document.createElement('div');
    innerDiv.setAttribute('class', 'card-body');

    // Name
    var name = document.createElement('h5');
    name.setAttribute('class', 'card-title');
    name.innerHTML = content['first_name'] + ' ' + content['last_name'];

    // Major
    var major = document.createElement('p');
    major.setAttribute('class', 'card-text');
    major.innerHTML = 'Major: ' + content['major_or_program'];

    // Relation to Vanderbilt
    var relation = document.createElement('p');
    relation.setAttribute('class', 'card-text');
    relation.innerHTML = 'Status: ' + content['relation'];

    var link = document.createElement('a');
    link.setAttribute('class', 'btn btn-primary');
    link.setAttribute('href', 'http://localhost:8080/profile$'+(content['uid']-1));
    link.innerHTML = "More";

    // Append information (besides image) to the inner div
    innerDiv.appendChild(name);
    innerDiv.appendChild(major);
    innerDiv.appendChild(relation);
    innerDiv.appendChild(link);

    // Append image and inner div to the overall element div that is returned
    outsideDiv.appendChild(img);
    outsideDiv.appendChild(innerDiv);

    return outsideDiv;
}

fillInData(pcbg);