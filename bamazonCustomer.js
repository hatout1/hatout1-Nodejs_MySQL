const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(err => {
    if (err) throw err;
    recall();
})

let recall = () => {
    itemForSale('products');
}

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

let askForProductId = () => {
    inquirer
        .prompt({
            type: "input",
            message: "Please enter the product's id number\n",
            name: "input"
        }).then(res => {
            pickedItem = res.input
            askForQuantity();
            // console.log(res.input)
        })
}

let askForQuantity = () => {
    inquirer
        .prompt({
            type: "input2",
            message: chalk.yellow("Good pick! How many item you would like?\n"),
            name: "input2"
        }).then(res => {
            quantityPicked = res.input2
            CheckIfAvailable();
        })
}

let availableSelectedQuantity;
let itemSelectedPrice;

CheckIfAvailable = products => {
    connection.query(`SELECT stock_quantity, price FROM ${table} WHERE item_id = ${pickedItem}`, products, (err, res) => {
        if (err) throw err;
        if (quantityPicked <= res[0].stock_quantity) {
            itemSelectedPrice = res[0].price;
            availableSelectedQuantity = res[0].stock_quantity;
            fulfillIfAvailable()
        } else {
            console.log(chalk.red("\nInsufficient quantity!\n"));
            askForService()
        }
    })
}

fulfillIfAvailable = fulfill => {
    connection.query(`UPDATE ${table} SET stock_quantity = (${availableSelectedQuantity}- ${quantityPicked}) WHERE item_id = ${pickedItem}`, fulfill, (err, res) => {
        if (err) throw err;
        console.table(chalk.blue("\nYour Total would be: \n \n") + chalk.yellow(quantityPicked + " * $" + itemSelectedPrice + " = $" + (quantityPicked * itemSelectedPrice).toFixed(2)) + "\n");
        askForService();
    })
}

const askForService = () => {
    inquirer
        .prompt({
            type: "list",
            message: "Let's look for another item\n",
            choices: ["Go for it!", "NO thank you, just exit"],
            name: "choice"
        }).then(res => {
            if (res.choice === "NO thank you, just exit") {
                console.log("\n**** Thank you for shopping with us, see you soon ****");
                connection.end();
            } else {
                recall();
            }
        })
}