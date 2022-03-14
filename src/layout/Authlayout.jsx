import { Outlet } from "react-router-dom"

const Authlayout = () => {
  return (
    <main className="md:grid md:grid-cols-2 items-center px-10">
      <Outlet />
    </main>
  )
}

export default Authlayout