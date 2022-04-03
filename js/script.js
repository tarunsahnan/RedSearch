

document.querySelector('.searchButton').addEventListener('click',search);
document.querySelector('.detailedSearch').addEventListener('click',display);
// if(document.querySelector('input[name="detailed"]:checked')){
//     document.querySelector('input[name="detailed"]:checked').addEventListener('click',display);

// }
// function display(e){
//     e.preventDefault();
//     console.log(e);
// }

async function search(e){
    e.preventDefault();

    // default search no radio button seleced
    if(document.querySelector('input[name="detailed"]:checked') == null){
            console.log(10)
    }
}

function display(e){
    e.preventDefault();
    const val= document.querySelector('.detailedSearch').value;

    if(val == 'submission'){
        document.querySelector('.submission').style.display = "grid";
        document.querySelector('.comment').style.display = "none";
    }
    else{
        
        document.querySelector('.comment').style.display = "grid";
        document.querySelector('.submission').style.display = "none";
        
    }

}
function displaySubmission(){

}