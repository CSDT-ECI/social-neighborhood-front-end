import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropTypes from 'prop-types';
import Leftbar from './index';
import axios from 'axios';

jest.mock('axios');
function mockDivider() {
  return <hr />;
}

function mockAvatar({ alt, src }) {
  return <img alt={alt} src={src} />;
}

mockAvatar.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

function mockList({ children }) {
  return <ul>{children}</ul>;
}

mockList.propTypes = {
  children: PropTypes.node,
};

function mockListItemButton({ children, onClick, name }) {
  return <li role="button" name={name} onClick={onClick}>{children}</li>;
}

mockListItemButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

function mockListItemIcon({ children }) {
  return <span>{children}</span>;
}

mockListItemIcon.propTypes = {
  children: PropTypes.node,
};

function mockListItemText({ children, className }) {
  return <span>{children}</span>;
}

mockListItemText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

function mockCollapse({ children, in: open }) {
  return open ? <div>{children}</div> : null;
}

mockCollapse.propTypes = {
  children: PropTypes.node,
  in: PropTypes.bool,
};

jest.mock('@material-ui/core/Divider', () => mockDivider);
jest.mock('@mui/material/Avatar', () => mockAvatar);
jest.mock('@mui/material/List', () => mockList);
jest.mock('@mui/material/ListItemButton', () => mockListItemButton);
jest.mock('@mui/material/ListItemIcon', () => mockListItemIcon);
jest.mock('@mui/material/ListItemText', () => mockListItemText);
jest.mock('@mui/material/Collapse', () => mockCollapse);
jest.mock('@mui/icons-material/ExpandLess', () => () => <span>less</span>);
jest.mock('@mui/icons-material/ExpandMore', () => () => <span>more</span>);
jest.mock('@mui/icons-material/Settings', () => () => <span>settings</span>);
jest.mock('@mui/icons-material/PersonAdd', () => () => <span>person</span>);
jest.mock('@mui/icons-material/HomeWork', () => () => <span>home</span>);
jest.mock('@mui/icons-material/MapsHomeWorkTwoTone', () => () => <span>map</span>);
jest.mock('@mui/icons-material/BeachAccessTwoTone', () => () => <span>beach</span>);
jest.mock('@mui/icons-material/HomeRounded', () => () => <span>rounded</span>);
jest.mock('@mui/icons-material/EmojiEmotions', () => () => <span>emoji</span>);
jest.mock('@mui/icons-material/ExitToApp', () => () => <span>exit</span>);

// Suppress CSS import
jest.mock('./leftbar.css', () => ({}), { virtual: true });

const adminUser = {
  nombres: 'Ana',
  apellidos: 'Smith',
  email: 'a@b.com',
  tipousuario: 'Administrador',
  nombrefoto: 'photo.jpg',
};
const residentUser = {
  nombres: 'Bob',
  apellidos: 'Jones',
  email: 'b@c.com',
  tipousuario: 'Residente',
  nombrefoto: 'photo.jpg',
};
const conjunto = { idconjunto: 2 };
const vivienda = {
  tipoagrupacion: 'null',
  numagrupacion: 'null',
  tipoinmueble: 'Apto',
  numinmueble: 101,
};

describe('Leftbar', () => {
  let changeSection;

  beforeEach(() => {
    window.$dir = 'http://test/';
    axios.get.mockReset();
    axios.get.mockResolvedValue({ data: { nombre: 'Conjunto Test' } });
    changeSection = jest.fn(() => jest.fn());
  });

  test('renders admin user with full name "Ana Smith"', async () => {
    render(
      <Leftbar
        user={adminUser}
        changeSection={changeSection}
        conjunto={conjunto}
        vivienda={vivienda}
      />
    );

    expect(screen.getByText('Ana Smith')).toBeInTheDocument();
    expect(screen.getByText('a@b.com')).toBeInTheDocument();
  });

  test('admin user shows "Configuracion" menu item', async () => {
    render(
      <Leftbar
        user={adminUser}
        changeSection={changeSection}
        conjunto={conjunto}
        vivienda={vivienda}
      />
    );

    expect(screen.getByText('Configuracion')).toBeInTheDocument();
  });

  test('resident user shows "Alquilar" menu item', async () => {
    render(
      <Leftbar
        user={residentUser}
        changeSection={changeSection}
        conjunto={conjunto}
        vivienda={vivienda}
      />
    );

    expect(screen.getByText('Alquilar')).toBeInTheDocument();
  });
});
