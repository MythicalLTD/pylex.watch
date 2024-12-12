import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Loading() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Loading - {import.meta.env.VITE_APP_NAME || 'App'}</title>
      </Helmet>

      <div className="loading">
        <img alt={(import.meta.env.VITE_APP_NAME && import.meta.env.VITE_APP_NAME[0]) || 'A'} src="/icon.png" />
      </div>
    </HelmetProvider>
  );
}
