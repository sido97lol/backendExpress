# Exercise: User Authentication and Product Marketplace

## Description

You will build a simple web application using **MongoDB, Express.js, HTML, CSS, and JavaScript**. The application will have authentication (username & password), a dashboard, and a marketplace where users can add, edit, and delete products. Each product is associated with a user and category, and the marketplace displays products along with the seller's name, and can pick a category to filter. Users will also be able to manage orders, update order statuses.

## Objectives

1. **User Authentication**
   - Users must sign up with a username and password.
   - Users must log in with their credentials.
   - After login, users are redirected to their dashboard.

2. **Dashboard**
   - Users can **add, edit, and delete** their products.
   - Users can see their **orders** and update their status.
   
3. **Marketplace Page**
   - Displays all products along with the seller's name, and category.
   - Clicking on a product opens a details page with a form to place an order.
   - The order form includes a dropdown to select an Algerian **wilaya**.

4. **Orders Management**
   - Users can see **orders** made for their products.
   - Users can update the status of an order (e.g., **Pending, Shipped, Completed**).
   
---

## Database Schema (MongoDB)

### Users Collection
```json
{
    "_id": ObjectId,
    "username": "string",
    "password": "string" // Store as hashed password
}
```

### Products Collection
```json
{
    "_id": ObjectId,
    "name": "string",
    "description": "string",
    "price": "number",
    "image": "string", // URL 
    "category_id":ObjectId,  // Reference to Category Collection (category)
    "userId": ObjectId // Reference to Users Collection
}
```
### Orders Collection
```json
{
    "_id": ObjectId,
    "productId": ObjectId, // Reference to Products Collection
    "userId": ObjectId, // Reference to Users Collection (buyer)
    "sellerId": ObjectId, // Reference to Users Collection (seller)
    "wilaya": "string", // Selected wilaya from dropdown
    "status": "string", // e.g., "Pending", "Shipped", "Completed"
}
```
### Category Collection
```json
{
    "_id": ObjectId,
    "name": "string", //e.g., "Homemade", "Electronics", "Fashion"
}
---
```
## Features Breakdown

### 1. Authentication
- Users sign up with a **username** and **password**.
- Users log in using their credentials.
- After login, they are redirected to their **dashboard**.

### 2. Dashboard (Authenticated Users)
- Users can:
  - **Add, Edit, Delete** their products.
  - See a list of **orders** they have received.
  - Update order statuses (Pending → Shipped → Completed).

### 3. Marketplace Page
- Displays all products with a filter on the page with which category User chooses.
- Each product card shows:
  - Product name, price, seller’s name, and category.
  - Clicking a product opens the details page with an order form.

### 4. Order Form (Product Details Page)
- Fields:
  - **Full Name**
  - **Phone Number**
  - **Wilaya** (Dropdown with all Algerian wilayas)
- Submitting creates an order for the selected product.

### 5. Order Management (For Sellers)
- Users can see all orders made for their products.
- They can change the order status (Pending → Shipped → Completed).

---

## Steps to Implement

1. **Setup MongoDB & Express.js**
   - Create collections: `users`, `products`, `orders`.
   - Implement routes for authentication, products, and orders.

2. **User Authentication (JWT)**
   - Implement sign-up and login using username and password.
   - Redirect authenticated users to their dashboard.

3. **Dashboard**
   - Add product CRUD functionality.
   - Display user’s orders and allow status updates.

4. **Marketplace Page**
   - Fetch and display all products with seller info.
   - Link to product details page with order form.

5. **Orders System**
   - Implement order creation from the product details page.
   - Store orders with the selected wilaya.
   - Allow sellers to update order statuses.

6. **Frontend (HTML, CSS, JavaScript)**
   - Basic **landing page** with login/signup.
   - **Dashboard** for managing products and orders.
   - **Marketplace** to browse and order products.

---


