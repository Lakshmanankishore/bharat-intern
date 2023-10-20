const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const images = [];
const blogs = [];

app.post('/api/upload-image', (req, res) => {
    const { imageURL } = req.body;
    if (imageURL) {
        images.push(imageURL);
        res.status(201).json({ message: 'Image uploaded successfully' });
    } else {
        res.status(400).json({ message: 'Invalid image URL' });
    }
});

app.post('/api/create-blog', (req, res) => {
    const { content } = req.body;
    if (content) {
        blogs.push(content);
        res.status(201).json({ message: 'Blog created successfully' });
    } else {
        res.status(400).json({ message: 'Invalid blog content' });
    }
});

app.get('/api/images', (req, res) => {
    res.json(images);
});

app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});