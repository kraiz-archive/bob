chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('app/index.html', {
        id: 'bobWindow',
        alwaysOnTop: true,
        innerBounds: {
            width: 782,
            height: 400,
            minWidth: 782,
            minHeight: 300
        }
    });
});

