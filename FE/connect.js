const onSubmit=()=>{
	let users=[];
	const item=document.getElementsByClassName('input-text')
	for(let i=0;i<item.length;i++)
		users.push({
			id: i,
			text: item[i].value
		});
	
	fetch('http://localhost:4000/model',{
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(users)
	})
	.then(res=>res.json())
	.then(res=>console.log(res))
	.catch(err=>console.log(err));
}
/*
document.getElementById('input-dir')
.addEventListener("change",(event)=>{
	const files=event.target.files;
	const ul=document.getElementsByTagName('ul');
	for(let i=0;i<files.length;i++){
		let li=document.createElement('li');
		li.innerHTML=files[i].webkitRelativePath;
		console.log(li);
		//ul.appendChild(li);
	}
});
*/