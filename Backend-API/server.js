const express = require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'smartbrain'
  }
});



const app = express();
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
	res.json(database.users);
})

app.post('/signin' , (req,res)=>{
	db.select('email','hash').from('login')
	.where('email','=',req.body.email)
	.then(data=>{
		const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
		if(isValid){
			return db.select('*').from('users')
			.where('email','=',req.body.email)
			.then(user=>{
				res.json(user[0]);
			})
			.catch(err=>res.status(400).json('unable to get user'))
			
		}
		else{
			res.status(400).json("wrong email or password");
		}
	})
	.catch(err=>res.status(400).json('wrong credentials'))
})

app.get('/profiles/:id',(req,res)=>{
	const {id} = req.params;
	db.select('*').from('users').where({
		id:id
	})
	.then((user)=>{
		if(user.length>0){
			res.json(user[0]);
		}
		else{
			res.status(400).json("Not found");
		}
	})
	.catch((err)=>res.status(400).json("Not found"));
})

app.put('/image',(req,res)=>{
	const{id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then((entries)=>{
		res.json(entries);
	})
	.then((err)=>res.status(400).res("error getting entries"));
})

app.post('/register', (req,res)=>{
	const {name ,email , password} = req.body;
	const hash=bcrypt.hashSync(password);
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
				.returning('*')
				.insert({
					name:name,
					email:loginEmail[0],
					joined:new Date()
				})
				.then(user=>{
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err=>res.status(400).json(err));
})
app.listen(3000, ()=> {
	console.log("app is running on port 3000");
});

/*

/ --> this is working
 /signin --> POST = success/fail

 /register --> POST = user

 */




