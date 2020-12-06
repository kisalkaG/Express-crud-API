const express = require('express');
const router = express.Router();
const users = require('../../Members');
const uuid = require('uuid');


//get all members
router.get('/', function(req,res){
    res.json(users);
});

//get single user
router.get('/:id', function(req,res){
    // res.send(req.params.id);

    const found = users.some(users => users.id === parseInt(req.params.id))

    if(found){
        res.json(users.filter(users => users.id === parseInt(req.params.id)));
    }else {
        res.status(400).json({msg:`No member with the id of ${req.params.id}`})
    }
    
});

//create user
router.post('/',(req,res) =>{
    
   const newMember = {
       id: uuid.v4(),
       name:req.body.name,
       university:req.body.university,
       status:'active'
   }

   if(!newMember.name || !newMember.university) {
       return res.status(400).json({msg:"Please include a name and email"});

   }

   users.push(newMember);
   res.json(users);

});

//update user
router.put('/:id', function(req,res){   

    const found = users.some(users => users.id === parseInt(req.params.id))

    if(found){
       const updMember = req.body;
       users.forEach(user => {
           if(user.id === parseInt(req.params.id)) {
               user.name = updMember.name ? updMember.name: user.name;
               user.university = updMember.university ? updMember.university: user.university;
          
               res.json({ msg: 'user updated', user});
            }
       });
    }else {
        res.status(400).json({msg:`No member with the id of ${req.params.id}`})
    }
    
});

//Delete user
router.delete('/:id', function(req,res){    

    const found = users.some(users => users.id === parseInt(req.params.id))

    if(found){
        res.json({
            msg:'User deleted',
            users:users.filter(users => users.id !== parseInt(req.params.id))});
    }else {
        res.status(400).json({msg:`No member with the id of ${req.params.id}`})
    }
    
});


module.exports = router;