import { FC, ReactElement, useState } from 'react'
import { Link } from 'react-router'

type CategoryProps = {
  category: {
    imageUrl: string
    title: string
  }
}

const DirectoryItem: FC<CategoryProps> = ({ category: { imageUrl, title } }): ReactElement => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        minWidth: 280,
        height: 280,
        flex: '1 1 280px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--panel-border)',
        borderRadius: 28,
        boxShadow: '0 20px 46px var(--shadow-color)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 500ms ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 168,
          padding: '1rem 1.5rem',
          background: 'linear-gradient(180deg, rgba(253, 185, 39, 0.94), rgba(255, 255, 255, 0.94))',
          borderRadius: 18,
          opacity: hovered ? 0.96 : 0.86,
        }}
      >
        <Link to={`shop/${title}`} style={{ textDecoration: 'none', color: '#22123d' }}>
          <div style={{ display: 'grid', gap: '0.35rem', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.25rem', letterSpacing: '0.05em' }}>{title}</strong>
            <span style={{ fontWeight: 700, color: 'var(--accent-purple)' }}>Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default DirectoryItem
