const express = require('express');
const fs = require('fs');


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const scenariosData =  JSON.parse( fs.readFileSync('scenarios.json'));

app.get('/random',(req,res)=>{
        const randomIndex = Math.floor( Math.random() * scenariosData.length);
        const randomScenario = scenariosData[randomIndex];
        res.json(randomScenario);

})
app.post('/createtask', (req,res)=>{
        const newTask = req.body;
        const newTaskId = Date.now().toString();
        newTask.taskID = newTaskId;
        scenariosData.push(newTask);
        fs.writeFileSync('scenarios.json', JSON.stringify(scenariosData, null, 2));
        res.send("New task has been created successfully!");
})


app.listen(PORT, (req,res)=>{
        console.log(`Server is running on port ${PORT}`);
})