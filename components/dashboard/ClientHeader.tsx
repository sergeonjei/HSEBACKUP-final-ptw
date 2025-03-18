'use client';

import Header from './Header';

interface ClientHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function ClientHeader({ user }: ClientHeaderProps) {
  return <Header user={user} />;
} 