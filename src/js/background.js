chrome.runtime.onInstalled.addListener(() => {
  // Disable action by default
  chrome.action.disable();

  // Enable action when Clockify app is open
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'app.clockify.me' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ]);
  });

  // Inject the content script when action is clicked
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js'],
    });
  });
});
