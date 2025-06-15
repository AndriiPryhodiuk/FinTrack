// library
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { apiClient } from '../utils/api';

// helpers
import { deleteItem } from '../helpers';

export async function logoutAction() {
  try {
    await apiClient.logout();
  } catch (error) {
    console.error('Logout error:', error);
    // Continue with logout even if API call fails
  }

  // Clear local storage
  localStorage.removeItem('userFullName');
  localStorage.removeItem('balance');

  return redirect('/');
}
