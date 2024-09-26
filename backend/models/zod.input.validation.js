const zod = require('zod');

const userNameSchema = zod.string().min(1, { message: `username is required` });

const passwordSchema = zod
  .string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit.',
  });

const firstNameSchema = zod
  .string()
  .min(1, { message: 'first name is required' });

const lastNameSchema = zod
  .string()
  .min(1, { message: 'last name is required' });

const updateBodySchema = zod.object({
  password: zod.string().min(1),
  username: zod.string().min(1),
  firstName: zod.string().min(1),
  lastname: zod.string().min(1),
});

module.exports = {
  userNameSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
  updateBodySchema
};
