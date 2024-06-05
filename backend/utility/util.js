import users from '../model/userSchema.js'

export async function removePasswordandSendData(object){

}

export async function sendOrderDetailstoCanteen(object){

}

export async function getStudentName(obj){
    const user= await users.findById(obj);
    return user.Name;
}

export async function getStudentUSN(obj){
    const user= await users.findById(obj);
    return user.USN;
}