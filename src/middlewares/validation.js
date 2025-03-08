
const validation=(schema)=>{
    return async (req, res, next)=>{
    
    //generalize the input of the validation function to be the request body or the request params.
    let filter={};
    if(req.file){
        filter={image:req.file,...req.body,...req.params,...req.query};
        //console.log({file:true,fields:filter})
    }
    else if(req.files){
        filter={...req.files,...req.body,...req.params,...req.query};
        //console.log({file:true,fields:filter})
    }
    else{
        filter={...req.body,...req.params,...req.query};
        //console.log({file:true,fields:filter})
    }
    const {error} = await schema.validate(filter, { abortEarly: false });

    if (error) {
        // console.log(error.details);
        res.status(400).json({ message: error.details.map((err) => err.message) });
    } else {
        next();
    }
}  
};
export default validation; 