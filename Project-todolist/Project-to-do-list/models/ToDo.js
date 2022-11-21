const mongoose=require('mongoose');

const ToDoSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    date:{
         type:String,
         required:true, 
    },
    category:{
        type:String, 
        required:true
    }
})
const ToDo=mongoose.model('ToDo' , ToDoSchema);

module.exports=ToDo;