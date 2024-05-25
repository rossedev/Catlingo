import dynamic from 'next/dynamic'

const App = dynamic(() => import('./App'), { ssr: false })

const AdminPage = () => {
  return <App />
}

export default AdminPage
