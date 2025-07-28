import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, anvil } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '81bd965ef6722331a6c12ed6611a18a4' // Get one from https://cloud.walletconnect.com

export const config = createConfig({
  chains: [mainnet, sepolia, anvil], // Add the chains you want to support
  connectors: [
    metaMask(),
    walletConnect({ projectId }),
    injected(), // This is for general browser wallets like MetaMask
    safe(),
  ],
  ssr: true, // Important for Next.js
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http(), // This tells wagmi to use Anvil's default RPC URL (http://127.0.0.1:8545)
  },
})