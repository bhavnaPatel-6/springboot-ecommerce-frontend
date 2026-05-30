
  //  alert("bhavna");
function bg(color) {
    document.body.style.background = color;
}

function changeText(){
    document.getElementById("changeText").innerText="Hello Bhavna 👋";
}
let isDark=false;
function toggleMode(){
if(isDark){
     document.body.style.background ="Black";
     document.body.style.color = "white";
}else{
     document.body.style.background = "White";
document.body.style.color = "black";
}isDark = !isDark;
}

let count=0;
function update(){
let el = document.getElementById("count");
    el.innerText = count;

    if (count > 10) el.style.color = "green";
    else if (count < 10) el.style.color = "red";
    else el.style.color = "black";
    
}
function incre(){
count++;
update();
}
function decre(){
    if(count>0){
    count--;
}

    update();
}
function reset(){
    count=0;
    update();
}

let input = document.getElementById("inputbox");
let countText = document.getElementById("counter");

input.addEventListener("input",function(){
    let length=input.value.length;
    countText.innerText="Characters: "+length;
        if (length > 20) {
        countText.style.color = "red";
    } else {
        countText.style.color = "black";
    }

});

function add(){
    let input=document.getElementById("take");
        let task=input.value;

    if (task === "") {
        alert("Please enter a task!");
        return;
    }
    let li=document.createElement("li");
    li.innerText=task;
    let delBtn=document.createElement("button");
    delBtn.innerText="❌";

    delBtn.onclick=function(){
        li.remove;
    };
    li.onclick=function(){
            li.style.textDecoration = "line-through";
    };
    li.appendChild(delBtn);

 document.getElementById("list").appendChild(li);

    input.value = ""; 
}


let input1 = document.getElementById("search");
let items = document.querySelectorAll("#list li");

input1.addEventListener("input", () => {

    let value = input1.value.toLowerCase();

    items.forEach(function(item) {
        let text = item.innerText.toLowerCase();

        if (text.includes(value)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

});