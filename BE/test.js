const {spawn}=require('child_process');

const users=[
	{
		id: 0,
		text: "hey it's awesome doing this together"
	},
	{
		id: 1,
		text: "I came in too"
	}
]

const child=spawn('python',['model.py',JSON.stringify(users)]);

child.stdout.on('data',(data)=>{
	const model_output=data.toString();
	console.log(model_output);
})
child.stderr.on('data',(data)=>{
	console.error(data.toString());
});
child.on('exit',(code)=>{
	console.log(`Child exited with code ${code}`);
});