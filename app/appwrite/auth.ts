import { ID, OAuthProvider, Query } from "appwrite";
import { account, database, appwriteConfig } from "~/appwrite/client";
import { redirect } from "react-router";

// Find an existing user in your custom "users" collection
export const getExistingUser = async (id: string) => {
  try {
    const { documents, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", id)]
    );
    return total > 0 ? documents[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Store user data in your custom collection after login
export const storeUserData = async () => {
  try {
    const user = await account.get(); // ✅ Works after OAuth login
    if (!user) throw new Error("User not found");

    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: user.prefs?.avatar || null, // Appwrite may provide an avatar
        joinedAt: new Date().toISOString(),
      }
    );

    if (!createdUser.$id) redirect("/sign-in");
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

// Google OAuth login
export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`, // success URL
      `${window.location.origin}/404` // failure URL
    );
  } catch (error) {
    console.error("Error during OAuth2 session creation:", error);
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Get the logged-in user + their custom profile document
export const getUser = async () => {
  try {
    const user = await account.get();
    if (!user) return redirect("/sign-in");

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );

    return documents.length > 0 ? documents[0] : redirect("/sign-in");
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// Get all users (paginated)
export const getAllUsers = async (limit: number, offset: number) => {
  try {
    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.limit(limit), Query.offset(offset)]
    );

    if (total === 0) return { users: [], total };

    return { users, total };
  } catch (e) {
    console.log("Error fetching users");
    return { users: [], total: 0 };
  }
};
