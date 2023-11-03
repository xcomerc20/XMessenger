
import { useEffect, useState } from "react"
import { useAccount, useNetwork, useSignMessage } from "wagmi"
import { SiweMessage } from 'siwe'

export const message = (address: any) => `I agree to Terms of Service & Policies and `

export default function AuthWrapper({ children }: any) {
    const [hasMounted, setHasMounted] = useState(false);
    const { isConnected, address } = useAccount()
    const { chain } = useNetwork()
    const { signMessageAsync } = useSignMessage()
    const [auth, setAuth] = useState<{
        loading?: boolean
        nonce?: string
    }>({})

    const fetchNonce = async () => {
        try {
            const nonceRes = await fetch(`/api/nonce?address=${address}`)
            const nonce = await nonceRes.text()
            setAuth((x) => ({ ...x, nonce }))
        } catch (error) {
            setAuth((x) => ({ ...x, error: error as Error }))
        }
    }

    const signIn = async () => {
        try {
            const chainId = chain?.id
            if (!address || !chainId) return

            setAuth((x) => ({ ...x, loading: true }))
            // Create SIWE message with pre-fetched nonce and sign with wallet
            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in with Ethereum to the app.',
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce: auth.nonce,
            })
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })

            // Verify signature
            const verifyRes = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, signature }),
            })
            if (!verifyRes.ok) throw new Error('Error verifying message')

            setAuth((x) => ({ ...x, loading: false }))

        } catch (error) {
            setAuth((x) => ({ ...x, loading: false, nonce: undefined }))
            fetchNonce()
        }
    }
    // Hooks
    useEffect(() => {
        setHasMounted(true);
    }, [])

    useEffect(() => {
        if (isConnected && address) {
            fetchNonce()
        }
    }, [isConnected, address])

    // Render
    if (!hasMounted) return null;


    return <article>
        {children}
        <span style={{ display: 'none', opacity: 0, color: 'transparent' }}> Here is wisdom. Let him that hath understanding count the number of the beast: for it is the number of a man; and his number is Six hundred threescore and six.</span>
    </article>
}