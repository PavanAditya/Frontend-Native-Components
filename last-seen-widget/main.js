
let numberOfWidgets = 0;
let getLastSeen = () => {
    let inputTimeValue = document.getElementById('input-time').value;
    let lastSeenDisplay = document.getElementById('last-seen');
    let lastSeenWidget = document.createElement('div');
    lastSeenWidget.id = "widget-id-" + ++numberOfWidgets;
    lastSeenWidget.className = "last-seen-widget";
    let lastSeen = '';
    let timeNow = new Date(); // ? Current Time
    let inputTime = new Date(inputTimeValue); // ? Input time
    let timeDifference = Math.abs(timeNow.getTime() - inputTime.getTime()); // ? milliseconds difference
    if ((timeDifference / 1000) < 5) {
        lastSeen = 'just now';
    } else if ((timeDifference / 1000) < 60) {
        lastSeen = 'less than a minute ago';
    } else if ((timeDifference / 1000) < (60 * 60)) {
        lastSeen = `${Math.round((timeDifference / 1000) / 60)} minutes ago`;
    } else if ((timeDifference / 1000) < (60 * 60 * 24)) {
        lastSeen = `${Math.round(((timeDifference / 1000) / 60) / 60)} hours ago`;
    } else if ((timeDifference / 1000) < (60 * 60 * 24 * 7)) {
        lastSeen = `${Math.round((((timeDifference / 1000) / 60) / 60) / 24)} days ago`;
    } else if ((timeDifference / 1000) < (60 * 60 * 24 * 30)) {
        lastSeen = `${Math.round(((((timeDifference / 1000) / 60) / 60) / 24) / 7)} weeks ago`;
    } else if ((timeDifference / 1000) < (60 * 60 * 24 * 30 * 12)) {
        lastSeen = `${Math.round(((((timeDifference / 1000) / 60) / 60) / 24) / 30)} months ago`;
    } else if ((timeDifference / 1000) < (60 * 60 * 24 * 30 * 12 * 100)) {
        lastSeen = `${Math.round((((((timeDifference / 1000) / 60) / 60) / 24) / 30) / 12)} years ago`;
    } else {
        lastSeen = `Bro!! You're asking me to calculate a date more than a century ago. I can't do that.`;
    }
    lastSeenWidget.innerText = lastSeen;
    lastSeenDisplay.appendChild(lastSeenWidget);
    lastSeenDisplay.style.display = 'block';
}