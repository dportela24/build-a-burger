# Build-a-Burger

<p align="center">
  <img src="https://i.imgur.com/mPQYYB9.png" width=66%>
</p>

## Project Summary

Built-a-burger implements the front-end of a fictionary burger delivery food service. With it, the client choose up to 10 ingredients to "build" its burger and have it delivered to its door.

The web application is hosted [here](https://build-a-burger24.herokuapp.com/), using Heroku cloud plataform.

## Built with

The entire project was implemented using the **React** framework tool, in combination with **Redux** to manage the application state. The back end is "automagically" implemented using Google's **Firebase**.

## Usage

The webapp is composed by 4 distict views, Log In, Burger Builder, Checkout and Orders.

### Log In

<img src="https://i.imgur.com/SvJobPX.png" width=33% align="right">

In the log in view, the user is able create a new account or log in into an existing one. 

Although the user can use the Burger Builder viee to construct a burger without being logged in, it will not be able to place an order for that burger.

<br/>
<br/>
<br/>
<br/>
<br/>

### Burger Builder

<img src="https://i.imgur.com/OL1JSAW.png" width=33% align="right">

In the burger builder view, the user is able to construct its desired burger by choosing up to 10 ingredients. 

Both the burger and the price are updated accordingly to the ingredients chose by the user.

Pressing the Clear button will reset the burger, while pressing the Order one will present an order summary to proceed to checkout.

<br/>

### Checkout

<img src="https://i.imgur.com/g8ZiPw4.png" width=33% align="right">

In the checkout view, the user is presented with an order summary on the left, where is displayed the list of ingredients, the quantity of each one, the price and the representation of the burger.

On the right is a form to be filled by the user with the details regarding the delivery.

<br/>
<br/>

### Orders

<img src="https://i.imgur.com/jvj79Qg.png" width=33% align="right">

Finally, in the orders view the user is presented with list containg the history of its orders

Each entry contains the ingredients used and their quantities, as well as the price and burger representation.
