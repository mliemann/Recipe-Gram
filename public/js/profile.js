const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");
var imageUrl;

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let file = imageInput.files[0];

  console.log(file);
  if (file !== undefined) {
    // get secure url from our server
    const { url } = await fetch("/s3Url").then((res) => res.json());
    console.log(url);

    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: file,
    });

    imageUrl = url.split("?")[0];
    console.log(imageUrl);

    // post requst to my server to store any extra data
    newFormHandler();

    // const img = document.createElement("img");
    // img.src = imageUrl;
    // document.body.appendChild(img);
  } else { 
    console.log("successful empty file")
   


    imageUrl = "https://cdn2.vectorstock.com/i/thumb-large/08/86/grandma-granny-baker-cook-loaf-bread-vector-1590886.jpg" 
    console.log(imageUrl);

    // post requst to my server to store any extra data
    newFormHandler();
  }
});

const newFormHandler = async (event) => {
  // event.preventDefault();

  const name = document.querySelector("#recipe-name").value.trim();
  let visibility = document.querySelector('input[name="Category2"]:checked').value;
  console.log(visibility);
  let category = document.querySelector('input[name="Category"]:checked').value;
  const description = document.querySelector("#recipe-desc").value.trim();
  const ingredients = document
    .querySelector("#recipe-ingredients")
    .value.trim();
  const directions = document.querySelector("#recipe-directions").value.trim();
  const recipeObj = {
      recipe_name: name,
      visibility: visibility,
      ingredients: ingredients,
      directions: directions,
      description: description,
      category_id: category,
      url: imageUrl,
  }

  console.log(recipeObj);

  const response = await fetch("/api/tables", {
    method: "POST",
    body: JSON.stringify(recipeObj),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to sign up");
  }

  // if (name && category && description && ingredients && directions) {
  //   const response = await fetch(`/api/tables`, {
  //     method: "POST",
  //     body: [
  //       description,
  //       ingredients,
  //       directions,
  //     ],
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/profile');
  //   } else {
  //     alert('Failed to create project');
  //   }
  // }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
 
    const response = await fetch(`api/tables/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

// document
//   .querySelector('.new-recipe-form')
//   .addEventListener('submit', newFormHandler);

document
  .querySelector('.recipe-list')
  .addEventListener('click', delButtonHandler);
