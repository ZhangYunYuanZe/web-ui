var mainWindow;
var origin;
var streamWriter;
var currentTitle = '';
let handler = function (e) {
      // You must verify that the origin of the message's sender matches your
      // expectations. In this case, we're only planning on accepting messages
      // from our own origin, so we can simply compare the message event's
      // origin to the location of this document. If we get a message from an
      // unexpected host, ignore the message entirely.
      let parentDomain = window.location.host.substring(window.location.host.indexOf(".")+1)
      if (e.origin !== (window.location.protocol + "//" + parentDomain))
          return;
      mainWindow = e.source;
      origin = e.origin;

      let title = document.getElementById("appId").contentDocument.title;
      if (title != null && title != currentTitle) {
          currentTitle = title;
      }
      if (e.data.type == "ping") {
        mainWindow.postMessage({action:'pong'}, e.origin);
      } else if (e.data.type == "init") {
          load(e.data.appName, e.data.indexHTML, e.data.appFilePath);
      } else if(e.data.type == "respondToLoadedChunk") {
        respondToLoadedChunk(e.data.bytes);
      } else if(e.data.type == "currentTitleRequest") {
        currentTitleRequest(e);
      } else if(e.data.type == "shutdown") {
        removeServiceWorkerRegistration(() => { mainWindow.postMessage({action:'postShutdown'}, origin)});
      }
};
window.addEventListener('message', handler);

function removeServiceWorkerRegistration(callback) {
    if (navigator.serviceWorker == null) {
        console.log("navigator.serviceWorker == null");
        mainWindow.postMessage({action:'failedInit'}, origin);
    } else {
        navigator.serviceWorker.getRegistrations().then(
            function(registrations) {
                for(let registration of registrations) {
                    try {
                    registration.unregister();
                    } catch(ex) {
                        console.log(ex);
                    }
                }
                callback();
            }
        ).catch(err => {
            console.log("Failed initialisation:" + err);
            mainWindow.postMessage({action:'failedInit'}, origin);
        });
    }
}
function streamFile(seekHi, seekLo, seekLength, streamFilePath) {
    mainWindow.postMessage({action:'streamFile', seekHi: seekHi, seekLo: seekLo, seekLength: seekLength
        , streamFilePath: streamFilePath}, origin);
}
function actionRequest(filePath, requestId, apiMethod, bytes, hasFormData) {
    mainWindow.postMessage({action:'actionRequest', requestId: requestId, filePath: filePath, apiMethod: apiMethod,
    bytes: bytes, hasFormData: hasFormData}, origin);
}
function currentTitleRequest(e) {
    e.source.postMessage({action:'currentTitleResponse', title: currentTitle}, e.origin);
}
function load(appName, indexHTML, appFilePath) {
    let that = this;
    removeServiceWorkerRegistration(() => {
        let fileStream = streamSaver.createWriteStream(appName, "text/html", url => {
                let iframe = document.getElementById("appId");
                //appName == 'webbrowser' ? appFilePath :
                iframe.src= indexHTML + "?path=" + appFilePath;
            }, function(seekHi, seekLo, seekLength, streamFilePath){
                that.streamFile(seekHi, seekLo, seekLength, streamFilePath);
            }, 0
            ,function(filePath, requestId, apiMethod, bytes, hasFormData){
                that.actionRequest(filePath, requestId, apiMethod, bytes, hasFormData);
            }
        );
        that.streamWriter = fileStream.getWriter();
    });
}
function respondToLoadedChunk(bytes) {
    streamWriter.write(bytes);
}
