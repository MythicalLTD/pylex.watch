/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';

export default function Nav() {
  const nav = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState<string>('');
  const [searching, setSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function onScroll() {
    const scrolled = window.scrollY > 0;
    setScrolled(scrolled);
  }

  function onSearchClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setSearching(true);
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const param = searchParams.get('q');

    setSearch(value);

    if (!value) {
      nav('/');
      return;
    }

    if (!param) {
      nav(`/search?q=${value}`);
      return;
    }

    searchParams.set('q', value);
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (searchParams.has('q')) setSearch(searchParams.get('q')!);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!searching) return;
    if (!inputRef.current) return;

    inputRef.current.focus();

    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSearching(false);
      }
    }

    window.addEventListener('click', onClick, { capture: true });

    return () => {
      window.removeEventListener('click', onClick, { capture: true });
    };
  }, [searching]);

  return (
    <div className={`top-bar ${scrolled ? 'scrolled' : ''} fixed w-full bg-gray-900 shadow-md text-white`}>
      <Link className="top-bar-logo flex items-center p-4" to="/">
        <img alt={import.meta.env.VITE_APP_NAME} src="/logo.png" className="h-8" />
      </Link>

      <div className="top-bar-links flex space-x-4 p-4">
        <NavLink className="hover:text-blue-400" to="/">Browse</NavLink>
        <NavLink className="hover:text-blue-400" to="/movies">Movies</NavLink>
        <NavLink className="hover:text-blue-400" to="/series">Series</NavLink>
        <NavLink className="hover:text-blue-400" to="/list">My List</NavLink>

        <NavLink className="mobile hover:text-blue-400" to="/movies">
          <i className="fa fa-film"></i>
        </NavLink>

        <NavLink className="mobile hover:text-blue-400" to="/series">
          <i className="fa fa-tv"></i>
        </NavLink>

        <NavLink className="mobile hover:text-blue-400" to="/list">
          <i className="fa fa-list"></i>
        </NavLink>
      </div>

      <div className="top-bar-search relative p-4" ref={wrapperRef}>
        {searching ? (
          <div className="top-bar-input flex items-center rounded p-2 bg-gray-800">
        <i className="fa fa-search mr-2"></i>
        <input
          type="text"
          ref={inputRef}
          value={search}
          placeholder="Search for a title"
          onChange={onSearchChange}
          className="outline-none bg-gray-800 text-white"
        />
          </div>
        ) : (
          <i className="fa fa-search action cursor-pointer" onClick={onSearchClick}></i>
        )}
      </div>
    </div>
  );
}
