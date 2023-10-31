export const loginRequest=(username,password)=>{
    return {type:'LOGIN_REQUEST',payload:{username,password}};

};

export const loginSuccess=(user)=>{
    return {type:"LOGIN_SUCCESS",payload:user}
}

export const loginFailure=(error)=>{
    return {type:'LOGIN_FAILURE',payload:error}
}