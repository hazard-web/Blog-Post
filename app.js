const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');



const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');
const { JSON } = require('sequelize');
const Blog = require('./models/post');


const port = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public', 'js')));



app.use(adminRoutes);


app.get('/blog/add-blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json({ allBlogs: blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});


app.delete('/blog/delete-blog/:id', async (req, res) => {

    try {
        const blogId = req.params.id;
        await Blog.destroy({ where: { id: blogId } });
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(500).json(err);
    }
})




sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Runnung On Port ${port}`);
        })
    })
    .catch(err => console.log(err));

