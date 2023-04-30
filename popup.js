let activeTabId = "";

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  activeTabId = tabs[0].id;
});

document.addEventListener("DOMContentLoaded", function() {
  let btn = document.getElementById("debugBtn");
  getLocalStorageStatus().then(status => {
    btn.addEventListener("change", ontoggle);
    btn.checked = status;
  });
});

function getLocalStorageStatus() {
  return new Promise((resolve, reject) => {
    let message = {
      type: "GET_STATUS"
    };
    chrome.tabs.sendMessage(activeTabId, message, function(response) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        let status = response.tcDebugger === "true";
        resolve(status);
      }
    });
  });
}

function ontoggle(e) {
  let message = {
    type: "CHANGE_STATUS",
    payload: {
      checked: e.target.checked
    }
  };

  chrome.tabs.sendMessage(activeTabId, message, function(response) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (response.tcDebugger === "true") {
      console.log("trueeeee");
    } else {
      console.log("falseeeeee");
    }
  });
}
