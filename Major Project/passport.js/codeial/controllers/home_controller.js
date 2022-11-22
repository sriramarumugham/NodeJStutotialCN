module.exports.home= function(req, res){

    console.log("Cookie" , req.cookies);
    res.cookie('_ID' , 666);

    return res.render('home',{title:"home"})
}