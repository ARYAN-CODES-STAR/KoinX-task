// import { use } from 'react';
// import CryptoDashboard from './components/CryptoDashboard';

// export default function Page({ params }: { params: { coinId: string } }) {
//   const coinId = use(Promise.resolve(params.coinId)) || 'bitcoin';
  
//   return <CryptoDashboard initialCoinId={coinId} />;
// }


// import CryptoDashboard from './components/CryptoDashboard';

// type PageProps = {
//   params: {
//     coinId: string;
//   };
// };

// export default async function Page({ params }: PageProps) {
//   // Await the params directly
//   const coinId = await Promise.resolve(params.coinId);
  
//   return (
//     <CryptoDashboard 
//       initialCoinId={coinId || 'bitcoin'} 
//     />
//   );
// }

import CryptoDashboard from './components/CryptoDashboard';

type PageProps = {
    params: Promise<{
      coinId: string;
    }>;
  };
  
  export default async function Page({ params }: PageProps) {
    // Await the params
    const { coinId } = await params;
    
    return (
      <CryptoDashboard 
        initialCoinId={coinId || 'bitcoin'} 
      />
    );
  }