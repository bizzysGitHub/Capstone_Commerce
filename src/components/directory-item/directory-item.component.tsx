
import { FC, ReactElement } from 'react'
import {
  DirectoryContainer,
  BackgroundImg,
  DirectoryBody,
  DirectoryLink
} from './directory-item.styles.jsx';
// import { Link } from 'react-router'

type categoryProps = {
  category: {
    imageUrl: string,
    title: string

  }
}

const DirectoryItem: FC<categoryProps> = ({ category: { imageUrl, title } }): ReactElement => (
  <DirectoryContainer>
    <BackgroundImg
      src={imageUrl}
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