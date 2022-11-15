//redunt code
module.exports.add=function  (a,b){
    return a+b;
}
//non redunt code
exports.sub=function (a,b){
    return a-b;
}

// module is a whole File
// module.exports is a object 
// {
//     add:(){} is function
// }


module.exports.multiply=function  (a,b){
    return a*b;
}