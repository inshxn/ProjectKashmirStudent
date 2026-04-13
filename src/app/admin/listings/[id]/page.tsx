import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import AdminAddListingForm from '@/components/admin/AdminAddListingForm'
import { adminGetListingById } from '@/lib/listings'

export const metadata = { title: 'Edit Listing | Kashmir Student Admin' }
export const revalidate = 0

interface Props {
  params: { id: string }
}

export default async function AdminEditListingPage({ params }: Props) {
  const cookieStore = cookies()
  const _secret = process.env.ADMIN_SECRET_KEY
  if (!_secret || cookieStore.get('ks_admin_token')?.value !== _secret) {
    redirect('/admin/login')
  }

  const adminUserCookie = cookieStore.get('ks_admin_user')?.value
  let adminUser = { name: 'Admin', role: 'super_admin', username: 'admin' }
  try {
    if (adminUserCookie) adminUser = JSON.parse(adminUserCookie)
  } catch {}

  let listing = null
  try {
    listing = await adminGetListingById(params.id)
  } catch {}

  if (!listing) {
    redirect('/admin/listings')
  }

  return (
    <AdminShell currentPage="listings" adminUser={adminUser}>
      <AdminAddListingForm initialData={listing} />
    </AdminShell>
  )
}
