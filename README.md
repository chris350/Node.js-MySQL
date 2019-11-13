# Bamazon
This projects simulates online shopping using command line interface.

## Overview
This application comes with three distinct "Views" -(A) Customer (B) Manager and (C) Supervisor. The Customer can order items from Bamazon, the Manager can restock items and add new items for sale, and the Supervisor can check each department's profits and add new departments.

## Technologies Used:
* NodeJS
* NPM packages used - inquirer,mysql
* MYSQL

### (A) Customer View
---
To check Customer view execute command `node bamazonCustomer.js` from the applications root directory.

This will display all items that are avilable for purchase, and then prompt the user to choose an item and state how many of that item they intend to purchase.If there is enough of that item in stock, the purchase will go through.
![](./screenshots/bamazonCustomer.PNG)

### (B) Manager View 
---
To check Manager view execute command `node bamazonManager.js` from the applications root directory.

A manager can perform following operations:
![](./screenshots/bamazon.PNG)

