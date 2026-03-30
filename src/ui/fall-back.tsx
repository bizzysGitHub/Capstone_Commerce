
const Fallback = () => {
  return (
    <div style={{ minHeight: 240, display: 'grid', placeItems: 'center', gap: '0.75rem' }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: '4px solid #cbd5e1',
          borderTopColor: '#16a34a',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p style={{ margin: 0 }}>Loading content, please wait...</p>
    </div>
  )
}

export default Fallback
