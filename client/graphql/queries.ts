import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";

// --- Types for Products ---

export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  description: string;
}

// Response structure for the GetAllProducts query
export type GetAllProductsResponseData = {
  data: Product[];
}

export type ProductWrapper = {
  status: number;
  message: string;
  data: Product | Product[] | null;
}

export type ProductResponseData = {
  data: ProductWrapper | null;
}

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export type LoginInput = {
  email: string;
  password: string;
}

export type UserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type UserResponseData = {
  accessToken: string;
  user: UserData;
}
export type RefreshResponse = {
  refreshToken: UserResponseData;
}

export type LogoutResponse = {
  logout: boolean;
}


// --- GraphQL Queries and Mutations ---

const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      accessToken
      user {
        id
        email
        firstName
        lastName
        phone
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        id
        email
        firstName
        lastName
        phone
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const CURRENT_CUSTOMER_QUERY = gql`
  query GetCurrentCustomer {
    getCurrentCustomer {
      id
      email
      firstName
      lastName
    }
  }
`;

// --- PASSWORD RESET DEFINITIONS (From previous turn) ---

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      message
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_QUERY = gql`
  query GetAllProducts {
    all_products {
      id
      name
      price
      image_url
      stock_quantity
      description
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query GetProductById($id: Int!) {
    find_by_id(id: $id) { 
      status
      message
      data {
        id
        name
        price
        image_url
        stock_quantity
        description
      }
    }
  }
`;

// --- Utility Functions ---

/**
 * Register a user using Apollo Client (GraphQL).
 * - client: an instance of ApolloClient
 * - input: registration fields
 * Returns: { accessToken, user }
 */
export async function registerCustomer(
  client: ApolloClient<NormalizedCacheObject>,
  input: RegisterInput
): Promise<UserResponseData> {
  try {
    const { data } = await client.mutate<UserResponseData, { input: RegisterInput }>({
      mutation: REGISTER_MUTATION,
      variables: {
        input,
      },
      errorPolicy: 'all', 
    });

    if (!data) {
      throw new Error("Registration failed: No data returned.");
    }

    return data?.register;
  } catch (error) {
    console.error("GraphQL Registration Error:", error);
    throw error;
  }
}

export async function loginCustomer(
  client: ApolloClient<NormalizedCacheObject>,
  input: LoginInput
): Promise<UserResponseData> {
  try {
    const { data } = await client.mutate<UserResponseData, { input: LoginInput }>({
      mutation: LOGIN_MUTATION,
      variables: {
        input,
      },
      errorPolicy: 'all', 
    });

    if (!data) {
      throw new Error("Login failed: No data returned.");
    }

    return data?.login;
  } catch (error) {
    console.error("GraphQL Login Error:", error);
    throw error;
  }
}

export async function getCurrentCustomer(
  client: ApolloClient<NormalizedCacheObject>
): Promise<UserResponseData> {
  try {
    const { data } = await client.mutate<UserResponseData, { input: LoginInput }>({
      mutation: CURRENT_CUSTOMER_QUERY,
      errorPolicy: 'all', 
    });

    if (!data) {
      throw new Error("Login failed: No data returned.");
    }

    return data?.getCurrentCustomer;
  } catch (error) {
    console.error("GraphQL Login Error:", error);
    throw error;
  }
}

export async function getCustomerByEmail(
  client: ApolloClient<NormalizedCacheObject>,
  email: string 
): Promise<UserResponseData> {
  try {
    const { data } = await client.mutate<UserResponseData, { input: LoginInput }>({
      mutation: LOGIN_MUTATION,
      variables: {
        email,
      },
      errorPolicy: 'all', 
    });

    if (!data) {
      throw new Error("Login failed: No data returned.");
    }

    return data?.login;
  } catch (error) {
    console.error("GraphQL Login Error:", error);
    throw error;
  }
}

export async function resetPassword(
  client: ApolloClient<NormalizedCacheObject>
): Promise<LogoutResponse> {
  const { data } = await client.mutate<LogoutResponse>({
    mutation: FORGOT_PASSWORD_MUTATION,
    errorPolicy: 'all',
  });

  if (!data || data.logout === undefined) {
    throw new Error("Logout failed: Unexpected response from server.");
  }
  return data;
}

export async function logoutCustomer(
  client: ApolloClient<NormalizedCacheObject>
): Promise<LogoutResponse> {
  const { data } = await client.mutate<LogoutResponse>({
    mutation: LOGOUT_MUTATION,
    errorPolicy: 'all',
  });

  if (!data || data.logout === undefined) {
    throw new Error("Logout failed: Unexpected response from server.");
  }
  return data;
}

/**
 * Fetches all products from the server database using Apollo Client.
 * - client: an instance of ApolloClient
 * Returns: An array of Product objects.
 */
export async function getAllProducts(
  client: ApolloClient<NormalizedCacheObject>
): Promise<ProductResponseData> {
  try {
    const { data, errors } = await client.query<ProductResponseData>({
      query: GET_ALL_PRODUCTS_QUERY,
      fetchPolicy: 'network-only', // Ensure we get fresh data
    });

    if (errors) {
      // Log GraphQL errors if they exist but data might still be partially present
      console.error("GraphQL Errors encountered:", errors);
    }
    
    if (!data || !data.all_products) {
      // If no data is returned (even after checking for errors), treat it as a failure
      return [];
    }

    // Return the array of products
    return data.all_products;
  } catch (error) {
    // Catch network errors or exceptions thrown by Apollo
    console.error("Error fetching all products:", error);
    throw error;
  }
}

export async function fetchProductByID(
  client: ApolloClient<NormalizedCacheObject>,
  // CHANGED: Type for ID is now number
  id: number
): Promise<ProductResponseData | null> {
  try {
    // CHANGED: Input variable type is now number
    const { data, errors } = await client.query<ProductResponseData, { id: number }>({
      query: GET_PRODUCT_QUERY,
      variables: {
        id: id, // Pass the product ID as a variable
      },
      fetchPolicy: 'cache-first', // Use cache first for single items
    });

    if (errors) {
      console.error(`GraphQL Errors fetching product ID ${id}:`, errors);
    }
    
    // CHANGED: Check the corrected field name: find_by_id
    if (!data || !data.find_by_id) {
      return null; // Product not found
    }

    return data?.find_by_id;
  } catch (error) {
    console.error(`Error fetching product ID ${id}:`, error);
    throw error;
  }
}

// NOTE: I've removed the deprecated string versions of the queries (GET_PRODUCTS and GET_ALL_PRODUCTS)
// and the fetch-based getAllProducts, as you should use the Apollo Client for consistency.
