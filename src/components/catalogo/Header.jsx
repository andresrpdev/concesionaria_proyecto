import React from 'react';

export default function Header() {
    return (
        <header className='flex bg-black text-white items-center justify-between p-4'>
            {/* Logo con enlace a la página principal */}
            <a href='/'>
                <img src='/images/logo.png' alt='logo de la compañía' className='h-auto w-40' />
            </a>
            <nav className='mr-12'>
                <a href="/catalogo" className="mx-4">Todos Los Vehículos</a>
                <a href="/contacto" className="mx-4">Contacto</a>
                <a href="/donde-estamos" className="mx-4">¿Dónde Estamos?</a>
            </nav>
        </header>
    );
}