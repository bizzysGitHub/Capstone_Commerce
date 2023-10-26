import React from 'react'
import {categories} from '../../home-categories'
import Directory from '../../components/directory-container/directory-container.component';
import DirectoryItem from '../../components/directory-item/directory-item.component';

// type Props = {}
// {}: Props
// change to make categories come from Context and not the variables on line 2

export default function Home() {
  return (
    <Directory>
    {categories.map((category) => (
   <DirectoryItem key={category.id} category={category} />
  ))}
 </Directory>
  )
}