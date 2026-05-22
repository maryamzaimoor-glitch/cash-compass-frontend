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
  const [date, setDate] = useState('')

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
    setDate('')
    setEditingTransactionId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (
    !title ||
    !amount ||
    !category ||
    !date
  ) {
    alert('Please fill in all fields')
    return
  }
    const transaction = {
      title,
      amount,
      type,
      accountType,
      category,
      date
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
    setDate(transaction.date?.slice(0, 10))
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

      <input type='date' value={date} onChange={(event) => setDate(event.target.value)} />

      <button>{editingTransactionId ? 'Update' : 'Add'}</button>
    </form>

    <div className='transactions-row'>
      <section>
        <h2>Personal Transactions</h2>

        {transactions
          .filter((transaction) => transaction.accountType === 'personal')
          .map((transaction) => (
            <div key={transaction._id}>
              <h3>{transaction.title}</h3>
              <p>BD {transaction.amount}</p>
              <p>{transaction.type}</p>
              <p>{transaction.category}</p>
              <p>{transaction.date?.slice(0, 10)}</p>

              <button onClick={() => editTransaction(transaction)}>Edit</button>
              <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
            </div>
          ))}
      </section>

      <section>
        <h2>Business Transactions</h2>

        {transactions
          .filter((transaction) => transaction.accountType === 'business')
          .map((transaction) => (
            <div key={transaction._id}>
              <h3>{transaction.title}</h3>
              <p>BD {transaction.amount}</p>
              <p>{transaction.type}</p>
              <p>{transaction.category}</p>
              <p>{transaction.date?.slice(0, 10)}</p>

              <button onClick={() => editTransaction(transaction)}>Edit</button>
              <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
            </div>
          ))}
      </section>
    </div>
  </main>
)
}

export default Transactions