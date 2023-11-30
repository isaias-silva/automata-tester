export interface Iuser {
    name: string,
    password: string,
    email: string,
    adm: boolean,
    active: boolean,
    plan_duration: number,
    date_of_begginner: string,
    phone_number: string,
    profile: string,
    active_mail: boolean,
    code: string,
   cobrance_id?:string,
    situation: 'active'|'load payment'
  
    plan: 'test' | 'subscribe'
    planId?: string,
    cpf: string
  }