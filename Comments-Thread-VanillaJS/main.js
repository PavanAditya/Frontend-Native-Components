let comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : {};

const newComment = (id) => {
    return `
    <div id="comment-div-${id}">
    <textarea id="comment-${id}" cols="75" rows="5">${comments[id] ? comments[id].text : ''}</textarea><br />
    <button id="delete-${id}" onclick="deleteComment(${id})">Delete</button>
    <button id="reply-${id}" onclick="replyComment(${id})">Reply</button>
    <button id="add-${id}" onclick="saveComment(${id})">${comments[id] ? 'Edit' : 'Add'}</button>
    <br />
    <br />
    </div>
    `;
}

const newChildComment = (parentId, id) => {
    return `
    <div id="${parentId}^comment-div-${id}">
    <textarea id="${parentId}^comment-${id}" cols="50" rows="5">${comments[id] ? comments[id].text : ''}</textarea><br />
    <button id="${parentId}^delete-${id}" onclick="deleteComment(${id})">Delete</button>
    <button id="${parentId}^reply-${id}" onclick="replyComment(${id})">Reply</button>
    <button id="${parentId}^add-${id}" onclick="saveComment(${id})">${comments[id] ? 'Edit' : 'Add'}</button>
    <br />
    <br />
    </div>
    `;
}

function firstRender() {
    let commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';
    Object.keys(comments).map((el, i) => {
        let newCommentDiv = document.createElement('div');
        newCommentDiv.id = `comment-div-${el}`;
        newCommentDiv.innerHTML = newComment(el);
        commentsDiv.appendChild(newCommentDiv);
    });
};

function appendComment() {
    let commentsDiv = document.getElementById('comments');
    let newCommentDiv = document.createElement('div');
    let commentIndex = parseInt(Object.keys(comments).length - 1) + 1;
    newCommentDiv.id = `comment-div-${commentIndex}`;
    newCommentDiv.innerHTML = newComment(commentIndex);
    commentsDiv.appendChild(newCommentDiv);
}

function appendReplyComment(id, index) {
    let commentsDiv = document.getElementById(id);
    let newCommentDiv = document.createElement('div');
    newCommentDiv.style = "padding-left: 25px";
    let commentsChildren = Object.keys(comments[index].children);
    console.log(commentsChildren)
    let commentIndex = commentsChildren.length + 1;
    newCommentDiv.id = `${id}-comment-child-div-${commentIndex}`;
    newCommentDiv.innerHTML = newChildComment(id, commentIndex);
    commentsDiv.appendChild(newCommentDiv);
    console.log(commentsDiv)
}

function deleteComment(id) {
    delete comments[id];
    localStorage.setItem('comments', JSON.stringify(comments));
    firstRender();
}

function replyComment(id) {
    if (!comments[id]) {
        alert('Reply is not possible on this comment.');
    } else {
        appendReplyComment(`comment-div-${id}`, id);
    }
}

function saveComment(id) {
    comments[id] = comments[id] ? comments[id] : { text: '', children: {} };
    comments[id].text = document.getElementById('comment-' + id).value;
    localStorage.setItem('comments', JSON.stringify(comments));
    firstRender();
}

firstRender();