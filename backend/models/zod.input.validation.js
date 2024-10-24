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
  password: zod.string().optional(),
  username: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const transferSchema = zod.object({
  to: zod.string().min(1),
  amount: zod.number().min(1),
  pin: zod.string().min(4),
});

const upiSchema = zod.object({
  pin: zod.string().length(4, { message: 'Must have exact 4 length' }),
});

module.exports = {
  userNameSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
  updateBodySchema,
  transferSchema,
  upiSchema,
};
