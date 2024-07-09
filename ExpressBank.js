class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class TreeNode {
    constructor(account) {
        this.data = account;
        this.left = null;
        this.right = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(treeNode) {
        if (!this.head) {
            this.head = treeNode;
        } else {
            let current = this.head;
            let prev = null;

            // Find the position to insert in sorted order
            while (current && treeNode.data.accountNumber > current.data.accountNumber) {
                prev = current;
                current = current.right;
            }

            // Insert treeNode between prev and current
            if (!prev) {
                // Insert at the beginning
                treeNode.right = this.head;
                this.head = treeNode;
            } else {
                prev.right = treeNode;
                treeNode.right = current;
            }
        }
    }

    find(accountNumber) {
        let current = this.head;
        while (current) {
            if (current.data && current.data.accountNumber === accountNumber) {
                return current.data;
            }
            current = current.right;
        }
        return null; // Account not found
    }
}
class Bank {
    constructor() {
        this.accounts = new LinkedList(); // Initialize LinkedList to store accounts
    }

    addAccount(accountNumber, balance) {
        if (this.accounts.find(accountNumber)) {
            console.log(`Account with account number ${accountNumber} already exists.`);
            return;
        }

        const newAccount = {
            accountNumber: accountNumber,
            balance: balance
        };

        const newTreeNode = new TreeNode(newAccount);
        this.accounts.insert(newTreeNode);
        console.log(`Account ${accountNumber} created successfully.`);
    }

    transfer(fromAccountNumber, toAccountNumber, amount) {
        const fromAccount = this.accounts.find(fromAccountNumber);
        const toAccount = this.accounts.find(toAccountNumber);

        if (!fromAccount) {
            console.log(`Account with account number ${fromAccountNumber} not found.`);
            return;
        }

        if (!toAccount) {
            console.log(`Account with account number ${toAccountNumber} not found.`);
            return;
        }

        if (fromAccount.balance < amount) {
            console.log(`Insufficient balance in account ${fromAccountNumber} to transfer.`);
            return;
        }

        fromAccount.balance -= amount;
        toAccount.balance += amount;
        console.log(`Transfer of ${amount} from account ${fromAccountNumber} to account ${toAccountNumber} successful.`);
    }

    checkBalance(accountNumber) {
        const account = this.accounts.find(accountNumber);

        if (!account) {
            console.log(`Account with account number ${accountNumber} not found.`);
            return;
        }

        console.log(`Balance of account ${accountNumber}: ${account.balance}`);
    }
}

const bank = new Bank();

bank.addAccount(123456, 1000);
bank.addAccount(789012, 500);

bank.transfer(123456, 789012, 300);
bank.checkBalance(123456);
bank.checkBalance(789012);

bank.transfer(123456, 789012, 800);
