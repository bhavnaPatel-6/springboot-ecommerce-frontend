async function loginUser() {

    const username =
        document.getElementById("loginUsername").value;

    const password =
        document.getElementById("loginPassword").value;

    const response = await fetch(`${API_URL}/api/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );

    if (response.ok) {

        const data = await response.json();

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "role",
            data.role
        );

        alert("Login Success");

        window.location.href = "user.html";

    } else {

        alert("Invalid Credentials");
    }
}
async function registerUser(){

    const username =
        document.getElementById("registerUsername").value;

    const password =
        document.getElementById("registerPassword").value;

    const response = await fetch(
       `${API_URL}/api/auth/register`,
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
        window.location.href = "user.html";
    }else{
        alert("Registration Failed");
    }
}