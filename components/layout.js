import Head from 'next/head';
import Header from './header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Product Store</title>
        <meta name="description" content="Product store example" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="container mt-4">
        <Header />
        <main>{children}</main>
        <footer className="mt-5 pt-3 text-center text-white" style={{ backgroundColor: '#00BFFF', padding: '10px 0' }}>
          <p>&copy; 2020 Copyright:</p>
        </footer>
      </div>
    </>
  );
}