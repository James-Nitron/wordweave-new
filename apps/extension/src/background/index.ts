import { preFetchUser } from "./preFetchUser"

// Prefetch immediately when the background script loads
preFetchUser()

// Run daily word check when extension starts
chrome.runtime.onConnect.addListener(() => {
  preFetchUser()
})

chrome.runtime.onStartup.addListener(() => {
  preFetchUser()
})

// Also check when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  preFetchUser()
})

// Listen for messages from the popup to trigger prefetch
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PREFETCH_USER") {
    preFetchUser().then(sendResponse)
    return true // Keep the message channel open for async response
  }
})
