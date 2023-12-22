import { getSession } from 'next-auth/react';

const authMiddleware = async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return res.redirect('/login');
  }

  return next();
};

export default authMiddleware;
