let activitiesList = [];
document.getElementById('list-display-div').style.display = 'none';
let editTask = function (taskId) { console.log('Edit Task Working. Task Id:', taskId); };
let deleteTask = function (taskId) { console.log('Delete Task Working. Task Id:', taskId); };
let addActivity = function () {
    let activityName = document.getElementById('activity-input').value;
    activitiesList.push({
        id: activitiesList.length + 1,
        name: activityName
    });
    let activity = document.createElement('div');
    activity.className = 'to-do-activity';
    activity.id = ('to-do-activity-id' + activitiesList.length + 1);
    let activityNameHead = document.createElement('h3');
    activityNameHead.innerHTML = activityName;
    activity.appendChild(activityNameHead);
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    editButton.className = 'edit-btn';
    deleteButton.className = 'delete-btn';
    editButton.innerHTML = 'Edit';
    deleteButton.innerHTML = 'Delete';
    let editButtonDiv = document.createElement('div');
    let deleteButtonDiv = document.createElement('div');
    editButtonDiv.className = 'edit-button-div';
    deleteButtonDiv.className = 'delete-button-div';
    editButton.onclick = editTask.bind(null, activitiesList.length + 1);
    deleteButton.onclick = deleteTask.bind(null, activitiesList.length + 1);
    editButtonDiv.appendChild(editButton);
    deleteButtonDiv.appendChild(deleteButton);
    document.getElementById('list-display-div').style.display = 'block';
    let activitiesDiv = document.getElementById('list-display-div');
    activity.appendChild(editButtonDiv);
    activity.appendChild(deleteButtonDiv);
    activitiesDiv.appendChild(activity);
    document.getElementById('activity-input').value = '';
}