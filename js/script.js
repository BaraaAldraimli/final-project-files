// login

const loginForm =
    document.getElementById("login-form");


function validateUsername(username){

    if(username.trim() === ""){

        return "Username is required";

    }

    if(username !== "admin"){

        return "Incorrect username, username is admin";

    }

    return "";

}

function validatePassword(password){

    if(password.trim() === ""){

        return "Password is required";

    }

    if(password.length < 8){

        return "Password must be at least 8 characters";

    }

    if(!/[A-Z]/.test(password)){

        return "Password must contain a capital letter";

    }

    if(!/[0-9]/.test(password)){

        return "Password must contain a number";

    }

    if(password !== "Admin123"){

        return "Incorrect password, passsword is Admin123";

    }

    return "";

}

function showResult(elementId, message){

    const element =
        document.getElementById(elementId);

    if(message === ""){

        element.textContent = "✔ Valid";

        element.className = "success";

    }

    else{

        element.textContent = "✖ " + message;

        element.className = "error";

    }

}


function validateAll(){

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;



    const usernameErr =
        validateUsername(username);

    const passwordErr =
        validatePassword(password);



    showResult(
        "usernameError",
        usernameErr
    );

    showResult(
        "passwordError",
        passwordErr
    );

    if(usernameErr === "" &&
       passwordErr === ""){

        alert("Login Successful!");

        window.location.href = "home.html";

    }

}


if(loginForm){
loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    validateAll();

});
}

// CART 

let cart = JSON.parse(localStorage.getItem("cart")) || [];
	
document.getElementById("cart-count").textContent =
cart.length;

function showNotification(message){

    const notification = document.getElementById("notification");


    notification.textContent =
    message;


    notification.classList.add("show");


    setTimeout(function(){

        notification.classList.remove("show");

    }, 2000);

}

// add to cart
const buttons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");

buttons.forEach(function(button){

    button.addEventListener("click", function(){
		

        const card = button.closest(".card")
		
		let productImage;
		let productName;
		let productPrice;
		

		if(card){
			productImage = card.querySelector("img").src;
			productName = card.querySelector("h3").textContent;
			productPrice = card.querySelector("p").textContent;
		} else {
			productImage = document.querySelector(".watch-image img").src;
			productName = document.querySelector(".name").textContent;
			productPrice = document.querySelector(".price").textContent;
		}

       
        const price = parseInt(productPrice);
		
        
        const product = {

            name: productName,

            price: price,
			
			image: productImage
			

        };


        
        cart.push(product);


        
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

		
		cartCount.textContent =
		cart.length;
		
		showNotification("Item added to cart!");

    });

});


// DISPLAY CART ITEMS

const cartItems =
document.getElementById("cart-items");


const totalPrice =
document.getElementById("total-price");



if(cartItems){
	
	if(cart.length === 0){
		cartItems.innerHTML = "<p>Your cart is empty!</p>"
		totalPrice.textContent = "Total: 0 SAR";
	} else{

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(product, index){


        const item =
        document.createElement("div");


        item.classList.add("cart-item");

        item.innerHTML = `
		
			
			<img src="${product.image}" class="cart-image">
		
            <h3>${product.name}</h3>

            <p>${product.price} SAR</p>
			
			<button class="remove-button">Remove</button>

        `;

        cartItems.appendChild(item);


        total += product.price;
		
		const removeButton = item.querySelector(".remove-button");
       
        removeButton.addEventListener("click", function(){

            cart.splice(index, 1);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

                location.reload();

            });

    });

    totalPrice.textContent =
    `Total: ${total} SAR`;
	}
}

// purchase

const purchaseButton = document.getElementById("purchase-button");

if(purchaseButton){

    purchaseButton.addEventListener("click", function(){


        if(cart.length === 0){

            alert("Your cart is empty!");

        }

        else{

            alert("Purchase successful!");


            localStorage.removeItem("cart");


            location.reload();

        }

    });

}

// logout
const logoutButton = document.getElementById("logout-button");

if(logoutButton){
    logoutButton.addEventListener("click", function(){
        window.location.href = "login.html";
    });
}