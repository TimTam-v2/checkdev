document.querySelector('#dev-icon').addEventListener('click', function() {
    window.open('https://dev.to/', '_blank');
});


document.querySelector('#tag-icon').addEventListener('click', function() {
    window.open('https://dev.to/tags', '_blank');
});


// User-selected items are passed to a function that outputs column names and data as arguments
let btn_lst = document.querySelectorAll('.btn');
for (let i = 0; i < btn_lst.length; i++) {
    btn_lst[i].addEventListener('click', function() {
        let topic = this.innerText.replace('#', '');

        getAndDisplayPosts(topic);
        insertTitle(topic);

        document.getElementById('colname').classList.remove('hidden');
    });
}


let colname_list = [];
function insertTitle(topic) {

    if (colname_list.includes(topic) === false) {
        colname_list[colname_list.length] = topic;
        document.querySelector('th').innerText += '#' + topic;
    }
}

// Retrieve api data, format and insert into table
let topic_list = [];
async function getAndDisplayPosts(topic) {

    // Stop retrieve articles on the same topic
    if (topic_list.includes(topic) === false) {
        topic_list[topic_list.length] = topic;
    } else {
        return;
    }

    // Once a period is selected, the other period cannot be selected
    let span = document.getElementsByName('inlineRadioOptions');
    let top = '';
    for (let i = 0; i < span.length; i++) {
        if (span.item(i).checked) {
            if (span.item(i).value === 'option1') {
                top = '7';
                let input = document.querySelector('#inlineRadio2');
                input.disabled = true;
            } else {
                top = '30';
                let input = document.querySelector('#inlineRadio1');
                input.disabled = true;
            }
        }
    }

    const url = 'https://dev.to/api/articles/';

    // Retrive posts based on user-selected items
    // FIXME: It seems that specifying 'cache:no-cache' does not always retrieve the latest data
    let res = await fetch(url+ "?per_page=" + 10 + "&top=" + top + "&tag="+ topic, {cache: 'no-cache'});
    let data = await res.json();
    data.forEach(function(element) {
        let title = element.title;
        let itemurl = element.url;
        let tag_list = '';
        let reactions = element.positive_reactions_count;

        for (let i of element.tag_list) {
            tag_list += " #" + i;
        }

        // Insert content in td tag
        let tablerow = `
            <td class="post-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="16" height="16" cursorshover="true">
                    <g transform="translate(4 4)">
                        <ellipse fill="#F5F8FA" cx="8.828" cy="18" rx="7.953" ry="13.281"></ellipse>
                        <path fill="#E1E8ED" d="M8.828 32.031C3.948 32.031.125 25.868.125 18S3.948 3.969 8.828 3.969 17.531 10.132 17.531 18s-3.823 14.031-8.703 14.031zm0-26.562C4.856 5.469 1.625 11.09 1.625 18s3.231 12.531 7.203 12.531S16.031 24.91 16.031 18 12.8 5.469 8.828 5.469z"></path>
                        <circle fill="#8899A6" cx="6.594" cy="18" r="4.96"></circle>
                        <circle fill="#292F33" cx="6.594" cy="18" r="3.565"></circle>
                        <circle fill="#F5F8FA" cx="7.911" cy="15.443" r="1.426"></circle>
                        <ellipse fill="#F5F8FA" cx="27.234" cy="18" rx="7.953" ry="13.281" cursorshover="true"></ellipse>
                        <path fill="#E1E8ED" d="M27.234 32.031c-4.88 0-8.703-6.163-8.703-14.031s3.823-14.031 8.703-14.031S35.938 10.132 35.938 18s-3.824 14.031-8.704 14.031zm0-26.562c-3.972 0-7.203 5.622-7.203 12.531 0 6.91 3.231 12.531 7.203 12.531S34.438 24.91 34.438 18 31.206 5.469 27.234 5.469z" cursorshover="true"></path>
                        <circle fill="#8899A6" cx="25" cy="18" r="4.96"></circle>
                        <circle fill="#292F33" cx="25" cy="18" r="3.565"></circle>
                        <circle fill="#F5F8FA" cx="26.317" cy="15.443" r="1.426"></circle>
                    </g>
                </svg>
                <a href="${itemurl}" id="articlelink">${title}</a><br>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="16" height="16" cursorshover="true">
                    <g class="nc-icon-wrapper">
                        <path fill="#FFD983" d="M36.017 24.181L21.345 9.746C20.687 9.087 19.823 9 18.96 9H8.883C7.029 9 6 10.029 6 11.883v10.082c0 .861.089 1.723.746 2.38L21.3 39.017a3.287 3.287 0 004.688 0l10.059-10.088c1.31-1.312 1.28-3.438-.03-4.748zm-23.596-8.76a1.497 1.497 0 11-2.118-2.117 1.497 1.497 0 012.118 2.117z" cursorshover="true"></path>
                        <path fill="#D99E82" d="M13.952 11.772a3.66 3.66 0 00-5.179 0 3.663 3.663 0 105.18 5.18 3.664 3.664 0 00-.001-5.18zm-1.53 3.65a1.499 1.499 0 11-2.119-2.12 1.499 1.499 0 012.119 2.12z"></path>
                        <path fill="#C1694F" d="M12.507 14.501a1 1 0 11-1.415-1.414l8.485-8.485a1 1 0 111.415 1.414l-8.485 8.485z"></path>
                    </g>
                </svg>
                ${tag_list}<br>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="16" height="16" cursorshover="true">
                    <path fill="#DD2E44" d="M39.885 15.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C5.751 26.587 15.216 35.568 22 38.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z" cursorshover="true"></path>
                </svg>
                ${reactions}
            </td>
        `

        // Add content to table
        let table_item = document.getElementById('post-table');
        table_item.insertAdjacentHTML('beforeend', tablerow);

    });

    // Open in a new tab when clicking on the url
    let urls = document.querySelectorAll('.post-item a')
    for (let i = 0; i < urls.length; i++) {
        urls[i].addEventListener('click', function(e) {
            let url = this.getAttribute('href');
            window.open(url, '_blank');
            e.stopImmediatePropagation();
        });
    }
}


