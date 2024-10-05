
// there are 6 different ways to declare js function. 
// below are 2 examples

module.exports.getDate = function(){
    let today = new Date();
   
    let options = {
            weekday:"long",
            day : "numeric",
            month : "long"
    };
    let day = today.toLocaleDateString("en-US" , options);
    return day
}

module.exports.getDay = getDay;

function getDay(){
    let today = new Date();
   
    let options = {
            weekday:"long",
    };
    let day = today.toLocaleDateString("en-US" , options);
    return day
}
