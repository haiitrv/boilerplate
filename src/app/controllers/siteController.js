class SiteController {

    async index(req, res, next) {
        res.render('site')
    }
}

module.exports = new SiteController