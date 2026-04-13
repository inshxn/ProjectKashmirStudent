import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import AdminAddListingForm from '@/components/admin/AdminAddListingForm'

export const metadata = { title: 'Add New Listing | Kashmir Student 4 Admin' }

export default function AdminAddListingPage() {
  const cookieStore = cookies()
  const _secret = process.env.ADMIN_SECRET_KEY
  if (!_secret || cookieStore.get('ks_admin_token')?.value !== _secret) redirect('/admin/login')
  const adminUserCookie = cookieStore.get('ks_admin_user')?.value
  const adminUser = adminUserCookie ? JSON.parse(adminUserCookie) : { name: 'Admin', role: 'super_admin' }
  return (
    <AdminShell currentPage="add-listing" adminUser={adminUser}>
      <AdminAddListingForm />
    </AdminShell>
  )
}
