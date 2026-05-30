async function loginUser(){

    const username =
        document.getElementById("loginUsername").value;

    const password =
        document.getElementById("loginPassword").value;

    const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                password
            })
        }
    );

    if(response.ok){

        const token = await response.text();

        localStorage.setItem("token", token);

        alert("Login Success");

        window.location.href = "index.html";

    }else{
        alert("Invalid Credentials");
    }
}
async function registerUser(){

    const username =
        document.getElementById("registerUsername").value;

    const password =
        document.getElementById("registerPassword").value;

    const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                password
            })
        }
    );

    if(response.ok){
        alert("Registration Successful");
    }else{
        alert("Registration Failed");
    }
}