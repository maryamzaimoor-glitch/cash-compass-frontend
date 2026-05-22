import { useState, useEffect } from 'react'
import api from '../services/api'

function Accounts() {
  const [accounts, setAccounts] = useState([])
  const [editingAccountId, setEditingAccountId] = useState(null)

  const [name, setName] = useState('')
  const [accountType, setAccountType] = useState('personal')
  const [balance, setBalance] = useState('')
  const [category, setCategory] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    getAccounts()
  }, [])

  const getAccounts = async () => {
    const response = await api.get('/accounts')
    setAccounts(response.data)
  }

  const clearForm = () => {
    setName('')
    setAccountType('personal')
    setBalance('')
    setCategory('')
    setNotes('')
    setEditingAccountId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
    !name ||
    !balance ||
    !category ||
    !notes
  ) {
    alert('Please fill in all fields')
    return
  }

    const account = {
      name,
      accountType,
      balance,
      category,
      notes
    }

    if (editingAccountId) {
      await api.put(`/accounts/${editingAccountId}`, account)
    } else {
      await api.post('/accounts', account)
    }

    getAccounts()
    clearForm()
  }

  const editAccount = (account) => {
    setName(account.name)
    setAccountType(account.accountType)
    setBalance(account.balance)
    setCategory(account.category)
    setNotes(account.notes)
    setEditingAccountId(account._id)
  }

  const deleteAccount = async (accountId) => {
    await api.delete(`/accounts/${accountId}`)
    getAccounts()
  }

  const personalAccounts = accounts.filter((account) => account.accountType === 'personal')
  const businessAccounts = accounts.filter((account) => account.accountType === 'business')

  const showAccounts = (accountList) => {
    return accountList.map((account) => (
      <div key={account._id}>
        <h3>{account.name}</h3>
        <p>Type: {account.accountType}</p>
        <p>Category: {account.category}</p>
        <p>Balance: BD {account.balance}</p>
        <p>Notes: {account.notes}</p>

        <button onClick={() => editAccount(account)}>Edit</button>
        <button onClick={() => deleteAccount(account._id)}>Delete</button>
      </div>
    ))
  }

  return (
    <main>
      <h1>Accounts</h1>

      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder='Account name' />

        <select value={accountType} onChange={(event) => setAccountType(event.target.value)}>
          <option value='personal'>Personal</option>
          <option value='business'>Business</option>
        </select>

        <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder='Category' />

        <input value={balance} onChange={(event) => setBalance(event.target.value)} placeholder='Balance' />

        <input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder='Notes' />

        <button>{editingAccountId ? 'Update Account' : 'Add Account'}</button>
      </form>

      <section>
        <h2>Personal Accounts</h2>
        {personalAccounts.length > 0 ? showAccounts(personalAccounts) : <p>No personal accounts yet.</p>}
      </section>

      <section>
        <h2>Business Accounts</h2>
        {businessAccounts.length > 0 ? showAccounts(businessAccounts) : <p>No business accounts yet.</p>}
      </section>
    </main>
  )
}

export default Accounts