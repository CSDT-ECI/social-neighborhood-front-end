jest.mock('axios', () => ({
  create: jest.fn(),
}));

describe('apiService', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('crea el cliente con la base url del config', () => {
    const axios = require('axios');
    const mockGet = jest.fn().mockResolvedValue({ data: { ok: true } });
    const mockPost = jest.fn().mockResolvedValue({ status: 200, data: { saved: true } });
    axios.create.mockReturnValue({ get: mockGet, post: mockPost });

    const service = require('./apiService');

    expect(service.default).toBeDefined();
  });

  test('fetchData y postData delegan al cliente axios', async () => {
    const axios = require('axios');
    const mockGet = jest.fn().mockResolvedValue({ data: { items: [1, 2] } });
    const mockPost = jest.fn().mockResolvedValue({ status: 200, data: { ok: true } });
    axios.create.mockReturnValue({ get: mockGet, post: mockPost });

    const service = require('./apiService');

    await expect(service.fetchData('/posts')).resolves.toEqual({ items: [1, 2] });
    await expect(service.postData('/posts', { a: 1 })).resolves.toEqual({ status: 200, data: { ok: true } });
    expect(mockGet).toHaveBeenCalledWith('/posts');
    expect(mockPost).toHaveBeenCalledWith('/posts', { a: 1 });
  });
});