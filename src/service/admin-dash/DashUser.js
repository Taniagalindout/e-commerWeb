import { createURL } from "../../utils/environment";

export const getCountUsersByCustomer = async (token) => {
    const roleId = 1;
    const response = await fetch(createURL([`/users/count-users-by-role/${roleId}`]), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);
    return response.json();
}

export const getCountUsersByeller = async (token) => {
    const roleId = 2; // El ID del rol específico, en este caso, 4
    const response = await fetch(createURL([`/users/count-users-by-role/${roleId}`]), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);
    return response.json();
}


export const getCountOrderItems = async (token) => {
    const response = await fetch(createURL(['/order-items/total']), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);
    return response.json();
}

export const getMostSoldCategories = async (token) => {
    const response = await fetch(createURL(['/products/most-sold-categories']), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);
    return response.json();
}




export const GetOrderItemByYearAndMonth = async (token, year, month) => {
    const baseUrl = 'http://localhost:8080/api/order-items/count-orders-by-month';
    const url = new URL(baseUrl);
  
    url.searchParams.append('year', year);
    url.searchParams.append('month', month);
  
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      console.log(response);
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to handle it elsewhere, if needed
    }
  };
  