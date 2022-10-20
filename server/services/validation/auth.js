import Joi from "joi";


export const signupSchema = Joi.object().keys({    
    name: Joi.string().min(3).max(30).required(), 
    email : Joi.string().email({tlds:{allow:['edu','com','in']}}).required(),
    password: Joi.string().min(6).max(64).required(), 
    mobile : Joi.number().required() 
})
export const loginSchema = Joi.object().keys({
    email : Joi.string().email({tlds:{allow:['edu', 'com','in']}}).required(),
    password: Joi.string().min(9).max(64).required() 
})

 