import { LogOut } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/Navbar"; // Adjust the path as necessary
import CryptoDashboard from "./[coinId]/components/CryptoDashboard";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start">
      <Navbar />
      <CryptoDashboard initialCoinId="bitcoin" />
    </div>
  );
}

// 2 div, 
// in 1st thewre is a LogOutin other onemptied, it has 4 nav linkSync, 
// there is space around