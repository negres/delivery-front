'use client';

import React from 'react';
import Link from 'next/link';
import { ListIcon, Plus} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from './button';

const Header = () => {
  const currentPage = usePathname();

  const pageConfig: Record<string, { buttonText: string; buttonLink: string; buttonIcon: React.ReactNode }> = {
    "/pedidos/novo": {
      buttonText: "Listar Pedidos",
      buttonLink: "/pedidos",
      buttonIcon: <ListIcon className="h-4 w-4" />,
    },
    "/pedidos": {
      buttonText: "Novo Pedido",
      buttonLink: "/pedidos/novo",
      buttonIcon: <Plus className="h-4 w-4" />,
    },
  };

  const { buttonText, buttonLink, buttonIcon } = pageConfig[currentPage] || {};

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 sm:px-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">DeliveryGood</h1>
          </div>
          <Link href={buttonLink || "/pedidos"} className="flex items-center">
            <Button>
              {buttonIcon && React.cloneElement(buttonIcon as React.ReactElement<{ className?: string }>, { className: "h-4 w-4" })}
              <span className="hidden sm:inline ml-2">{buttonText}</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
