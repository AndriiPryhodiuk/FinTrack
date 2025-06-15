// API configuration that works with both local dev and Docker
const API_BASE_URL = import.meta.env.PROD
  ? '/api' // In production (Docker), use relative path - nginx will proxy to backend
  : 'http://localhost:8080/api'; // In development, direct connection to backend

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      credentials: 'include', // Include cookies for session management
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    console.log(`API Request: ${config.method || 'GET'} ${url}`);
    const response = await fetch(url, config);
    console.log(`API Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      // Special handling for 401 Unauthorized
      if (response.status === 401) {
        console.error('🚨 Authentication failed! Please login again.');
        errorMessage = 'Authentication required. Please login again.';
      }

      try {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);

        // Handle validation errors specifically
        if (response.status === 400 && errorData.message) {
          errorMessage = errorData.message;
        } else if (response.status === 400 && errorData.errors) {
          // Handle Spring validation errors
          errorMessage = Array.isArray(errorData.errors) ? errorData.errors.join(', ') : JSON.stringify(errorData.errors);
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
      }

      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Auth endpoints
  async register(userData) {
    // Add validation and logging for debugging
    console.log('Registering user with data:', {
      fullName: userData.fullName,
      email: userData.email,
      passwordLength: userData.password?.length,
    });

    // Client-side validation to match backend requirements
    if (!userData.fullName || userData.fullName.length < 2) {
      throw new Error('Full name must be at least 2 characters long');
    }
    if (!userData.password || userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    if (!userData.email || !userData.email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }

    try {
      return await this.request('/auth/register', {
        method: 'POST',
        body: {
          fullName: userData.fullName, // Send fullName as separate field
          email: userData.email,
          password: userData.password,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(credentials) {
    console.log('Attempting login for:', credentials.email);

    // Use form data for Spring Security login
    const formData = new URLSearchParams();
    // Since backend now uses email as username, send email as username
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    console.log(`Login response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    return { message: 'Login successful' };
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Goals endpoints
  async getGoals(limit) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/goals${params}`);
  }

  async createGoal(goalData) {
    return this.request('/goals', {
      method: 'POST',
      body: {
        name: goalData.name,
        targetAmount: goalData.target,
        iconName: goalData.icon,
        category: goalData.category?.name || goalData.category || 'Other',
      },
    });
  }

  async getGoal(id) {
    return this.request(`/goals/${id}`);
  }

  async updateGoal(id, goalData) {
    return this.request(`/goals/${id}`, {
      method: 'PUT',
      body: {
        name: goalData.name,
        targetAmount: goalData.target,
        iconName: goalData.icon,
        category: goalData.category?.name || goalData.category || 'Other',
      },
    });
  }

  async deleteGoal(id) {
    return this.request(`/goals/${id}`, {
      method: 'DELETE',
    });
  }

  // Transactions endpoints
  async getTransactions(limit) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/transactions${params}`);
  }

  async createTransaction(transactionData) {
    return this.request('/transactions', {
      method: 'POST',
      body: {
        description: transactionData.name,
        amount: Math.abs(transactionData.amount),
        type: transactionData.type === 'expense' ? 'EXPENSE' : 'INCOME',
        goalId: transactionData.goalId || null,
      },
    });
  }

  async getTransaction(id) {
    return this.request(`/transactions/${id}`);
  }

  async getGoalTransactions(goalId, limit) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/transactions/goal/${goalId}${params}`);
  }

  async deleteTransaction(id) {
    return this.request(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
