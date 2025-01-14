var Userdb = require('../model/model')
//create and save new user 
exports.create = (req,res)=>{
if(!req.body){
    res.status(400).send({message:'Content cannot be empty!'});
    return
}
//new user
const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
})
//save user in database
user
  .save(user)
  .then(data =>{
    // res.send(data);
    res.redirect('/add-user')
  })
  .catch(err =>{
    res.status(500).send({message:err.message || 'some error occurred while creating a create operation'});
});
}
//retrive and return single user / retrieve and return all users 
exports.find= (req,res)=>{
//single user
if(req.query.id){
  const id = req.query.id;
  Userdb.findById(id)
         .then(data=>{
            if(!data){
                res.status(404).send({message: `User not found with id ${id}`});
            }else{
            res.status(200).send(data);
            }
         })
         .catch(err=>{
            res.status(500).send({message:`Error retrieving user with id ${id}`});
         });
}else{
//all users
   Userdb.find()
   .then(user =>{
    res.send(user)
   })
   .catch(err =>{
   res.status(500).send({message:err.message ||`Error while retrieving the user information`});
   })
}
}
//update a new identified user by user id
exports.update = (req,res)=>{
  if(!req.body){
     return res
          .status(404)
          .send({message:err.message ||`Error while updating the data cannot be empty`});
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate (id,req.body,{useFindAndModify:false})
       .then(data=>{
        if(!data){
            res.status(404).send({message:err.message ||`cannot update user with identified id ${id} or maybe user not found!`});
        } else{
            res.send(data);
        }
       })
       .catch(err =>{
    res.status(500).send({message: err.message || `error updating user information`});
       })
}
//delete a user with specified user id
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
           .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot delete user with id ${id} maybe id is wrong!`});
            }else{
                res.send({message:`User was deleted successfully!`});
            }
           })
           .catch(err=>{
            res.status(500).send({message:`Could not delete user with id ${id}`});
           })
}