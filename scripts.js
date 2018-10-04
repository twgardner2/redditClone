var links = [  
    {  
        "text":"Google",
        "url":"https://www.google.com",
        "votes":1
    },
    {  
        "text":"Yahoo!",
        "url":"https://www.yahoo.com",
        "votes":0
    },
    {  
        "text":"Bing",
        "url":"https://www.bing.com",
        "votes":-1
    }
]


function generateRow(linkText, linkURL, linkVotes) {
    var newLink = document.createElement('div');
    newLink.classList.add('entryRow')

    var rowContents = 
            `<div class="arrows">` + 
                `<img src="img/up_arrow.png" class="buttonUpVote">` +
                `<p class="voteCount">${linkVotes}</p>` +
                `<img src="img/down_arrow.png" class="buttonDownVote">` +
            `</div> ` +
            `<div><a href="${linkURL}">${linkText}</a></div>`;

    newLink.innerHTML = rowContents;

    return newLink;
}

function handlerUpVote() {
    var voteCounter = this.parentNode.children[1];
    var prevVoteCount = parseInt(voteCounter.innerHTML);
    var newVoteCount = prevVoteCount + 1;
    voteCounter.innerHTML = newVoteCount;

    links = updateLinksArray();
    renderLinksList(links);
}

function handlerDownVote() {
    var voteCounter = this.parentNode.children[1];
    var prevVoteCount = parseInt(voteCounter.innerHTML);
    var newVoteCount = prevVoteCount - 1;
    voteCounter.innerHTML = newVoteCount;

    links = updateLinksArray();
    renderLinksList(links);
}

function updateLinksArray() {
    var newLinksArray = [];

    var linksList = document.getElementById('linksList');
    var children = linksList.childNodes;
    
    children = Array.from(children);

    children.forEach( child => {
        var text = child.querySelector('a').innerHTML;
        var url = child.querySelector('a').href;
        var voteCount = child.querySelector('.voteCount').innerHTML;

        newLinksArray.push({
            "text":text,
            "url":url,
            "votes":voteCount            
        })
    })

    return newLinksArray;
}


function renderLinksList(links) {
    // Clear links list
    var linksList = document.getElementById('linksList');
    while (linksList.firstChild) {
        linksList.removeChild(linksList.firstChild);
    }

    // Sort links by votes
    links.sort(function(a,b) {
        return b.votes - a.votes;
    });

    // Loop through links, add entryRow to linksList for each link
    links.forEach(link => {
        var linksList = document.getElementById('linksList');
        linksList.appendChild(generateRow(link.text, link.url, link.votes));
    });

    // Attach event listeners to up and down vote buttons
    var upVoteButtons = document.querySelectorAll(".buttonUpVote");
    var downVoteButtons = document.querySelectorAll(".buttonDownVote");

    upVoteButtons.forEach(function(button) {
        button.addEventListener('click', handlerUpVote);
    });

    downVoteButtons.forEach(function(button) {
        button.addEventListener('click', handlerDownVote);
    });


}

function newLinkButtonHandler() {
    var newLinkText = document.getElementById('newLinkText').value;
    var newLinkURL = document.getElementById('newLinkURL').value;

    var newLinkJSON = {
        "text":newLinkText,
        "url":newLinkURL,
        "votes":0
    }

    links.push(newLinkJSON);

    renderLinksList(links);

}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('submitNewLink').addEventListener('click', newLinkButtonHandler);

    // Render links list
    renderLinksList(links);



    return;
});