
import { DirectoryContainer } from './directory-container.styles'

type Props = {
    children: React.ReactNode;
}

const Directory = ({children}:Props)  =>  (
    <DirectoryContainer>
        {children}
    {/* {categories.map((category) => (
      <DirectoryItem key={category.id} category={category} />
     ))} */}
  </DirectoryContainer>
)

export default Directory