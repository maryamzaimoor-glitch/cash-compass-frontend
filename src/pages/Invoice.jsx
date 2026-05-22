import { useEffect, useState } from 'react'
import api from '../services/api'

function Invoice() {
  const [transactions, setTransactions] = useState([])
  const [month, setMonth] = useState('')

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = async () => {
    const response = await api.get('/transactions')
    setTransactions(response.data)
  }

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date?.slice(0, 7) === month
  })

  const totalIncome = monthlyTransactions.reduce((total, transaction) => {
    if (transaction.type === 'income') {
      return total + Number(transaction.amount)
    }

    return total
  }, 0)

  const totalExpenses = monthlyTransactions.reduce((total, transaction) => {
    if (transaction.type === 'expense') {
      return total + Number(transaction.amount)
    }

    return total
  }, 0)

  return (
    <main>
      <h1>Monthly Invoice</h1>

      <input
        type='month'
        value={month}
        onChange={(event) => setMonth(event.target.value)}
      />

      <section className='invoice-box'>
        <h2>Cash Compass Invoice</h2>
        <p>Month: {month}</p>

        <h3>Summary</h3>
        <p>Total Income: BD {totalIncome}</p>
        <p>Total Expenses: BD {totalExpenses}</p>
        <p>Net Total: BD {totalIncome - totalExpenses}</p>

        <h3>Transactions</h3>

        {monthlyTransactions.map((transaction) => (
          <div key={transaction._id}>
            <p>Date: {transaction.date?.slice(0, 10)}</p>
            <p>Title: {transaction.title}</p>
            <p>Type: {transaction.type}</p>
            <p>Category: {transaction.category}</p>
            <p>Amount: BD {transaction.amount}</p>
          </div>
        ))}
      </section>

      <button onClick={() => window.print()}>
        Print Invoice
      </button>
    </main>
  )
}

export default Invoice