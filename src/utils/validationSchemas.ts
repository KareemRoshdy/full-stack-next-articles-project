import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2, { message: "Title Must be 2 or more characters long" })
    .max(200, { message: "Title Must be 2 or fewer characters long" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(10, { message: "Description Must be 10 or more characters long" }),
});

export const registerUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .min(2, { message: "username Must be 2 or more characters long" })
    .max(100, { message: "username Must be 2 or fewer characters long" }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .min(3, { message: "email Must be 3 or more characters long" })
    .max(200, { message: "email Must be 3 or fewer characters long" }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, { message: "password Must be 6 or more characters long" }),
});

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .min(3, { message: "email Must be 3 or more characters long" })
    .max(200, { message: "email Must be 3 or fewer characters long" }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, { message: "password Must be 6 or more characters long" }),
});

export const createCommentSchema = z.object({
  text: z
    .string({
      required_error: "comment is required",
      invalid_type_error: "comment must be a string",
    })
    .min(2, { message: "comment Must be 2 or more characters long" })
    .max(500, { message: "comment Must be 2 or fewer characters long" }),
  articleId: z.number({
    required_error: "article ID is required",
  }),
});

export const updateCommentSchema = z.object({
  text: z
    .string({
      required_error: "comment is required",
      invalid_type_error: "comment must be a string",
    })
    .min(2, { message: "comment Must be 2 or more characters long" })
    .max(500, { message: "comment Must be 2 or fewer characters long" }),
});

export const updateUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .min(2, { message: "username Must be 2 or more characters long" })
    .max(100, { message: "username Must be 2 or fewer characters long" })
    .optional(),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .min(3, { message: "email Must be 3 or more characters long" })
    .max(200, { message: "email Must be 3 or fewer characters long" })
    .optional(),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, { message: "password Must be 6 or more characters long" })
    .optional(),
});
