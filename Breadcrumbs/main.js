let tabs = [];

let moveToTab = function (tabId) {
    window.location.hash = 'tab' + tabId;
    let breadcrumbTabs = document.getElementsByClassName('breadcrumb-tab');
    for (let i=0; i<breadcrumbTabs.length; i++)
        breadcrumbTabs[i].className = breadcrumbTabs[i].className.replace(' breadcrumb-tab-active', '');
    breadcrumbTabs[tabId].className += ' breadcrumb-tab-active';
    let currentTab = document.getElementById('current-tab-name');
    currentTab.innerHTML = '';
    currentTab.innerHTML = document.getElementById('breadcrumb-tab-id-' + tabId).innerHTML;
}