
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



// get all team users/members
export async function fetchTeamUsers(teamId: number, token?: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team members, status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
}



// GET USER TEAM foreignkey team_id
export async function fetchUserTeam(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me/team`, {
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
    return teamData;
  } catch (error) {
    console.error("Error fetching user team:", error);
    throw error;
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

//ASK AI
export const sendMessage = async (message: string) => {
  const conversationId = "your_conversation_id";

  const response = await fetch(`${API_BASE_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation_id: conversationId,
      message,
      role: "user",
    }),
  });

  if (!response.ok) {
    throw new Error("Error sending message");
  }

  const data = await response.json();
  return data;
};

