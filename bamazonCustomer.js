var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host:"127.0.0.1",
	port:3306,
	user:"root",
	password:"root",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
        console.log(displayTable.toString());
		purchasePrompt();
	});
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter Item ID you like to purhcase.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many items do you wish to purchase?",
		filter:Number
	},

 ]).then(function(answers){
 	var quantityNeeded = answers.Quantity;
 	var IDrequested = answers.ID;
 	purchaseOrder(IDrequested, quantityNeeded);
 });
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
			console.log("Good news your order is in stock!");
            console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " Thank you!");
            var my_stock = res[0].stock_quantity - amtNeeded
            var update_query= "UPDATE products SET stock_quantity = "+my_stock +" WHERE item_id = " + ID;
            // console.log("UPDATE_QUERY=",update_query);
			connection.query(update_query,function(err,res){
                if(err){console.log(err)};
            });
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
		};
		displayProducts();
    });
    // var table = new Table({
    //     head: ['Product ID', 'Product Description', 'Cost'],
    //     colWidths: [12, 50, 8],
    //     colAligns: ["middle", "left", "right"],
    //     style: {
    //         head: ["aqua"],
    //         compact: true
    //     }
    // });
    // for (var i = 0; i < res.length; i++) {
    //     table.push ([res[i].id, res[i].products.name, res[i].price]);
    // }
    // console.log(table.toString());
    // console.log("");
};

displayProducts(); 