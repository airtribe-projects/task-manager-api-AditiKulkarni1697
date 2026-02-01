// Wrapper to catch errors from async route handlers and forward to next()
module.exports = (fn) => (req,res,next) => {
    Promise.resolve(fn(req,res,next).catch(next))
}
