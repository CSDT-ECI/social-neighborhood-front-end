import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropTypes from 'prop-types';

const mockSet = jest.fn().mockResolvedValue(undefined);
const mockPut = jest.fn().mockResolvedValue(undefined);
const mockGetDownloadURL = jest.fn().mockResolvedValue('http://files.test/image.png');

const mockSnapshotDocs = [
  { id: '1', data: () => ({ rol: 'Administrador', texto: 'ignored admin' }) },
  { id: '2', data: () => ({ rol: 'Residente', texto: 'resident post' }) },
];

const mockFirestoreOnSnapshot = (cb) => {
  cb({ forEach: (fn) => mockSnapshotDocs.forEach((doc) => fn(doc)) });
  return jest.fn();
};

jest.mock('../../useDate', () => ({
  useDate: () => ({ date: 'Friday, 2 January', time: '9:30 AM' }),
}));

jest.mock('../Post', () => {
  const PropTypes = require('prop-types');
  const PostMock = ({ data }) => <div data-testid="post">{data.texto}</div>;
  PostMock.propTypes = { data: PropTypes.shape({ texto: PropTypes.string }) };
  return PostMock;
});

jest.mock('../../firebase/firebaseConfig', () => ({
  db: {
    collection: () => ({
      orderBy: () => ({ onSnapshot: mockFirestoreOnSnapshot }),
      doc: () => ({ set: (data) => { mockSet(data); return Promise.resolve(); } }),
    }),
  },
  storage: {
    ref: () => ({
      child: () => ({
        put: mockPut,
        getDownloadURL: mockGetDownloadURL,
      }),
    }),
  },
}));

function mockCard({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

mockCard.propTypes = {
  children: PropTypes.node,
};

function mockCardHeader({ title, avatar }) {
  return <div><span>{title}</span>{avatar}</div>;
}

mockCardHeader.propTypes = {
  title: PropTypes.node,
  avatar: PropTypes.node,
};

function mockCardContent({ children }) {
  return <div>{children}</div>;
}

mockCardContent.propTypes = {
  children: PropTypes.node,
};

function mockCardActions({ children }) {
  return <div>{children}</div>;
}

mockCardActions.propTypes = {
  children: PropTypes.node,
};

function mockAvatar({ children }) {
  return <div>{children}</div>;
}

mockAvatar.propTypes = {
  children: PropTypes.node,
};

function mockTextField({ label, id, name, ...props }) {
  return <input aria-label={label} id={id} name={name} {...props} />;
}

mockTextField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

function mockButton({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

mockButton.propTypes = {
  children: PropTypes.node,
};

function mockBox({ children, component: Component = 'div', ...props }) {
  return <Component {...props}>{children}</Component>;
}

mockBox.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
};

function mockLoadingButton({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

mockLoadingButton.propTypes = {
  children: PropTypes.node,
};

function mockImage() {
  return <span>image</span>;
}

jest.mock('@mui/material/Card', () => mockCard);
jest.mock('@mui/material/CardHeader', () => mockCardHeader);
jest.mock('@mui/material/CardContent', () => mockCardContent);
jest.mock('@mui/material/CardActions', () => mockCardActions);
jest.mock('@mui/material/Avatar', () => mockAvatar);
jest.mock('@mui/material/TextField', () => mockTextField);
jest.mock('@mui/material/Button', () => mockButton);
jest.mock('@mui/material/Box', () => mockBox);
jest.mock('@mui/lab/LoadingButton', () => mockLoadingButton);
jest.mock('@mui/icons-material/Image', () => mockImage);
jest.mock('sweetalert2', () => ({ fire: jest.fn().mockResolvedValue({}) }));

import Feed from './index';

describe('Feed', () => {
  beforeEach(() => {
    mockSet.mockClear();
    mockPut.mockClear();
    mockGetDownloadURL.mockClear();
  });

  test('renderiza posts filtrados y publica un post de texto', async () => {
    render(<Feed user={{ nombres: 'Juan', apellidos: 'Perez', tipousuario: 'Administrador' }} conjunto={{ idconjunto: 1 }} />);

    expect(await screen.findByTestId('post')).toHaveTextContent('resident post');
    expect(screen.queryByText('ignored admin')).not.toBeInTheDocument();

    const textInput = screen.getByLabelText('What do you think?');
    fireEvent.change(textInput, { target: { value: 'Hola mundo' } });

    // jsdom does not support named-property access on HTMLFormElement (form.inputPost),
    // so we patch it before submitting to match browser behaviour.
    const form = document.querySelector('form');
    Object.defineProperty(form, 'inputPost', {
      get: () => document.querySelector('[name="inputPost"]'),
      configurable: true,
    });

    fireEvent.click(screen.getByRole('button', { name: /Publish/i }));

    await waitFor(() => expect(mockSet).toHaveBeenCalled());
    expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
      nombreUsuario: 'Juan',
      apellidoUsuario: 'Perez',
      texto: 'Hola mundo',
      idConjunto: 1,
    }));
  });

  test('muestra posts para residente sin mostrar administradores', async () => {
    render(<Feed user={{ nombres: 'Ana', apellidos: 'Lopez', tipousuario: 'Residente' }} conjunto={{ idconjuntousuario: 7 }} />);

    expect(await screen.findByTestId('post')).toHaveTextContent('resident post');
    expect(screen.queryByText('ignored admin')).not.toBeInTheDocument();
  });
});
