# REACT PHP TEST

This is a PHP-based market system that allows for the registration of products, types of products, tax percentages, and the sale of products. The system provides features to calculate the price and tax for each item, display the total purchase amount, and save the sales transaction. It uses either PostgreSQL or MSSQL Server as the database backend.

## Requirements

- PHP 7.4 or higher
- PostgreSQL or MSSQL Server

## Installation

1. Clone the repository:

```
git clone https://github.com/mugishap/react-php-test.git
```


2. Set up the database:
- Create a new database in your PostgreSQL or MSSQL Server.
- Import the provided database backup file located at the root of the repository.

3. Configuration:
- Copy the `config/config.example.php` file and rename it to `config/config.php`.
- Update the database connection details in `config/config.php` with your database credentials.

4. a) Start the PHP server:
- Navigate to the project's backend root directory.
- Run the following command to start the PHP server:

```
php -S localhost:8080
```

4. b) Start the React Frontend server:
- Navigate to the project's frontend root directory.
- Run the following command to start the PHP server:

```
npm run dev
```


5. Access the application:
- Open your web browser and visit `http://localhost:5173` to access the market system.

## Additional Notes

- The project utilizes frontend libraries like Bootstrap and Material Design to enhance the user interface.
- The use of frontend frameworks such as React, Angular, or Vue is optional.
- If you have any issues with the PHP server or need to perform additional tasks, please refer to the PHP documentation or seek further assistance.

## Code Quality and Design Patterns

This project aims to showcase your technical knowledge and skills beyond the initial objectives. You are encouraged to demonstrate your proficiency in design patterns, unit testing, and any other best practices you deem necessary. Feel free to structure and organize the code according to your preferred coding standards and principles.

## Submission

Please submit the following for analysis:

- GitHub repository with public access containing the project code.
- A README file with initialization instructions.
- The database backup file located at the root of the repository.
- (Optional) If you have deployed the project to a server, provide the URL for further review.

## Additional Tips

- To export the database, you can use the `pg_dump` command for PostgreSQL.
- Before submitting, perform a `pg_restore` to verify if the database was exported correctly.

Thank you for taking up this challenge! We look forward to reviewing your project and assessing your technical skills.

