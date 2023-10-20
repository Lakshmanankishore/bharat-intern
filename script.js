// Image Upload
const imageInput = document.getElementById("image-input");
const uploadButton = document.getElementById("upload-button");
const imagesDiv = document.getElementById("images");

uploadButton.addEventListener("click", () => {
    const file = imageInput.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        const img = document.createElement("img");
        img.src = imageURL;
        imagesDiv.appendChild(img);
    }
});

const blogContent = document.getElementById("blog-content");
const publishButton = document.getElementById("publish-button");
const blogList = document.getElementById("blogs");

publishButton.addEventListener("click", () => {
    const content = blogContent.value;
    if (content.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = content;
        blogList.appendChild(li);
        blogContent.value = "";
    }
});


uploadButton.addEventListener("click", () => {
    const file = imageInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("image", file);

        fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error(error);
            });
    }
});

publishButton.addEventListener("click", () => {
    const content = blogContent.value.trim();
    if (content !== "") {
        fetch("/api/create-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error(error);
            });
    }
});


// Load previously saved images from local storage
const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];

uploadButton.addEventListener("click", () => {
    const file = imageInput.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        const img = document.createElement("img");
        img.src = imageURL;
        imagesDiv.appendChild(img);

        // Save the image URL in local storage
        savedImages.push(imageURL);
        localStorage.setItem("savedImages", JSON.stringify(savedImages));
    }
});

const savedBlogEntries = JSON.parse(localStorage.getItem("savedBlogEntries")) || [];

publishButton.addEventListener("click", () => {
    const content = blogContent.value.trim();
    if (content !== "") {
        const li = document.createElement("li");
        li.textContent = content;
        blogList.appendChild(li);
        blogContent.value = "";

        // Save the blog entry in local storage
        savedBlogEntries.push(content);
        localStorage.setItem("savedBlogEntries", JSON.stringify(savedBlogEntries));
    }
});

// Load saved images and blog entries on page load
window.addEventListener("load", () => {
    savedImages.forEach(imageURL => {
        const img = document.createElement("img");
        img.src = imageURL;
        imagesDiv.appendChild(img);
    });

    savedBlogEntries.forEach(content => {
        const li = document.createElement("li");
        li.textContent = content;
        blogList.appendChild(li);
    });
});