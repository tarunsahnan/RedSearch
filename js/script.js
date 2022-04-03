
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

function search(e){
    e.preventDefault();

    if(searchKey.value==""){
        showAlert("Cannot Search Empty List",'danger');
    }
    else{

        showAlert("Searching... Please Wait","info");

        const val= detailedSearch.value;

        searchButton.disabled=true;

        if(val == 'comment')
            commentSearch();
        else if(val == 'submission')
            submissionSearch();
        else
            defaultSearch();;
    }
}

async function defaultSearch(){
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

function submissionSearch(){

}


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


