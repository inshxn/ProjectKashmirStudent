import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminGetListings } from '@/lib/listings'
import AdminShell from '@/components/admin/AdminShell'
import AdminDashboardContent from '@/components/admin/AdminDashboardContent'

export const metadata = { title: 'Dashboard | Kashmir Student Admin' }
export const revalidate = 0

export default async function AdminDashboardPage() {
  const cookieStore = cookies()
  const adminToken = cookieStore.get('ks_admin_token')?.value

  // Guard: must have valid token matching ADMIN_SECRET_KEY env var
  const secretKey = process.env.ADMIN_SECRET_KEY
  if (!secretKey || adminToken !== secretKey) {
    redirect('/admin/login')
  }

  const adminUserCookie = cookieStore.get('ks_admin_user')?.value
  let adminUser = { name: 'Admin', role: 'super_admin', username: 'admin' }
  try {
    if (adminUserCookie) adminUser = JSON.parse(adminUserCookie)
  } catch {}

  let listings: any[] = []
  try { listings = await adminGetListings() } catch {}

  return (
    <AdminShell currentPage="dashboard" adminUser={adminUser}>
      <AdminDashboardContent listings={listings} adminUser={adminUser} />
    </AdminShell>
  )
}
