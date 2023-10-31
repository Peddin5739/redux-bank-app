export const loginRequest=(userName,password)=>{
    if(userName==='naveen' && password==='Naveen@2628')
    {
     return loginSuccess(userName)
    }
    else{
        return loginFailure("Incorrect username or password")
    }
};

export const loginSuccess=(user)=>{
    return {type:"LOGIN_SUCCESS",payload:user}
}

export const loginFailure=(error)=>{
    return {type:'LOGIN_FAILURE',payload:error}
}

export const clickSignin=()=>{
    return {type:'SIGNIN'}
}