
import { FC, ReactElement } from 'react'
import {DirectoryContainer,
  BackgroundImg,
  DirectoryBody,
  DirectoryLink } from './directory-item.styles.jsx';
// import { Link } from 'react-router-dom'

/**
 * this is actually the directory items.. need to fix wording
 * 
 */

type categoryProps = {
  category: {
    imageUrl: string,
    title: string

  }
}

const DirectoryItem: FC<categoryProps> = ({ category: { imageUrl, title } }): ReactElement => (
  <DirectoryContainer>
    <BackgroundImg
    imageUrl={imageUrl}
       />
    <DirectoryBody>
      <DirectoryLink to={'shop/' + title}>
      <h2>{title}</h2>
      <p>Shop Now</p>
      
      </DirectoryLink>
    </DirectoryBody>
  </DirectoryContainer>
);
export default DirectoryItem