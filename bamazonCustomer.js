const mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(err => {
    if (err) throw err;
    itemForSale('products');
    connection.end()
})

itemForSale = obj => {
    connection.query(`SELECT * FROM ??`, obj, (err, res) => {
        if (err) throw err;
        console.log("\nPlease see list of our produt\n")
        console.table(res);
    })
}

