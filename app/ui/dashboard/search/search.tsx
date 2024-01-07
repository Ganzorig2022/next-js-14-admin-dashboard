'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MdSearch } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';
import styles from './search.module.css';

type SearchPropsType = {
  placeholder: string;
};

const Search = ({ placeholder }: SearchPropsType) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname(); // '/dashboard/users'

  const handleSearch = useDebouncedCallback((e) => {
    const searchInput = e.target.value;
    const params = new URLSearchParams(searchParams);

    params.set('page', '1'); // '/dashboard/users' ==> '/dashboard/users?page=1'

    if (searchInput) {
      searchInput.length > 2 && params.set('q', searchInput); // '/dashboard/users?page=1' ==> '/dashboard/users?page=1&q=admin'
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type='text'
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
