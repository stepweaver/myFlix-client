import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';

import { MainView } from './components/main-view/main-view';

import './index.scss';

const CthulhuFlixApplication = () => {
  return (
    <Container className='text-light'>
      <MainView />
    </Container>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<CthulhuFlixApplication />);