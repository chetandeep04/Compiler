var BASE_URL="https://codequotient.com/api/";
var codeEditor=document.getElementById("editor");
var compileBtn=document.getElementById("btnCompile");
var languageSelector;
var outputHeading;
//variables for sending to server
var languageId;
var writtenCode;

compileBtn.addEventListener('click',initProcess);
function initProcess()
{
 languageSelector=document.getElementById("languageSelector");
 outputHeading=document.getElementById("outputHeading");
setLanguageId();
setCode();
sendCodeForSubmission();
}
function sendCodeForSubmission()
{
    var urlToSubmitCode=BASE_URL + "executeCode";
    //AJAX
    var request=new XMLHttpRequest();
    request.open("POST",urlToSubmitCode);
    request.setRequestHeader("Content-Type","application/json");
    var objectToSend={code:writtenCode,langId:languageId};
    request.send(JSON.stringify(objectToSend));
    request.addEventListener('load',function(){
        var response=JSON.parse(request.responseText);
         if("codeId" in response)
         {
             var codeId=response.codeId;
             checkForResultOfOurCode(codeId);
         }
         else{
             alert("Something went wrong!");
         }
    });
}
function checkForResultOfOurCode(codeId){
    var urlToCheck=BASE_URL +"codeResult/"+ codeId;
    var request=new XMLHttpRequest();
    request.open("GET",urlToCheck);
    request.send();
    request.addEventListener('load',function(){
      var response=JSON.parse(request.responseText);
      var data=JSON.parse(response.data);
      if(data.status==="Pending"){
          checkForResultOfOurCode(codeId);
      }
      else{
          if(data.errors!==""){
              outputHeading.innerHTML=data.errors;
          }
          else{
              outputHeading.innerHTML=data.output;
          }
      }
    });
}
function setCode()
{
    writtenCode=codeEditor.value;
    //console.log(code);
}

function setLanguageId(){
    var selectedLanguage = languageSelector.value;
    switch(selectedLanguage)
    {
        case "Java": languageId="8"; break;
        case "Python": languageId="0"; break;
        case "C": languageId="7"; break;
        case "C++": languageId="77"; break;
        default: languageId="4"; break;

    }

}