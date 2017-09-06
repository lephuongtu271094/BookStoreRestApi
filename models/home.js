const { db, } = require('../pgp');

class home{
    constructor(db){
        this.db = db
    }
    dataMenu(){
        return this.db.any("SELECT c.id, c.name, (array( SELECT json_build_object('name', c_c.name, 'id', c_c.id) FROM category AS c_c WHERE c_c.parent = c.id) ) AS cat_child FROM category as c WHERE parent = 0")
    }
    dataHome(limit , offset){
        return this.db.any("SELECT * FROM bookstore ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}",{
            limit:limit,
            offset:offset
        })
    }
    count_dataHome(){
        return this.db.any("SELECT count(*) FROM bookstore")
    }
    category(id,limit,offset){
        return this.db.any("SELECT *,(array( SELECT row_to_json(bookstore) " +
            "FROM bookstore WHERE bookstore.id_category = category.id " +
            "LIMIT ${limit} OFFSET ${offset} ) ) AS bookCategory " +
            "FROM category WHERE category.parent = ${id}",
            {
                id:id,
                limit:limit,
                offset:offset
            })
    }
    count_category(id){
        return this.db.any("SELECT count(*) FROM category,bookstore WHERE bookstore.id_category = category.id AND category.parent = $1",id)
    }
    dataDetail(id){
        return this.db.any("SELECT * FROM bookstore WHERE id = $1",id)
    }
    sub_category(id,limit,offset){
        return this.db.any("SELECT *,(array( SELECT row_to_json(bookstore)" +
            " FROM bookstore WHERE bookstore.id_category = category.id " +
            "${limit} OFFSET ${offset} ) ) AS bookCategory " +
            "FROM category WHERE category.id = ${id}",{
            id:id,
            limit:limit,
            offset:offset
        })
    }
    count_sub_category(id){
        return this.db.any("SELECT count(*) FROM category,bookstore WHERE bookstore.id_category = category.id AND category.id = $1",id)
    }
    searchBook(name,limit,offset){
        return this.db.any("SELECT * FROM bookstore WHERE name ILIKE $1 LIMIT $2 OFFSET $3 ",["%" + name + "%",limit,offset])
    }
    count_searchBook(name){
        return this.db.any("SELECT count(*) FROM bookstore WHERE name ILIKE $1",["%" + name + "%"])
    }
}

module.exports = new home(db)