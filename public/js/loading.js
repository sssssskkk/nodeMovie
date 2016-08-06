document.onreadystatechange = completeLoading;

function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loading');
        loadingMask.parentNode.removeChild(loadingMask);
    }
}