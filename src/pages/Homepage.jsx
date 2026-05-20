import { Link } from 'react-router'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'

function Homepage() {

  const previewData = [
    { name: 'Personal', value: 40 },
    { name: 'Business', value: 60 }
  ]

  return (
    <main>

      <section>
        <h1>Cash Compass</h1>

        <p>
          Track smarter. Spend better.
        </p>

        <div>
          <Link to='/sign-up'>Get Started</Link>
          {' '}
          <Link to='/sign-in'>Sign In</Link>
        </div>
      </section>

      <section>

        <PieChart width={300} height={250}>
          <Pie
            data={previewData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={80}
            label
          >
            {previewData.map((item, index) => (
              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>

      </section>

    </main>
  )
}

export default Homepage