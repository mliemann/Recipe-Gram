function onLikeRecipe(event) {
    const recipeId = event.target.dataset.recipeId;
    const action = event.target.textContent.trim().toLowerCase();
    $.ajax({
        type: "POST",
        url: "/recipe/"+ recipeId+ "/like",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({"action": action}),
    })

    var numLikes = $("#num-likes");
    if(action === "like"){
        numLikes.text( parseInt(numLikes.text()) + 1);
    } else {
        numLikes.text( parseInt(numLikes.text()) - 1);
    }
    toggleLikeButton();
}

function toggleLikeButton() {
    var likeButton = $("#like-button");
    if(likeButton.text() === "Like"){
        likeButton.text("Unlike");
    }else {
        likeButton.text("Like");
    }
}