const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#recipe-name').value.trim();
  const category = document.querySelector('#recipe-category').value.trim();
  const description = document.querySelector('#recipe-desc').value.trim();
  const ingredients = document.querySelector('#recipe-ingredients').value.trim();
  const directions = document.querySelector('#recipe-directions').value.trim();


  if (name && category && description && ingredients && directions) {
    const response = await fetch(`/api/projects`, {
      method: "POST",
      body: [
        description.split(" "),
        ingredients.split(" "),
        directions.split(" "),
      ],
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-recipe-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
