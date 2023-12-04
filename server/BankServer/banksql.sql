create database bankdb;
use  bankdb;

-- Users Table 
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Pass VARCHAR(255) NOT NULL, 
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Address VARCHAR(255),
    UserType ENUM('Admin', 'Customer') NOT NULL DEFAULT 'Customer'
);
select * from Users;
UPDATE Users 
SET Pass='naveen123'
WHERE UserID=1;


insert into Users(Username,Pass,Email,Phone,Address,UserType)
values('jack','Naveen1234','xyz@gmail.com','14785263665','123dfgdsvsdfwfsv','Customer');
select * from Users;

ALTER TABLE Users CHANGE COLUMN Password Pass VARCHAR(255) NOT NULL;

desc Users;
insert into Users(Username,Pass,Email,Phone,Address)
values('naveen','Naveen@2628','naveenchowdary401@gmail.com','9174989576','300 cyberonics Bay area blvd');
select UserID,Username,Email,Phone,Address from Users;

-- Accounts Table 
CREATE TABLE Accounts (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    AccountType ENUM('Savings', 'Checking') NOT NULL,
    Balance DECIMAL(15, 2) NOT NULL,
    DateOpened DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE SET NULL
);

ALTER TABLE Accounts
ADD UNIQUE (UserID);

select * from Accounts;
INSERT INTO Accounts (UserID,AccountType,Balance, DateOpened) 
values(1,'Savings',10000.23,'2023-11-18');

update Accounts 
SET  Balance=40000
where UserId=1;

 select * from Accounts
 where UserID=1;
 
 -- delete for Accounts 
 delete from Accounts where AccountID=4;
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

select * from Transactions;
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
DESC Loans;
ALTER TABLE Loans
CHANGE COLUMN Status LoanStatus VARCHAR(50) DEFAULT 'Active';
ALTER TABLE Loans
MODIFY COLUMN InterestRate DECIMAL(5, 2) DEFAULT 12;
ALTER TABLE Loans
ADD  LoanType varchar(30);
select * from Loans;
insert into Loans(UserID,Amount, InterestRate, StartDate, DueDate)
values(1,20000,12,'2023-12-3','2024-12-3');

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
delete from FixedDeposits
where DepositID between 2 and 9;
insert into FixedDeposits (UserID,Amount,StartDate,MaturityDate)
values (1,500,'2023-11-30','2024-01-04');

select * from FixedDeposits;

ALTER TABLE FixedDeposits
MODIFY COLUMN InterestRate DECIMAL(5, 2) NOT NULL DEFAULT '8.00';

describe FixedDeposits;

-- Audit_Logs Table
CREATE TABLE Audit_Logs (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Activity TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE SET NULL
);


-- Finantial Goals
USE bankdb;

CREATE TABLE FinancialGoals (
    GoalID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    DepositAmount DECIMAL(15, 2) NOT NULL,
    DestinationDate DATE NOT NULL,
    MonthlyContribution DECIMAL(15, 2) NOT NULL,
    Purpose VARCHAR(255),
    CurrentSavings DECIMAL(15, 2) NOT NULL,
    IncomeSource VARCHAR(100),
    RegularExpenses DECIMAL(15, 2) NOT NULL,
    GoalPriority varchar(5),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE SET NULL
);
select * from FinancialGoals;
UPDATE FinancialGoals
SET DepositAmount = DepositAmount + 100
WHERE UserId = 1 AND Purpose = 'buy a car';
DELETE FROM FinancialGoals WHERE DepositAmount=0.00 ;


drop table FinancialGoals;
insert into  FinancialGoals (UserID,DepositAmount,DestinationDate,MonthlyContribution,Purpose,CurrentSavings,IncomeSource, RegularExpenses, GoalPriority )
values(1,200,'2024-3-13',300,'buy a car',10000,'developer',50,'High');

-- inner join for the Users and Accounts
select  Users.Username , Accounts.AccountID
from Users
Inner JOIN Accounts
on Users.Username="mounika" and Accounts.AccountID=3 and Users.UserID= Accounts.UserID;
