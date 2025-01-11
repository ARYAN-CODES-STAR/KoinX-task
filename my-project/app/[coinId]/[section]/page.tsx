// import { Suspense } from 'react';
// import CoinDetails from '../../components/CoinDetails';

// type Params = {
//   coinId: string;
//   section: string;
// };

// type PageProps = {
//   params: Params;  // Remove Promise wrapper - params is directly accessible
// };

// export default function CoinDetailsPage({ params }: PageProps) {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <CoinDetails initialCoinId={params.coinId} initialSection={params.section} />
//     </Suspense>
//   );
// }
// // Add type declarations for the page
// export type { PageProps };


// import { Suspense } from 'react';
// import CoinDetails from '../../components/CoinDetails';

// type PageProps = {
//   params: {
//     coinId: string;
//     section: string;
//   };
// };

// export default async function CoinDetailsPage({ params }: PageProps) {
//   // Await both params
//   const coinId = await Promise.resolve(params.coinId);
//   const section = await Promise.resolve(params.section);
  
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <CoinDetails 
//         initialCoinId={coinId || 'bitcoin'} 
//         initialSection={section || 'overview'} 
//       />
//     </Suspense>
//   );
// }

// export type { PageProps };


import { Suspense } from 'react';
import CoinDetails from '../../components/CoinDetails';

type PageProps = {
    params: Promise<{
      coinId: string;
      section: string;
    }>;
  };
  
  export default async function CoinDetailsPage({ params }: PageProps) {
    // Await the params
    const { coinId, section } = await params;
    
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CoinDetails 
          initialCoinId={coinId || 'bitcoin'} 
          initialSection={section || 'overview'} 
        />
      </Suspense>
    );
  }