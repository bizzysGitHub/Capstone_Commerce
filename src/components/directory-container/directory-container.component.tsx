
import { DirectoryContainer } from './directory-container.styles'

type Props = {
    children: React.ReactNode;
}

const Directory = ({children}:Props)  =>  (
    <DirectoryContainer>
        {children}
  </DirectoryContainer>
)

export default Directory