import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import AdminGenericPage from '@/components/admin/AdminGenericPage'

export const metadata = { title: 'profile | Kashmir Student 4 Admin' }

export default function Page() {
  const cookieStore = cookies()
  const _secret = process.env.ADMIN_SECRET_KEY
  if (!_secret || cookieStore.get('ks_admin_token')?.value !== _secret) redirect('/admin/login')
  const adminUserCookie = cookieStore.get('ks_admin_user')?.value
  const adminUser = adminUserCookie ? JSON.parse(adminUserCookie) : { name: 'Admin', role: 'super_admin' }
  return (
    <AdminShell currentPage="profile" adminUser={adminUser}>
      <AdminGenericPage page="profile" />
    </AdminShell>
  )
}
