import React from 'react'
import {categories} from '../../home-categories'
import Directory from '../../components/category-container/category-container.component';
import CategoryItem from '../../components/category-item/category-item.component';

// type Props = {}
// {}: Props

export default function Home() {
  return (
    <Directory>
    {categories.map((category) => (
   <CategoryItem key={category.id} category={category} />
  ))}
 </Directory>
  )
}