import { test, expect } from '@playwright/test';

const HOST = 'https://practice.expandtesting.com/notes/api';

const timestamp = Date.now();
const testUser = {
  name: "PhatDV",
  email: `phatdv_${timestamp}@example.com`,
  // email: `phatdv@example.com`,
  password: "Test@123"
}

let authToken: string;
test.describe.skip('Notes API', () => {
  // GET /health-check
  test('Health check API - status 200', async ({ request }) => {
    // Gửi GET request đến /health-check
    const reponse = await request.get(`${HOST}/health-check`);

    // Xác nhận status code
    expect(reponse.status()).toBe(200);

    // Lấy response JSON
    const body = await reponse.json();

    // Xác nhận từng field của body trong response
    const { success, status, message } = body;
    expect(success).toBe(true);
    expect(status).toBe(200);
    expect(message).toBe('Notes API is Running');
  });


  // API Scenario Testing
  // Step 1: Tạo user
  test('POST /users/register - Tạo user', async ({ request }) => {
    // Thực hiện tạo user
    const response = await request.post(`${HOST}/users/register`, {
      data: testUser
    });

    // Xác nhận status code
    expect(response.status()).toBe(201);

    // Lấy response JSON
    const body = await response.json();

    // Xác nhận từng field của body trong response
    expect(body.message).toBe('User account created successfully');
  });

  // Step 2: Login với user tạo ở step 1
  test('POST /users/login - Tạo user', async ({ request }) => {
    // Thực hiện login user
    const response = await request.post(`${HOST}/users/login`, {
      data: {
        email: testUser.email,
        password: testUser.password
      }
    });

    // Xác nhận status code
    expect(response.status()).toBe(200);

    // Lấy response JSON
    const body = await response.json();

    // Xác nhận từng field của body trong response
    expect(body.message).toBe('Login successful');

    // Lấy token sau khi thực hiện login
    authToken = body.data.token;
  })

  // Step 3: Lấy profile của user đã được login ở step 2
  test('GET /users/profile - Tạo user', async ({ request }) => {
    const response = await request.get(`${HOST}/users/profile`, {
      headers: {
        'x-auth-token': authToken
      }
    });

    // Xác nhận status code
    expect(response.status()).toBe(200);

    // Lấy response JSON
    const body = await response.json();

    // Xác nhận từng field của body trong response
    expect(body.message).toBe('Profile successful');

    const { name, email } = body.data;
    expect(name).toBe(testUser.name);
    expect(email).toBe(testUser.email);

    console.log(`User email: ${email}`);
  });

  // Step 4: Hybrid testing - Dung API thay thees login
  test('Vao trang profile voi login bang API', async ({ page }) => {
    await page.addInitScript(val => {
      // Chèn token đã login bằng API ở step 2 vào trong "page"
      window.localStorage.setItem('token', val);
    }, authToken);

    await page.goto('https://practice.expandtesting.com/notes/app/profile', { waitUntil: 'domcontentloaded' });

    // Xác nhận đã vào trang profile của đúng user
    await expect(page.getByTestId('user-email')).toHaveValue(testUser.email);
  });

});




const isNonEmptyString = (value: unknown) =>
  typeof value === 'string' && value.trim().length > 0; // '' empty string - length === 0

test('Unique', async () => {

  const numbs = [1, 2, 3];
  const ids = new Set<number>();

  for (const numb of numbs) {

    // Verify unique id in data set
    expect(ids.has(numb)).toBe(false);
    ids.add(numb);
  }

});

// TC-03 & TC-06 step 1
const newProduct = {
  title: 'Test Product for Exam',
  price: 99.99,
  description: 'A product created by automated API test.',
  image: 'https://i.pravatar.cc',
  category: 'electronics',
};
