const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

//Get Posts
router.get('/', async (req,res) =>{
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// Post function
router.post(('/'), async (req,res) =>{
    const post = await loadPostCollection();
    await post.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    return res.status(201).send();
});

// Delete function
router.delete('/:id', async (req,res) =>{
    const post = await loadPostCollection();
    await post.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });

    res.status(202).send();
});

async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/Development',{
            useNewUrlParser: true,
            useUnifiedTopology:true
        }
    );

    return client.db('Development').collection('postes');
}

module.exports = router;