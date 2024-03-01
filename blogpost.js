




window.addEventListener('DOMContentLoaded', () => {
  fetchData();

});

async function fetchData() {

  await axios.get('http://localhost:8000/blog/add-blogs')
    .then(responses => {
      console.log(responses);
      const blogs = responses.data.allBlogs;
      console.log(blogs[0])
      for (let i = 0; i < blogs.length; i++) {
        addBlogToList(blogs[i]);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function addBlogToList(blog) {
  const { blogtitle, blogauthor, blogcontent } = blog;

  const liEle = document.getElementById('items');
  const li = document.createElement('li');
  li.style.backgroundColor = "black"; // Set background color to black

  // Blog title with styling
  const titleDiv = document.createElement('div');
  titleDiv.textContent = blogtitle;
  titleDiv.style.color = "white"; // Set text color to white
  titleDiv.style.cursor = "pointer"; // Set cursor to pointer
  titleDiv.style.marginBottom = "10px"; // Add some bottom margin for spacing
  titleDiv.style.fontWeight = "bold"; // Make the title bold
  li.appendChild(titleDiv);

  // Hidden div to contain author name and content
  const detailsDiv = document.createElement('div');
  detailsDiv.style.display = "none"; // Initially hide details
  detailsDiv.style.color = "white"; // Set text color to white

  // Author name with styling
  const authorSpan = document.createElement('span');
  authorSpan.textContent = "Author: " + blogauthor;
  authorSpan.style.color = "red";
  detailsDiv.appendChild(authorSpan);

  // Content with styling
  const contentPara = document.createElement('p');
  contentPara.textContent = blogcontent;
  contentPara.style.marginLeft = "20px";
  detailsDiv.appendChild(contentPara);

  // Comment feature
  const commentBtn = document.createElement('button');
  commentBtn.textContent = "Comment";
  commentBtn.onclick = function() {
    // Implement your logic for commenting here
    alert("Comment feature clicked!");
  };
  detailsDiv.appendChild(commentBtn);

  li.appendChild(detailsDiv);

  // Toggle details visibility on clicking title
  titleDiv.addEventListener('click', function() {
    if (detailsDiv.style.display === "none") {
      detailsDiv.style.display = "block";
    } else {
      detailsDiv.style.display = "none";
    }
  });

  // Append the list item to the parent element
  liEle.appendChild(li);






  // Delete button
  const btnn = document.createElement('button');
  btnn.className = "btn btn-danger";
  btnn.appendChild(document.createTextNode('Delete'));
  li.appendChild(btnn);

  li.appendChild(document.createTextNode(" "));

  // Edit button
  const edit = document.createElement('button');
  edit.className = "btn btn-primary";
  edit.appendChild(document.createTextNode('Edit'));
  li.appendChild(edit);

  liEle.appendChild(li);

  // Remove element function
  btnn.addEventListener('click', removeBlog);

  function removeBlog() {

    let id = blog.id;

    axios.delete('http://localhost:8000/blog/delete-blog/' + `${id}`)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    liEle.removeChild(li);
  }

  edit.addEventListener('click', editBlog);

  function editBlog() {

    let id = blog.id;

    document.getElementById('blogtitle').value = blogtitle;
    document.getElementById('blogauthor').value = blogauthor;
    document.getElementById('blogcontent').value = blogcontent;

    axios.delete('http://localhost:8000/blog/delete-blog/' + `${id}`)
      .then(response => console.log(response))
      .catch(err => console.log(err))



    liEle.removeChild(li);
  }
}










