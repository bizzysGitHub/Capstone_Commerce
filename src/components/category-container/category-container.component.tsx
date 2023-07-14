// import {FC, ReactElement}  from 'react'
// import { categories } from '../../categories'
import './category-container.styles.scss'

type Props = {
    children: React.ReactNode;
}

const Directory = ({children}:Props)  =>  (
    <div className="directory-container">
        {children}
    {/* {categories.map((category) => (
      <CategoryItem key={category.id} category={category} />
     ))} */}
  </div>
)

export default Directory