// import {FC, ReactElement}  from 'react'
// import { categories } from '../../categories'
import './directory-container.styles.scss'

type Props = {
    children: React.ReactNode;
}

const Directory = ({children}:Props)  =>  (
    <div className="directory-container">
        {children}
    {/* {categories.map((category) => (
      <DirectoryItem key={category.id} category={category} />
     ))} */}
  </div>
)

export default Directory