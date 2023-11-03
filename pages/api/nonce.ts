
import { getUser } from '@/lib/auth';
import getDatabase from '@/lib/firebase';
import firebaseAdminInit from '@/lib/firebase';
import { getFirestore } from 'firebase-admin/firestore';
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      const { address } = req.query
      const db = getDatabase()
      const nonce = generateNonce()


      try {
        const user = await getUser(address)
        if (!user.id) {
          const doc = await db.collection('users').add({ address, nonce })

        } else {
          const doc = await db.collection('users').doc(user.id).set({ nonce })

        }
      } catch (error) {
        console.log(error);
      };

      res.setHeader('Content-Type', 'text/plain')
      res.send(nonce)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

