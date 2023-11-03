// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getDatabase from '@/lib/firebase'
import firebaseAdminInit from '@/lib/firebase'
import { getFirestore } from 'firebase-admin/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const db = getDatabase()
        const { message, signature, address } = req.body
        const siweMessage = new SiweMessage(message)
        const fields = await siweMessage.verify({ signature })


        const nonce = ''//getNonce(address);
        if (fields.data.nonce !== nonce)
          return res.status(422).json({ message: 'Invalid nonce.' })

        //req.session.siwe = fields
        //const token = j
        //saveToken(token)
        res.json({ ok: true, })
      } catch (_error) {
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
