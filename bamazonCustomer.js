const mysql = require("mysql")
const inquirer = require("inquirer")

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
    // CheckIfAvailable('products');

})

itemForSale = obj => {
    connection.query(`SELECT item_id, product_name, price FROM ??`, obj, (err, res) => {
        if (err) throw err;
        console.log("\nPlease see list of our products\n")
        // console.table(res);
        console.table(res)
        askForProductId();

    })
}
let table = 'products'
let pickedItem;
let quantityPicked;
const askForProductId = () => {
    inquirer
        .prompt({
            type: "input",
            message: "Welcome again! Please enter the product's id number",
            name: "input"
        }).then(res => {
            pickedItem = res.input
            askForQuantity();
            // console.log(res.input)
        })
}

const askForQuantity = () => {
    inquirer
        .prompt({
            type: "input2",
            message: "Good pick! How many item you would like?",
            name: "input2"
        }).then(res => {
            quantityPicked = res.input2
            console.table("Your Total would be: $" + quantityPicked * pickedItem);
            CheckIfAvailable();
        })
}



CheckIfAvailable = products => {
    connection.query(`SELECT * FROM ${table} WHERE item_id = ${pickedItem}`, products, (err, res) => {
        if (err) throw err;

        // console.table(res);
        console.table(res)
        // askForProductId();
        // connection.end()

    })
}

