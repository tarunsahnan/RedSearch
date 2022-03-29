import reddit from './redditAPI.js';


function search(e){
    e.preventDefault();

    let key = document.querySelector('.searchText input').value;
    let sort = document.querySelector('input[name="radio"]:checked').value;
    let  limit= document.querySelector('select').value;
    
    if(key == "")
        showMsg("Please enter the Keyword","error");
    else{
    reddit.fetchResult(key,sort,limit);


    }
}


function showMsg(msg,cls){
    let div = document.createElement('div');
    div.className=`alert ${cls}`;
    div.appendChild(document.createTextNode(msg));

    body.insertBefore(div,searchArea);
    console.log(div.classList);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

document.querySelector(".btn").addEventListener('click',search);
let searchArea = document.querySelector(".searchArea");
let form = document.querySelector('form');
let body = document.querySelector('body');