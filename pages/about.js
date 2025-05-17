import Layout from '../components/layout';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="mb-4">This is MyStore.</h1>
        
        <div className="my-5 d-flex justify-content-center">
          <img 
            src="/images/store.png" 
            alt="Store front" 
            style={{ maxWidth: '300px', height: 'auto' }} 
          />
        </div>
        
        {/* <p className="text-muted mt-5">© 2021 Company, Inc</p> */}
      </div>
    </Layout>
  );
}