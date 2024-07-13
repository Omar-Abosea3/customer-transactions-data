import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import TransactionGraph from '../TransactionGraph/TransActionGraph';


const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ name: '', amount: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:5000/transactions')
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: name === 'name' ? value.toLowerCase() : value,
    }));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const customer = customers.find((customer) => parseInt(customer.id) === parseInt(transaction.customer_id));
      const nameMatch = filter.name ? customer?.name.toLowerCase().includes(filter.name) : true;
      const amountMatch = filter.amount ? String(transaction.amount).includes(String(filter.amount)) : true;
      return nameMatch && amountMatch;
    });
  }, [filter, transactions, customers]);

  return (
    <>
      <div className='p-5'>
        <div className='row mb-4'>
          <div className='col-6'>
            <input
              type="text"
              name="name"
              placeholder="Filter by customer name"
              value={filter.name}
              onChange={handleFilterChange}
              className='form-control'
            />
          </div>
          <div className='col-6'>
            <input
              type="number"
              name="amount"
              placeholder="Filter by transaction amount"
              value={filter.amount}
              onChange={handleFilterChange}
              className='form-control'
            />
          </div>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Transaction Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => {
              const customer = customers.find(
                (customer) => parseInt(customer.id) === parseInt(transaction.customer_id)
              );
              return (
                <tr key={transaction.id}>
                  <td>{customer ? customer.name : 'Unknown'}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredTransactions.length > 0 && <TransactionGraph transactions={filteredTransactions} />}
      </div>
    </>
  );
};

export default CustomerTable;
