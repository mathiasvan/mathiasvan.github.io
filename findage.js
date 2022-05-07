function getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}
document.getElementById("age").innerHTML =
    "I am " +
    getAge("10/08/2007") +
    " years old and I absolutely <strong><em>love</em></strong> programmming!";