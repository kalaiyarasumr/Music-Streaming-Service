const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());


let DataBase = [];


app.get('/get', async (req, res) => {
    try {
        res.json(DataBase);
    } catch(err) {
        console.log("Error in Player", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/create', async (req, res) => {
    try {
        const { file,description,title } = req.body;
        DataBase.push({file,description,title })
        res.json('done')
       
    } catch (error) {
        console.error('Error in Player Creation:', error);
    }
});


app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = DataBase.length; 
        DataBase = DataBase.filter(game => game.title !== id); 
        const finalLength = DataBase.length;
        if (finalLength < initialLength) {
            res.json('deleted');
            console.log("Music deleted successfully");
        } else {
            res.status(404).json('No Music found to delete');
            console.log("No Music found to delete");
        }
    } catch (error) {
        console.error('Error in deleting music:', error);
    }
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { file,description,title} = req.body;
    console.log(id)
    const dataIndex = DataBase.findIndex(data => data.title === id);

    if (dataIndex === -1) {
        console.log("not found");
    } else {
        DataBase[dataIndex].file = file;
        DataBase[dataIndex].description = description;
        DataBase[dataIndex].title = title;
        console.log('Music updated'); 
    }
    res.json('update');
});

app.get('/',(req,res)=>{
    res.send(DataBase)
})


app.listen(5000, () => {
    console.log("Server is Running")
})
