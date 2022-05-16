import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { authConfig, db } from "../environment/firebase-config"
import { TProduct } from "../types"

export const login = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(authConfig, email, password)
} 

export const register = async (email: string, password: string): Promise<void> => {
  const res = await createUserWithEmailAndPassword(authConfig, email, password)
  await addDoc(collection(db, 'users'), { user: res.user.uid })
} 

export const logout = async (): Promise<void> => {
  await authConfig.signOut()
} 

export const create = async (product: TProduct): Promise<void> => {
  await addDoc(collection(db, 'products'), product)
}

export const read = async (userId: string): Promise<TProduct[]> => {
  const q = query(
    collection(db, 'products'),
    where('ref', '==', userId),
    orderBy('name', 'asc')
  )
  const { docs } = await getDocs(q)
  const products = docs.map(doc => ({ id: doc.id, ...doc.data() })) as TProduct[]
  return products
}

export const update = async (product: TProduct): Promise<void> => {
  await updateDoc(doc(db, 'products', product.id as string), product)
}

export const destroy = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'products', id))
}
