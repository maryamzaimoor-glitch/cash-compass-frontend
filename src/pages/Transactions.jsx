import { useState, useEffect } from 'react'
import api from '../services/api'

function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [editingTransactionId, setEditingTransactionId] = useState(null)

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [accountType, setAccountType] = useState('personal')
  const [category, setCategory] = useState('')

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = async () => {
    const response = await api.get('/transactions')
    setTransactions(response.data)
  }

  const clearForm = () => {
    setTitle('')
    setAmount('')
    setType('expense')
    setAccountType('personal')
    setCategory('')
    setEditingTransactionId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const transaction = {
      title,
      amount,
      type,
      accountType,
      category
    }

    if (editingTransactionId) {
      await api.put(`/transactions/${editingTransactionId}`, transaction)
    } else {
      await api.post('/transactions', transaction)
    }

    getTransactions()
    clearForm()
  }

  const editTransaction = (transaction) => {
    setTitle(transaction.title)
    setAmount(transaction.amount)
    setType(transaction.type)
    setAccountType(transaction.accountType)
    setCategory(transaction.category)
    setEditingTransactionId(transaction._id)
  }

  const deleteTransaction = async (transactionId) => {
    await api.delete(`/transactions/${transactionId}`)
    getTransactions()
  }

  return (
    <main>
      <h1>Transactions</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Title' />

        <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder='Amount' />

        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value='expense'>Expense</option>
          <option value='income'>Income</option>
        </select>

        <select value={accountType} onChange={(event) => setAccountType(event.target.value)}>
          <option value='personal'>Personal</option>
          <option value='business'>Business</option>
        </select>

        <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder='Category' />

        <button>{editingTransactionId ? 'Update' : 'Add'}</button>
      </form>

      {transactions.map((transaction) => (
        <div key={transaction._id}>
          <h3>{transaction.title}</h3>
          <p>BD {transaction.amount}</p>
          <p>{transaction.type}</p>
          <p>{transaction.accountType}</p>
          <p>{transaction.category}</p>

          <button onClick={() => editTransaction(transaction)}>Edit</button>
          <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
        </div>
      ))}
    </main>
  )
}

export default Transactions