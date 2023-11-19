create database bankdb;
use  bankdb;

-- Users Table 
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL, -- Store hashed password
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Address VARCHAR(255),
    UserType ENUM('Admin', 'Customer') NOT NULL DEFAULT 'Customer'
);



-- Accounts Table 
CREATE TABLE Accounts (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    AccountType ENUM('Savings', 'Checking') NOT NULL,
    Balance DECIMAL(15, 2) NOT NULL,
    DateOpened DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE SET NULL
);

-- Transactions Table 
CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    AccountID INT,
    Type ENUM('Deposit', 'Withdrawal', 'Loan', 'Payment') NOT NULL,
    Amount DECIMAL(15, 2) NOT NULL,
    TransactionDate DATETIME NOT NULL,
    Description TEXT,
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID) ON DELETE SET NULL
);

-- Loans Table
CREATE TABLE Loans (
    LoanID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Amount DECIMAL(15, 2) NOT NULL,
    InterestRate DECIMAL(5, 2) NOT NULL,
    StartDate DATE NOT NULL,
    DueDate DATE NOT NULL,
    Status ENUM('Active', 'Paid') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE SET NULL
);

-- Fixed Deposits Table
CREATE TABLE FixedDeposits (
    DepositID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Amount DECIMAL(15, 2) NOT NULL,
    InterestRate DECIMAL(5, 2) NOT NULL,
    StartDate DATE NOT NULL,
    MaturityDate DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE SET NULL
);

-- Audit_Logs Table
CREATE TABLE Audit_Logs (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Activity TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE SET NULL
);






