# BiteBuzz

BiteBuzz is a fresh and innovative full-stack web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It is designed to streamline the canteen ordering process, providing users with a seamless experience for browsing menus, placing orders, and tracking their order history.

## Table of Contents

- Features
- Installation
- Usage

## Features

- **User Authentication**: Secure login and registration for users.
- **Menu Browsing**: View canteen menus with detailed descriptions, prices, and ratings.
- **Order Management**: Add items to the cart, place orders, and view current and past orders.
- **Dark Mode**: Toggle between light and dark modes for a comfortable user experience.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/BiteBuzz.git
    cd BiteBuzz
    ```

2. **Install server dependencies**:

    ```bash
    cd backend
    npm install
    ```

3. **Install client dependencies**:

    ```bash
    cd ../frontend
    npm install
    ```

4. **Set up environment variables**:

    Create a `.env` file in the `backend` directory and add the following:

    ```
    MONGO_URI=your_mongodb_connection_string
    ```

5. **Run the development servers**:

    ```bash
    # In the frontend
    npm run dev

    # In the backend
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Usage

### User Registration and Login

- Users can register by providing their name, email, phone number, and password to the college admin.
- After registration, users can log in using their USN and password.

### Browsing Menus

- Users can browse the menus of various canteens.
- Each menu item displays a description, price, preparation time, and rating.

### Placing Orders

- Users can add items to their cart from different canteens.
- The cart displays the total price and allows users to adjust item quantities.
- Orders can be placed, and users will be able to track order updates in currentOrders block.

### Order History

- Users can view their past orders, including details of each order and its status.

### Dark Mode

- Users can toggle between light and dark modes for a better viewing experience.

We hope you enjoy using BiteBuzz and find it as exciting and innovative as we do! If you have any questions or need further assistance, please feel free to reach out.
