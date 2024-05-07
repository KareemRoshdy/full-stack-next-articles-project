import { DOMAIN } from "@/utils/constants";
import { Comment, User } from "@prisma/client";

// Get All Comments
export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const { comments } = await response.json();

  return comments;
}

// Get All Users
export async function getAllUsers(token: string): Promise<User[]> {
  const response = await fetch(`${DOMAIN}/api/users`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const { users } = await response.json();

  return users;
}
