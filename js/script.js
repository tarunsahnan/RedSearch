
//show comment/submission form 
function display(e){
    e.preventDefault();
    const val= detailedSearch.value;

    result.innerHTML="";

    if(val == 'submission'){
        submission.style.display = "grid";
        comment.style.display = "none";
    }
    else if(val == 'comment'){
        comment.style.display = "grid";
        submission.style.display = "none";   
    }
    else{
        submission.style.display = "none";
        comment.style.display = "none";
    }

}

//display alerts for 3 seconds
function showAlert(msg,cls){

    const tempAlert=document.createElement('div');
    tempAlert.appendChild(document.createTextNode(msg+'!'));
    tempAlert.className = `alert alert-${cls}`;
    const body = document.querySelector("body");
    const Area = document.querySelector('.searchArea');
    body.insertBefore(tempAlert, Area);

    setTimeout(()=>{
        document.querySelector('.alert').remove()
    },3000);

}

//event listener of search button
function search(e){
    e.preventDefault();

    const val= detailedSearch.value;

    searchButton.disabled=true;

    if(val == 'comment'){
        showAlert("Searching... Please Wait","info");
        commentSearch();
    }
    else if(val == 'submission'){
        showAlert("Searching... Please Wait","info");
        submissionSearch();
    }
    else{
        if(searchKey.value==""){
            showAlert("Cannot Search Empty List",'danger');
        }
        else
        defaultSearch();;
    }
}

//display result when none is selected
function defaultSearch(){
    console.log(searchKey.value);
  fetch(`https://api.pushshift.io/reddit/search/submission/?q=${searchKey.value}&over_18=false`)
                .then(res => res.json())
                    .then(res => {
                        
                        console.log(res.data);
                        let output="<div class='card-columns cardGrid'>";
                        res.data.forEach(item => {
                            output += `
                            <div class="card mb-3">
                            <div>
                                <div>
                                <div class="card-body">
                                    <a target="_blank" href="${item.full_link}" class="noHover">
                                    <h5 class="card-title">${item.title}</h5>
                                    </a>
                                    <p class="card-text"><small class="text-muted">${truncate(item.selftext,200)}</small></p>
                                    <a class="noHover" target="_blank" href="https://www.reddit.com/user/${item.author}"<p class="card-text"><i class="fa-solid fa-user "></i> ${item.author}</p></a>
                                    <p class="card-text line"><i class="fa-solid fa-comment"></i> ${item.num_comments}</p>
                                </div>
                                </div>
                            </div>
                            </div>`;
                        });
                        output+='</div>';
                        result.innerHTML = output;
                        console.log(document.querySelector(".result"));
                    });

    searchButton.disabled=false;
}

//generated url for submission search. It is helper function of function at line 157
function generateSubmissionUrl(urlStr){
    if(document.querySelector(`input[name="ids"]`).value != ""){
        urlStr += "&ids=" + document.querySelector(`input[name="ids"]`).value;
    }

    if(document.querySelector(`.author input`).value != ""){
        urlStr += "&author=" + document.querySelector(`.author input`).value;
    }

    if(document.querySelector(`.subreddit input`).value != ""){
        urlStr += "&subreddit=" + document.querySelector(`.subreddit input`).value;
    }

    if(document.querySelector(`.q-not input`).value != ""){
        urlStr += "&q:not=" + document.querySelector(`.q-not input`).value;
    }

    if(document.querySelector(`.title-yes input`).value != ""){
        urlStr += "&title=" + document.querySelector(`.title-yes input`).value;
    }

    if(document.querySelector(`.title-not input`).value != ""){
        urlStr += "&title:not=" + document.querySelector(`.title-not input`).value;
    }

    if(document.querySelector(`input[name="sort"]:checked`).value != ""){
        urlStr += "&sort=" + document.querySelector(`input[name="sort"]:checked`).value;
    }

    if(document.querySelector(`.sort-type select`).value != ""){
        urlStr += "&sort_type=" + document.querySelector(`.sort-type select`).value;
    }

    if(document.querySelector(`.score input`).value != ""){
        urlStr += "&score=" + document.querySelector(`.score input`).value;
    }

    if(document.querySelector(`.num_comments input`).value != ""){
        urlStr += "&num_comments=" + document.querySelector(`.num_comments input`).value;
    }

    if(document.querySelector(`.size input`).value != ""){
        urlStr += "&size=" + document.querySelector(`.size input`).value;
    }

    if(document.querySelector(`.after input`).value != ""){
        urlStr += "&after=" + document.querySelector(`.after input`).value;
    }

    if(document.querySelector(`.before input`).value != ""){
        urlStr += "&before=" + document.querySelector(`.before input`).value;
    }

    return urlStr;
}

//display result when submission is selected
function submissionSearch(){

    let urlStr=generateSubmissionUrl(searchKey.value);
    
    console.log(urlStr);
    fetch(`https://api.pushshift.io/reddit/search/submission/?q=${urlStr}&over_18=false`)
        .then(res =>res.json())
            .then(res => {
                console.log(res.data);

                console.log(res.data);
                        let output="<div class='card-columns cardGrid'>";
                        res.data.forEach(item => {
                            output += `
                            <div class="card mb-3">
                            <div>
                                <div>
                                <div class="card-body">
                                    <a target="_blank" href="${item.full_link}" class="noHover">
                                    <h5 class="card-title">${item.title}</h5>
                                    </a>
                                    <p class="card-text"><small class="text-muted">${truncate(item.selftext,200)}</small></p>
                                    <a class="noHover" target="_blank" href="https://www.reddit.com/user/${item.author}"<p class="card-text"><i class="fa-solid fa-user "></i> ${item.author}</p></a>
                                    <p class="card-text line"><i class="fa-solid fa-comment"></i> ${item.num_comments}</p>
                                </div>
                                </div>
                            </div>
                            </div>`;
                        });
                        output+='</div>';
                        result.innerHTML = output;
            });

    searchButton.disabled=false;
}

//truncate big strings to small length
function truncate(str,limit){
    const index= str.indexOf(' ',limit);
    if(index == -1) return str;
    return str.substring(0,index);
}

const searchButton = document.querySelector('.searchButton');
searchButton.addEventListener('click',search);

const detailedSearch = document.querySelector('.detailedSearch');
detailedSearch.addEventListener('click',display);

const searchKey = document.querySelector("input[name='default']");
const result =document.querySelector(".result");

const submission=document.querySelector('.submission');
const comment=document.querySelector('.comment');