import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const mockSet = jest.fn().mockResolvedValue(undefined);
const mockPut = jest.fn().mockResolvedValue(undefined);
const mockGetDownloadURL = jest.fn().mockResolvedValue('http://files.test/image.png');

jest.mock('../../useDate', () => ({
  useDate: () => ({ date: 'Friday, 2 January', time: '9:30 AM' }),
}));

jest.mock('../Post', () => ({ data }) => <div data-testid="post">{data.texto}</div>);

jest.mock('../../firebase/firebaseConfig', () => ({
  db: {
    collection: () => ({
      orderBy: () => ({
        onSnapshot: (cb) => {
          cb({
            forEach: (iterate) => {
              [
                { id: '1', data: () => ({ rol: 'Administrador', texto: 'ignored admin' }) },
                { id: '2', data: () => ({ rol: 'Residente', texto: 'resident post' }) },
              ].forEach(iterate);
            },
          });
          return jest.fn();
        },
      }),
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

jest.mock('@mui/material/Card', () => ({ children, ...props }) => <div {...props}>{children}</div>);
jest.mock('@mui/material/CardHeader', () => ({ title, avatar }) => <div><span>{title}</span>{avatar}</div>);
jest.mock('@mui/material/CardContent', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/CardActions', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Avatar', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/TextField', () => ({ label, id, name, ...props }) => <input aria-label={label} id={id} name={name} {...props} />);
jest.mock('@mui/material/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/material/Box', () => ({ children, component: Component = 'div', ...props }) => <Component {...props}>{children}</Component>);
jest.mock('@mui/lab/LoadingButton', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('@mui/icons-material/Image', () => () => <span>image</span>);
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
