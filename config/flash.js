module.exports.setFlash  = (req,res,next) =>{
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error'),
        'delete' : req.flash('delete'),
        'update' : req.flash('update'),
    }
    next();
}