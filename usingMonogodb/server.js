const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb+srv://<username>:.mongodb.net/<batabase-name>?retryWrites=true')

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
});

const blog = mongoose.model('Post', blogSchema);

app.get('/', async (req, res) => {
    try {
        const posts = await blog.find({});
        
        // Check if posts were found
        if (posts.length === 0) {
            return res.status(200).render('index', {
                postList: []
            });
        }
        res.render('index', {
            postList: posts
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
