export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified'

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  source: string
  score: number
  status: LeadStatus
}

export interface Opportunity {
  id: string
  name: string
  stage: 'Prospecting' | 'Negotiation' | 'Closed Won' | 'Closed Lost'
  amount?: number
  accountName: string
}
