export type IPrivacyPolicyItem = {
  id: number,
  slug: string
  version: number,
  category: string,
  updatedAt: number
  createdAt: number,
  description:string
  status: number | boolean
}

export type IPrivacyPolicyDetail = {
  id: number,
  slug: string,
  category: string,
  updatedAt: number
  createdAt: number,
  description: string,
  version: string | number,
  status: number | boolean,
}
