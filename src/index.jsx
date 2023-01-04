import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import { MainView } from './components/main-view/main-view';

import './index.scss';

const MyFlixApplication = () => {
  return (
    <Container style={{ border: '1px solid red' }}>
      <MainView />
    </Container>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyFlixApplication />);