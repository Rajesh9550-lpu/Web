function Validation(values){

    let error = {}

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


if(values.Name===""){
    error.Name="Name should not be empty"
}
else{
    error.Name=" "
}

if(values.Email === "") {

error.Email = "Please enter the email"

}

else if(!email_pattern.test(values.Email)) {

error.Email = "Email Didn't match"

}else {

error.Email =""

}

return error;
}
export default Validation