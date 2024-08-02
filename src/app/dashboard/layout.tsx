import Sidebar from "../components/Sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="bg-neutral-800">
         
        <Sidebar/>
        {children}
    
      </section>
    
    )
  }