// Operation when "Clear" is selected
let clear = document.querySelector('#clear');
clear.addEventListener('click', function() {

    // Delete content placed in td tag
    let tdelement = document.querySelectorAll('td');
    for (let i = 0; i < tdelement.length; i++) {
        tdelement[i].remove();
    }

    // Initialize the topic list, column name list
    colname_list = [];
    topic_list = [];

    // Delete content entered in input tag
    document.querySelector('input').value = '';

    // Initialize th tag's text
    document.querySelector('th').innerText = '';

    // Enable hidden class in th tag
    let colnameid = document.querySelector('#colname');
    colnameid.classList.add('hidden');

    // Delete tags that came up as a result of the search
    document.querySelector('#search').innerHTML = '';

    // Clear radio button selections
    document.querySelector('#inlineRadio1').disabled = false;
    document.querySelector('#inlineRadio2').disabled = false;
    document.querySelector('#inlineRadio1').checked = true;
    document.querySelector('#inlineRadio2').checked = false;


    // Return to top of page
    window.scroll(0, 0);

});


// Obtain a list of tags with api and put them into a variable in list format
let tags = [];
document.addEventListener('DOMContentLoaded', async function() {
    const res = await fetch('https://dev.to/api/tags?per_page=1000');
    const data = await res.json();
    data.forEach(element => tags[tags.length] = element["name"]);
});


// Place buttons retrieved as a result of user input and search
let input = document.querySelector('input');
input.addEventListener('keyup', function(e) {
    let html = '';
    if (input.value) {
        for (tag of tags) {
            if (tag.startsWith(input.value)) {
                html = `<button id="result" type="button" class="btn btn-outline-primary btn-sm">#${tag}</button>`
            }
        }
    }
    document.querySelector('#search').innerHTML = html;
});
