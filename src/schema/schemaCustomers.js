import joi from "joi";

const customerSchema =  joi.object({
    name: joi.string().trim().required(),
    phone: joi.string().trim().pattern(new RegExp('^[0-9{10,11}$]')).required(),
    cpf: joi.string().trim().required().pattern(new RegExp('^[0-9{11}$]')).required(),
    birthday: joi.date().max(Date.now()).required()

  });

  export default customerSchema