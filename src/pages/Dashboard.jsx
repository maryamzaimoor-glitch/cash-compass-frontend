import { useEffect, useState } from 'react'
import api from '../services/api'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

function Dashboard({ user }) {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])

useEffect(() => {
  getDashboardData()
}, [])

const getDashboardData = async () => {
  try {
    const accountsResponse = await api.get('/accounts')
    const transactionsResponse = await api.get('/transactions')

    setAccounts(accountsResponse.data)
    setTransactions(transactionsResponse.data)
  } catch (err) {
    console.log(err)
  }
}

  const personalAccounts = accounts.filter((account) => account.accountType === 'personal')
  const businessAccounts = accounts.filter((account) => account.accountType === 'business')

  const getBalance = (accountList) => {
    return accountList.reduce((total, account) => {
      return total + Number(account.balance)
    }, 0)
  }

  const getIncome = (type) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.accountType === type && transaction.type === 'income') {
        return total + Number(transaction.amount)
      }

      return total
    }, 0)
  }

  const getExpenses = (type) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.accountType === type && transaction.type === 'expense') {
        return total + Number(transaction.amount)
      }

      return total
    }, 0)
  }

  const personalBalance = getBalance(personalAccounts)
  const businessBalance = getBalance(businessAccounts)

  const personalIncome = getIncome('personal')
  const businessIncome = getIncome('business')

  const personalExpenses = getExpenses('personal')
  const businessExpenses = getExpenses('business')

  const totalBalance = personalBalance + businessBalance
  const totalIncome = personalIncome + businessIncome
  const totalExpenses = personalExpenses + businessExpenses

  const personalChart = [
    {
      name: 'Personal',
      income: personalIncome,
      expenses: personalExpenses
    }
  ]

  const businessChart = [
    {
      name: 'Business',
      income: businessIncome,
      expenses: businessExpenses
    }
  ]

  const combinedChart = [
    {
      name: 'Combined',
      income: totalIncome,
      expenses: totalExpenses
    }
  ]

  const personalSpending = transactions
    .filter((transaction) => transaction.accountType === 'personal' && transaction.type === 'expense')
    .map((transaction) => {
      return {
        name: transaction.category,
        value: Number(transaction.amount)
      }
    })

  const businessSpending = transactions
    .filter((transaction) => transaction.accountType === 'business' && transaction.type === 'expense')
    .map((transaction) => {
      return {
        name: transaction.category,
        value: Number(transaction.amount)
      }
    })

  return (
    <main>
      <h1>Welcome {user?.username}</h1>

      <h2>Cash Compass Dashboard</h2>
      <p>Here is a quick look at your money.</p>

      <section>
        <h2>Personal Overview</h2>

        <p>Balance: BD {personalBalance}</p>
        <p>Income: BD {personalIncome}</p>
        <p>Expenses: BD {personalExpenses}</p>

        <BarChart width={350} height={250} data={personalChart}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='income' />
          <Bar dataKey='expenses' />
        </BarChart>

        <h3>Personal Spending Categories</h3>

        {personalSpending.length > 0 ? (
          <PieChart width={300} height={250}>
            <Pie
              data={personalSpending}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              label
            >
              {personalSpending.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p>No personal expenses yet.</p>
        )}
      </section>

      <section>
        <h2>Business Overview</h2>

        <p>Balance: BD {businessBalance}</p>
        <p>Income: BD {businessIncome}</p>
        <p>Expenses: BD {businessExpenses}</p>

        <BarChart width={350} height={250} data={businessChart}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='income' />
          <Bar dataKey='expenses' />
        </BarChart>

        <h3>Business Spending Categories</h3>

        {businessSpending.length > 0 ? (
          <PieChart width={300} height={250}>
            <Pie
              data={businessSpending}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              label
            >
              {businessSpending.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p>No business expenses yet.</p>
        )}
      </section>

      <section>
        <h2>Combined Overview</h2>

        <p>Total Balance: BD {totalBalance}</p>
        <p>Total Income: BD {totalIncome}</p>
        <p>Total Expenses: BD {totalExpenses}</p>

        <BarChart width={350} height={250} data={combinedChart}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='income' />
          <Bar dataKey='expenses' />
        </BarChart>
      </section>
    </main>
  )
}

export default Dashboard