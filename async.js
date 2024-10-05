//promise

const paymentSuccess = true;
const mark = 80;

function enroll(){
    console.log("Course enrollment is in progress");

    const promise = new Promise(function(resolve, reject){

        setTimeout(function(){
            if(paymentSuccess){
                resolve();
            }
            else{
                reject("Payment failed");
            }
        }, 2000);
    })

    return promise;
}

function progress(){
    console.log("Course progress");

    const promise = new Promise(function(resolve, reject){

        setTimeout(function(){
            if(mark >= 80){
                resolve();
            }
            else{
                reject("low mark");
            }
        }, 2000);
    })

    return promise;
}

function getCertificate(){

    console.log("Preparing Certificate");

    const promise = new Promise(function(resolve, reject){

        //no need reject as in this stage nothing to reject.
        setTimeout(function(){
           resolve("You made it!");
        }, 2000);
    })

    return promise;

}

enroll()
    //if enroll is successful, and resolve the promise
    .then(progress) //can directly pass progress as it doesnt receive any parameter
    //if progreess is succeesful, then go to getCertificate
    .then(getCertificate)
    .then(function(value){
        //here we need an anonymous function as getCertificae returens 
        //a values in its resolve. need to catch the value to display it
        console.log(value);
    })
    .catch(function(error){
        //one cathc is enough to handle the errors of
        //multiple ".then"
        console.log(error)
    })