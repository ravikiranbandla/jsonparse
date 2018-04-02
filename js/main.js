window.onload = function(e){
  var allbtns = document.getElementsByClassName("page-item");
  for (var i = 0; i < allbtns.length; i++) {
    allbtns[i].addEventListener('click', myFunction, false);
  }
}
var responseArray = new Array;
function myFunction() {
  var startval = this.getAttribute('start');
  if(startval == "0" && responseArray[0]) {
    htmlParse(responseArray[0]);
  }
  else if(startval == "10" && responseArray[1]) {
    htmlParse(responseArray[1]);
  }
  else if(startval == "20" && responseArray[2]) {
    htmlParse(responseArray[2]);
  }
  else{
    var ourRequest = new XMLHttpRequest();
    var url = "https://jsonplaceholder.typicode.com/posts?_start="+startval+"&_limit=10";
    ourRequest.open('GET', url);
    ourRequest.onload = function() {
      var ourJsonData = JSON.parse(ourRequest.responseText);
      htmlParse(ourJsonData);
      if(startval == "0") {
        responseArray[0] = ourJsonData;
      }
      else if(startval == "10") {
        responseArray[1] = ourJsonData;
      }
      else if(startval == "20") {
        responseArray[2] = ourJsonData;
      }
      else{}
    }
    ourRequest.send();
  }
}
function htmlParse(data) {
  var mainHtml = "";
  for (var i = 0; i < data.length; i++) {
    mainHtml += "<tr><td>"+data[i].id+"</td><td>"+data[i].title+"</td><td>"+data[i].body+"</td></tr>";
  }

  document.getElementById("information").innerHTML = mainHtml;
}
