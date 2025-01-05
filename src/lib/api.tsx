
const API_BASE_URL = "http://127.0.0.1:8000"; // a remplacer


export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
}

// USER DETAILS
export const fetchUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");

    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user data");

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// SIGN UP
export const registerUser = async (name: string, surname: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname, email, password }),
    });

    if (!response.ok) throw new Error("Registration failed");

    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};


export async function fetchUserTeam(token: string) {
  try {
    const response = await fetch("http://127.0.0.1:8000/users/me/team", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team, status: ${response.status}`);
    }

    const teamData = await response.json();
    return teamData; //{ id: 1, name: "Projet Inc", total_revenue: 99999 }
  } catch (error) {
    console.error("Error fetching user team:", error);
    return null;
  }
}



// Log in
export const loginUser = async (email: string, password: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Login failed: ${errorMessage}`);
    }

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Log out
export const logoutUser = () => {
  localStorage.removeItem("token");
};
