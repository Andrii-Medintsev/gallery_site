'use client';

import React, { useRef, useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const Header = () => {
  const [query, setQuery] = useState('');
  const [searchIsActive, setSearchIsActive] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query) {
      if (ref.current) {
        ref.current.focus();
        setSearchIsActive(true);
      }

      return;
    }

    setQuery('');
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='header__content'>
          <Link href='/' className='header__logo'>
            <Logo />
          </Link>

          <form
            className={clsx(
              'header__form',
              {
                'header__form--focused': searchIsActive
              }
            )}
            onSubmit={handleSearch}
            onFocus={() => setSearchIsActive(true)}
            onBlur={() => setSearchIsActive(false)}
          >
            <button
              type="submit"
              className='header__form-button'
            >
              <MagnifyingGlassIcon
                width={18}
                height={18}
                color='#767676'
                className='header__form-icon'
              />
            </button>

            <input
              type='text'
              name='searchImages'
              className='header__search'
              placeholder='Search Images'
              ref={ref}
              autoComplete='off'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
