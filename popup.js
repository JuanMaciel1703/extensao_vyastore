chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    chrome.storage.local.get(['produtos_vyastore'], function(items) {
      var stringJson = JSON.stringify(items.produtos_vyastore);
      var qtdProdutos = JSON.parse(items.produtos_vyastore).length;

      message.innerHTML = "<h1>Dados coletados com sucesso!</h1>";
      // chrome.browserAction.setBadgeBackgroundColor({ color: [231, 76, 60] });
      chrome.browserAction.setBadgeText({text: qtdProdutos.toString()});

      txtStringJson.value = items.produtos_vyastore;
      navigator.clipboard.writeText(items.produtos_vyastore);
    });
  }

  document.querySelector("#btnLimpar").addEventListener("click", function(){
      if(confirm("Deseja Realmente limpar a lista de produtos")){
        chrome.storage.local.remove(['produtos_vyastore'], function(items) {
          txtStringJson.value = "";
         });
      }
      return;
  });
  //
  // btnCopiar.addEventListener("click", function(){
  //   console.log('items');
  //   chrome.storage.local.get(['produtos_vyastore'], function(items) {
  //
  //     chrome.browserAction.setBadgeBackgroundColor({ color: [231, 76, 60] });
  //     chrome.browserAction.setBadgeText({text: produtos.length});
  //
  //     txtStringJson.value = items.produtos_vyastore;
  //     navigator.clipboard.writeText(items.produtos_vyastore);
  //   });
  // });

});



function onWindowLoad() {

  var message = document.querySelector('#message');
  var txtStringJson = document.querySelector('#txtStringJson');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

window.onload = onWindowLoad;
