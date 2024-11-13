import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Dashboard = async () => {
  const loggedIn = await getLoggedInUser();
  
  return (
    <section className="home">
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Your personal banking experience"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1000}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 123.50}, {currentBalance: 400.50}]}/>
    </section>
  )
}

export default Dashboard