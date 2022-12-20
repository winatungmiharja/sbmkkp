export const isProd = process.env.NODE_ENV === 'production';

/**
 * * change the true to false if you want to turn off the feature
 * * all flag is going to be true on Production by default
 *
 * ! the type will error on toggle false, ignore it on development.
 */

/**
 * Toggle flag for authentication gateway
 *
 * @see _app.tsx
 */
export const authFlag: true = isProd || true;
