module.exports.home = function (app) {
    const home = require('../models/home')
    const { db,pagination } = require('../pgp');

    app.route('/api/data')
        .get((req,res) => {
            let page = req.query.page || 1;
            let limit = pagination.pagination;
            let offset = (page - 1) * limit;
            db.task(t => {
                return t.batch([
                    home.dataMenu(),
                    home.dataHome(limit,offset),
                    home.count_dataHome()
                ])
            }).then(data => {
                res.json({
                    category: data[0],
                    dataHome : data[1],
                    count : data[2][0]
                })
            }).catch(error => { console.log(error.message) });
        })
    app.route('/api/category/:id')
        .get((req,res) => {
            let cat = req.params.id;
            let page = req.query.page || 1;
            let limit = pagination.pagination;
            let offset = (page - 1) * limit;
            db.task(t => {
                return t.batch([
                    home.dataMenu(),
                    home.category(cat,limit,offset),
                    home.count_category(cat)
                ])
            }).then(data => {
                res.status(200).json({
                    category: data[0],
                    dataCat : data[1],
                    count : data[2][0]
                })
            }).catch(error => { console.log(error.message) });
        })
    app.route('/api/detail/:id')
        .get((req,res) => {
            let detail = req.params.id;
            db.task(t => {
                return t.batch([
                    home.dataMenu(),
                    home.dataDetail(detail),
                    home.rate(detail)
                ])
            }).then(data => {
                res.json({
                    category: data[0],
                    dataDetail : data[1],
                    rate : data[2]
                })
            }).catch(error => { console.log(error.message)});
        })

    app.route('/api/sub_category/:id')
        .get((req,res) => {
            let sub_cat = req.params.id;
            let page = req.query.page || 1;
            let limit = pagination.pagination;
            let offset = (page - 1) * limit;
            db.task(t => {
                return t.batch([
                    home.dataMenu(),
                    home.sub_category(sub_cat,limit,offset),
                    home.count_sub_category(sub_cat)
                ])
            }).then(data => {
                res.json({
                    category: data[0],
                    dataSubCat : data[1],
                    count : data[2][0]
                })
            }).catch(error => { console.log(error.message) });
        })
    app.route('/api/search')
        .get((req,res) => {
            let name = req.query.name;
            let page = req.query.page || 1;
            console.log(name)
            console.log(page)
            let limit = pagination.pagination;
            let offset = (page - 1) * limit;
            db.task(t => {
                return t.batch([
                    home.dataMenu(),
                    home.searchBook(name,limit,offset),
                    home.count_searchBook(name)
                ])
            }).then(data => {
                res.json({
                    category: data[0],
                    dataSearch : data[1],
                    count : data[2][0]
                })
            }).catch(error => { console.log(error.message) });
        })

}