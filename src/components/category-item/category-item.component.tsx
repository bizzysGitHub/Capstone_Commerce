
import { FC, ReactElement } from 'react'
import './category-item.styles.scss'

type categoryProps = {
  category: {
    imageUrl: string,
    title: string

  }
}

const CategoryItem: FC<categoryProps> = ({ category: { imageUrl, title } }): ReactElement => (
  <div className="category-container">
    <div className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }} />
    <div className="category-body-container">
      <h2>{title}</h2>
      <p>Shop Now</p>
    </div>
  </div>
);
export default CategoryItem