import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminGetListings } from '@/lib/listings'
import AdminShell from '@/components/admin/AdminShell'
import AdminListingsTable from '@/components/admin/AdminListingsTable'

export const metadata = { title: 'All Listings | Kashmir Student 4 Admin' }
export const revalidate = 0

export default async function AdminListingsPage() {
  const cookieStore = cookies()
  const _secret = process.env.ADMIN_SECRET_KEY
  if (!_secret || cookieStore.get('ks_admin_token')?.value !== _secret) redirect('/admin/login')
  const adminUserCookie = cookieStore.get('ks_admin_user')?.value
  const adminUser = adminUserCookie ? JSON.parse(adminUserCookie) : { name: 'Admin', role: 'super_admin' }
  let listings: any[] = []
  try { listings = await adminGetListings() } catch {}

  return (
    <AdminShell currentPage="listings" adminUser={adminUser}>
      <AdminListingsTable listings={listings} />
    </AdminShell>
  )
}
