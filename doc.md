### Icons

```sh
npm i react-icons
```

```js
import { MdSearch } from 'react-icons/md';
```

### Styling. CSS modules

```js
<span className={`${styles.status} ${styles.pending}`}>Pending</span>
```

### Router and Navigation

`1`. /app/dashboard ==> http://localhost:3000/dashboard

### Custom layout

`1`. Dashboard layout - /app/dashboard/layout.tsx ==> http://localhost:3000/dashboard
`2`. Dashboard page - /app/dashboard/page.tsx ==> http://localhost:3000/dashboard

### Link

```js
<Link href={`/dashboard/products/${product.id}`}>
  <button className={`${styles.button} ${styles.view}`}>View</button>
</Link>
```

###

```js
let url = new URL('https://example.com?foo=1&bar=2');
let params = new URLSearchParams(url.search);

// Add a third parameter.
params.set('baz', 3);
params.toString(); // "foo=1&bar=2&baz=3"
```

### Use Client

```js
'use client';

import styles from './pagination.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
```

![Use client](/SSR.png)
