let encryptionRule = {
    'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q',
    'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U',
    'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y',
    'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C',
    'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G',
    'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K',
    'Y': 'L', 'Z': 'M',
    'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q',
    'e': 'r', 'f': 's', 'g': 't', 'h': 'u',
    'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y',
    'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c',
    'q': 'd', 'r': 'e', 's': 'f', 't': 'g',
    'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k',
    'y': 'l', 'z': 'm',
    '0': '5', '1': '6', '2': '7', '3': '8',
    '4': '9', '5': '0', '6': '1', '7': '2',
    '8': '3', '9': '4',
    '!': '#', '$': '%', '&': '+', '-': '@',
    '': '~', '#': '!', '%': '$', '+': '&',
    '@': '-', '~': ''
  }
const encrypt = (inputString) => {
    let encryptedString = '';
    for(char of inputString){
        encryptedString+=encryptionRule[char];
    }
    return encryptedString;
} 
const decrypt = (encryptedString) => {
    let actualString = '';
    let keys=Object.keys(encryptionRule);
    let values=Object.values(encryptionRule);
    for(char of encryptedString){
        actualString+=encryptionRule[char];
    }
    return actualString;
}
const DB_USERS=[]
const resetSignupFields = () => {
    console.log(document.getElementById('signup-first-name').value)
    document.getElementById('signup-first-name').value='';
    document.getElementById('signup-last-name').value='';
    document.getElementById('signup-email').value='';
    document.getElementById('signup-phone-number').value='';
    document.getElementById('signup-password').value='';
    document.getElementById('signup-confirm-password').value='';
    document.getElementById('tnC').checked=false;
    document.getElementById('first-name-valid').style.display='none';
    document.getElementById('last-name-valid').style.display='none';
    document.getElementById('email-valid').style.display='none';
    document.getElementById('phone-number-valid').style.display='none';
}
const resetLoginFields = () => {
    document.getElementById('login-email').value='';
    document.getElementById('login-password').value='';
}
const signup = () => {
    let firstName=document.getElementById('signup-first-name').value;
    let lastName=document.getElementById('signup-last-name').value;
    let email=document.getElementById('signup-email').value;
    let phone=document.getElementById('signup-phone-number').value;
    let password=document.getElementById('signup-password').value;
    let confirmPassword=document.getElementById('signup-confirm-password').value;
    let signupSuccessAlert=document.getElementById('signup-alert-success');
    let signupFailureAlert=document.getElementById('signup-alert-failure');
    let tnCInput=document.getElementById('tnC');
    let err=false;
    console.log(password+' '+confirmPassword)
    function valid(a,b){
        document.getElementById(a).style.display='block';
        document.getElementById(b).style.display='none';
    }
    function passwordValidity(str){
        if(str.includes('?') || str.includes('*') || str.includes('`') || str.includes('^') || str.includes('(') || str.includes(')') || str.includes('_') || str.includes('=') || str.includes('/') || str.includes('{') || str.includes('}') || str.includes('[') || str.includes(']') || str.includes('<') || str.includes('>') || str.includes(',') || str.includes('.') || str.includes('|') || str.includes("\\")){
            return false
        }
        let isDigit=false;let isLower=false
        for(var i=1;i<str.length;i++){
            if(parseInt(str.charAt(i),10)){
                isDigit=true;
            }
            else if(str.charCodeAt(i)>=97 && str.charCodeAt(i)<=122){
                isLower=true;
            }
        }
        return isDigit && isLower
    }
    if(firstName.length>=1 && !parseInt(firstName,10)){
        valid('first-name-valid','first-name-invalid');
    }
    else{
        valid('first-name-invalid','first-name-valid');
        err=true;
    }
    if(lastName.length>=1 && !parseInt(lastName,10)){
        valid('last-name-valid','last-name-invalid');
    }
    else{
        valid('last-name-invalid','last-name-valid');
        err=true;
    }
    if(email.length && email.includes('@') && email.includes('.') && email.length-email.lastIndexOf('.')>=3 &&
    email.indexOf('@')!=0 && email.indexOf('.')-email.indexOf('@')>=2 && email.indexOf('@')==email.lastIndexOf('@')){
        valid('email-valid','email-invalid');
    }
    else{
        valid('email-invalid','email-valid');
        err=true;
    }
    if(phone.length==10 && (parseInt(phone, 10)).toString().length==10){
        valid('phone-number-valid','phone-number-invalid');
    }
    else{
        valid('phone-number-invalid','phone-number-valid');
        err=true;
    }
    if(!(password.length>=5 && password===confirmPassword && password.charCodeAt(0)>=65 && password.charCodeAt(0)<=90 && passwordValidity(password)==true && password.includes('@'))){
        document.getElementById('password-invalid').style.display='block';
        err=true;
    }
    else{
        document.getElementById('password-invalid').style.display='none';
    }
    if(tnCInput.checked==false){
        document.getElementById("tnC-invalid").style.display='block';
        err=true;
    }
    else{
        document.getElementById("tnC-invalid").style.display='none';
    }
    console.log(err)
    if(err==false){
        let userDetails={
            firstName,
            lastName,
            email,
            password:encrypt(password),
            phone
        }
        DB_USERS.push(userDetails);
        resetSignupFields();
        console.log(userDetails);
        signupSuccessAlert.style.display='block'
        signupFailureAlert.style.display='none'
    }
    else{
        signupSuccessAlert.style.display='none'
        signupFailureAlert.style.display='block'
    }
    
}

    const login = () => {
        let enteredEmail=document.getElementById('login-email').value;
        let enteredPassword=document.getElementById('login-password').value;
        let LoginSuccessAlert=document.getElementById('login-alert-success');
        let LoginFailureAlert=document.getElementById('login-alert-failure');
        let currentUser=DB_USERS.find((user) => user.email===enteredEmail && decrypt(user.password)===enteredPassword)
        if(currentUser){
            LoginSuccessAlert.style.display='block';
            LoginFailureAlert.style.display='none';
        }
        else{
            LoginSuccessAlert.style.display='none';
            LoginFailureAlert.style.display='block';
        }
        console.log(JSON.stringify(currentUser))
        resetLoginFields();
    }
    
    
    