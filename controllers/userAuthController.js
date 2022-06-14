const User = require('../models/user');

module.exports.registerForm = (req,res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res, next) => {
    try {
        //deconstruct
        const { username, email, password } = req.body;
        //creating new user instances
        const user = new User({ email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
             //password will be hashed and salt will be stored
            req.flash('success','Account is registered! Welcome to ƒøress camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginForm = (req, res) => {
    res.render('users/login');
}

module.exports.redirectLogin = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "You have been logged out!");
    res.redirect('/campgrounds');
}

//passport 0.6.0 requires callback for logout
//router.get('/logout', function(req, res, next) {
//    req.logout(function(err) {
 //       if(err) {
//           return next(err);
//        }
//        req.flash('success', 'You have been logged out.');
//        res.redirect('/campgrounds');
//    })
//})