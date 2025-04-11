function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <h1>Layout</h1>
      <main>
          {children}
      </main>
    </>
  )
}

export default AppLayout