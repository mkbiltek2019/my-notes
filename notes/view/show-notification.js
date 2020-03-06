/* global chrome, document */

const newVersionNotificationTemplate =
  document.getElementById("new-version-notification-template");

export default function showNotification(notification) {
  if (!notification) {
    return;
  }

  let node;
  if (notification.type === "NEW_VERSION") {
    node = newVersionNotificationTemplate.content.cloneNode(true);

    // <div>New version <span id="version"></span> has been installed.</div>
    const version = node.getElementById("version");
    version.innerText = notification.version;
  }

  // <a href="#" id="close">Close</a>
  const close = node.getElementById("close");
  close.addEventListener("click", (event) => {
    event.preventDefault();
    const element = document.getElementById("notification");
    element && document.body.removeChild(element);
    chrome.storage.local.remove("notification");
  });

  document.body.prepend(node);
}
