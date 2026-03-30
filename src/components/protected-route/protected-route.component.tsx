import { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAppSelector } from '@/app/hooks/custom'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { userDataFromFirebase, isAuthResolved } = useAppSelector((state) => state.users)

  if (!isAuthResolved) {
    return (
      <section style={{ width: '100%', maxWidth: 1240, margin: '0 auto', padding: '1.5rem 0' }}>
        <div
          style={{
            border: '1px solid var(--panel-border)',
            borderRadius: 28,
            background: 'var(--panel-bg)',
            padding: '1.5rem',
            color: 'var(--text-muted)',
            boxShadow: '0 20px 52px var(--shadow-color)',
          }}
        >
          Checking your session...
        </div>
      </section>
    )
  }

  if (userDataFromFirebase === null) {
    return <Navigate to="/sign-in" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
