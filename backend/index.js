require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=> console.log('MongoDB connected'));

const ProjectSchema = new mongoose.Schema({
  name: String, ownerId: String, coords: { lat: Number, lon: Number }, ecosystemType: String, media: [String], verified: Boolean
});
const Project = mongoose.model('Project', ProjectSchema);

app.post('/api/projects', async (req, res) => {
  const p = await Project.create({ ...req.body, verified: false });
  res.json(p);
});

app.get('/api/projects', async (req,res)=> {
  const all = await Project.find();
  res.json(all);
});

app.listen(process.env.PORT || 5000, ()=> console.log('Server started'));