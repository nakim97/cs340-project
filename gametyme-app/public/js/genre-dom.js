function showEdit( selectedGenre ){
    document.getElementById("editGenre").style.display = "block";
    document.getElementById("selectGenreName").value = selectedGenre;
}

function hideEdit() {
    document.getElementById("editGenre").style.display = "none";
}

function addNew(){
    document.getElementById("addGenre").style.display = "block";
}


document.getElementById("cancelGenreAddBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.getElementById("addGenre").style.display = "none";
})

document.getElementById("cancelBtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("deleteGenre").style.display = "none";
})