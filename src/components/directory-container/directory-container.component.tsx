type Props = {
  children: React.ReactNode
}

const Directory = ({ children }: Props) => (
  <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
    {children}
  </div>
)

export default Directory
