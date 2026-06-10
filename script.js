async function translateText(){

let text=document.getElementById("inputText").value;

if(text.trim()===""){
alert("Please enter text");
return;
}

let source=document.getElementById("sourceLang").value;
let target=document.getElementById("targetLang").value;

let url=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

try{

let response=await fetch(url);
let data=await response.json();

let translated=data.responseData.translatedText;

document.getElementById("outputText").value=translated;

let li=document.createElement("li");
li.innerText=text+" ➜ "+translated;
document.getElementById("history").appendChild(li);

}catch(error){

alert("Translation Failed");

}
}

function copyText(){

let text=document.getElementById("outputText").value;

navigator.clipboard.writeText(text);

alert("Copied Successfully");
}

function speakText(){

let text=document.getElementById("outputText").value;

let speech=new SpeechSynthesisUtterance(text);

speechSynthesis.speak(speech);
}

function swapLanguages(){

let source=document.getElementById("sourceLang");
let target=document.getElementById("targetLang");

let temp=source.value;
source.value=target.value;
target.value=temp;
}

function downloadText(){

let text=document.getElementById("outputText").value;

let blob=new Blob([text],{type:"text/plain"});

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="translation.txt";

link.click();
}

function clearText(){

document.getElementById("inputText").value="";
document.getElementById("outputText").value="";
document.getElementById("count").innerText="0";
}

function darkMode(){

document.body.classList.toggle("dark");
}

document.getElementById("inputText").addEventListener("input",function(){

document.getElementById("count").innerText=this.value.length;

});

function startVoice(){

if(!('webkitSpeechRecognition' in window)){
alert("Voice input not supported in this browser");
return;
}

let recognition=new webkitSpeechRecognition();

recognition.lang="en-US";

recognition.start();

recognition.onresult=function(event){

document.getElementById("inputText").value=
event.results[0][0].transcript;

document.getElementById("count").innerText=
event.results[0][0].transcript.length;

};
}