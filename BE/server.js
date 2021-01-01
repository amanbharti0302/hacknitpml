const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const {spawn}=require('child_process');

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.post('/model',(req,res)=>{
	let processed=false;
	const child=spawn('python',['model.py',JSON.stringify(req.body)]);

	child.stdout.on('data',(data)=>{
		let model_output=data.toString();
		model_output=model_output.replace(/'/g,'"');
		try{
			processed=true;
			model_output=JSON.parse(model_output);
			return res.json(model_output);
		}
		catch(err){
			res.json(`this is bad => error: ${err}`);
		}
	})
	child.stderr.on('data',(data)=>{
		//console.error(data.toString());
		processed=true;
		res.json(data.toString());
	});
	child.on('exit',(code)=>{
		console.log(`Child exited with code ${code}`);
		if(!processed)
			res.json(`this is bad => code: ${code}`);
	});

});

app.listen(4000,()=>{
	console.log("I'm listening to port 4000");
});