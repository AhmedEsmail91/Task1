export const globalError=(err,req, res,next) => {
    let mode=process.env.MODE
    err.statusCode = err.statusCode || 500;
    if (mode==="prod") {
        res.status(err.statusCode).json({ error: err.message});
    }
    else {
        if (err.message.includes(",")) {
            const err_arr=[];
            err.message.split(',').forEach(error => {
                err_arr.push({error});
            });
            err.message=err_arr;
        }
        res.status(err.statusCode).json({ error: err.message, stack: err.stack });
    }
  }; 