const express=require('express');
const app=express();
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userdata').then(()=>console.log("connected")).catch((err)=>console.log(err));
const User=require('./user.js');
const cors=require('cors');
app.use(cors());
app.use(express.json());


app.post('/check-email',async (req,res)=>{
   try{
      const {email}=req.body;
   const check=await User.findOne({email});
   if (check) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
   }
   catch(err)
   {
      console.log(err);
   }
})

app.post('/check-login',async (req,res)=>{
   const {email,password}=req.body;
   const check=await User.findOne({email,password});
   if(check)
   {
      const now=new Date();
      const update=await User.updateOne({email,password},{$set:{logintime:now}});
      console.log(update);
      return res.status(200).json({value:true});
   }
   else
   {
      return res.status(200).status({value:false});
   }
})


app.post('/adduser',async (req,res)=>{
   try{
      const {email,password}=req.body;
      const newuser=new User({email,password,logintime:"1999-12-31T18:30:00.000Z",logouttime:"1999-12-31T18:30:00.000Z"});
      const adduser=await newuser.save();
      console.log(adduser);
      return res.status(200).json("User successfully added!!");
   }
   catch(err)
   {
      console.log(err);
      return res.status(500).json("Something went wrong");
   }
})

app.get('/users', async (req, res) => {
   try {
       const users = await User.find();
       res.status(200).json(users);
   } catch (error) {
       console.error('Error fetching users:', error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.get('/userdetail',async(req,res)=>{
   try{
      let total=0;
      let online=0;
      let away=0;
      let offline=0;
      const users=await User.find();
      const now=new Date();
      now.setHours(now.getHours()+2);
      console.log(now);
      users.forEach(user => {
         if(user.logintime>user.logouttime && user.logintime<now)
         {
            online=online+1;
         }
         else if(user.logouttime>user.logintime)
         {
            offline=offline+1;
         }
         else
         {
            away=away+1;
         }
         });
         console.log(away+" "+offline+" "+online+" ");
      res.status(200).json({"offline":offline,"online":online,"away":away});
   }
   catch(err)
   {
      res.status(500).json({error:"internal server error"});
   }
})

app.post('/user-logout',async(req,res)=>{
   const {email,password}=req.body;
   console.log(email+" "+password);
   const user=await User.findOne({email,password});
   console.log(user);
   if(user)
   {
      const now=new Date();
      const update=await User.updateOne({email,password},{$set:{logouttime:now}});
      console.log(update);
      res.status(200).json("Successfully updated");
   }
   else
   {
      res.status(500).json({error:"something wrong"});
   }
})

app.listen(3000,()=>{console.log('listening to 3000 port')});