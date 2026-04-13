'use client'
import Link from 'next/link'
import { useState } from 'react'

interface Props { page: string }

export default function AdminGenericPage({ page }: Props) {
  const [saving, setSaving] = useState(false)

  function toast(msg: string) {
    const el = document.createElement('div')
    el.textContent = msg
    el.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0a2218;color:#fff;padding:12px 20px;border-radius:10px;font-size:13.5px;font-weight:500;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.2);animation:fadeIn .2s ease'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2800)
  }

  if (page === 'categories') return (
    <>
      <div className="flex items-start justify-between mb-5">
        <div><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">Categories & Tags</h1><p className="text-[13px] text-[#4a6355] mt-0.5">Manage listing categories and searchable tags</p></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#dde8e2] font-bold text-[14px] text-[#0a2218]">📂 Categories</div>
          <table className="w-full">
            <thead><tr className="bg-[#f7faf8]">{['Icon','Category','Listings','Actions'].map(h=><th key={h} className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#7a9e8a] border-b border-[#dde8e2]">{h}</th>)}</tr></thead>
            <tbody>
              {[{cat:'admissions',icon:'🎓',count:6},{cat:'scholarships',icon:'💰',count:4},{cat:'jobs',icon:'💼',count:5},{cat:'internships',icon:'🧪',count:3}].map(c=>(
                <tr key={c.cat} className="border-b border-[#f5f9f6] last:border-0 hover:bg-[#f9fbfa]">
                  <td className="px-4 py-3 text-xl">{c.icon}</td>
                  <td className="px-4 py-3"><span className={`chip-${c.cat} text-[11px]`}>{c.cat}</span></td>
                  <td className="px-4 py-3 text-[13px] text-[#7a9e8a]">{c.count} listings</td>
                  <td className="px-4 py-3"><div className="flex gap-1.5">
                    <button onClick={()=>toast('Editing '+c.cat)} className="px-2.5 py-1 bg-[#eef2ff] text-[#4f46e5] text-[12px] font-semibold rounded-md hover:bg-[#4f46e5] hover:text-white transition-all">Edit</button>
                    <Link href={`/admin/listings?category=${c.cat}`} className="px-2.5 py-1 bg-[#e8f5ee] text-[#0a2218] text-[12px] font-semibold rounded-md hover:bg-[#0a2218] hover:text-white transition-all">View All</Link>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-5 border-t border-[#f5f9f6]">
            <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5">New Category Name</label>
            <input className="w-full px-3 py-2.5 border-[1.5px] border-[#dde8e2] rounded-lg text-[13.5px] outline-none focus:border-[#0a2218] mb-2" placeholder="e.g. Fellowships" />
            <button onClick={()=>toast('Category added ✓')} className="w-full py-2.5 bg-[#0a2218] text-white rounded-lg text-[13px] font-bold hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">Add Category</button>
          </div>
        </div>
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#dde8e2] font-bold text-[14px] text-[#0a2218]">🏷️ Popular Tags</div>
          <div className="p-5 flex flex-wrap gap-2 mb-3">
            {['JKPSC','NIT Srinagar','PMSSS','J&K Bank','Domicile','Engineering','IIT','JEE','Google','Microsoft','TCS','Infosys','MBA','MBBS','Government','Scholarship','Fresher','IT','B.Tech','MCA','B.Com','Srinagar','Jammu','Pan India'].map(t=>(
              <span key={t} onClick={()=>toast('Filter by: '+t)} className="px-2.5 py-1.5 bg-[#e8f5ee] text-[#0a2218] rounded-lg text-[12.5px] font-medium cursor-pointer hover:bg-[#0a2218] hover:text-white transition-all">{t}</span>
            ))}
          </div>
          <div className="p-5 border-t border-[#f5f9f6]">
            <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5">Add New Tag</label>
            <input className="w-full px-3 py-2.5 border-[1.5px] border-[#dde8e2] rounded-lg text-[13.5px] outline-none focus:border-[#0a2218] mb-2" placeholder="e.g. CUET, B.Ed, Law" />
            <button onClick={()=>toast('Tag added ✓')} className="w-full py-2.5 bg-[#0a2218] text-white rounded-lg text-[13px] font-bold hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">Add Tag</button>
          </div>
        </div>
      </div>
    </>
  )

  if (page === 'featured') return (
    <>
      <div className="mb-5"><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">Featured Manager</h1><p className="text-[13px] text-[#4a6355] mt-0.5">Control which listings appear in the homepage featured section</p></div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#dde8e2] font-bold text-[14px] text-[#0a2218]">⭐ Currently Featured</div>
          <table className="w-full">
            <thead><tr className="bg-[#f7faf8]">{['#','Listing','Category','Action'].map(h=><th key={h} className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#7a9e8a] border-b border-[#dde8e2]">{h}</th>)}</tr></thead>
            <tbody>
              {[{t:'JKPSC KAS 2025',c:'jobs'},{t:'NIT Srinagar B.Tech 2025',c:'admissions'},{t:'J&K PMSSS Scholarship',c:'scholarships'},{t:'J&K Bank PO 2025',c:'jobs'}].map((l,i)=>(
                <tr key={i} className="border-b border-[#f5f9f6] last:border-0"><td className="px-4 py-3 text-[#7a9e8a] text-sm">⠿ #{i+1}</td><td className="px-4 py-3 font-semibold text-[13.5px] text-[#0a2218]">{l.t}</td><td className="px-4 py-3"><span className={`chip-${l.c} text-[11px]`}>{l.c}</span></td>
                <td className="px-4 py-3"><button onClick={()=>toast('Removed from featured')} className="px-2.5 py-1 bg-[#fff0f3] text-red-600 text-[12px] font-semibold rounded-md hover:bg-red-600 hover:text-white transition-all">Remove ✕</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#dde8e2] font-bold text-[14px] text-[#0a2218]">📋 Add to Featured</div>
          <table className="w-full">
            <thead><tr className="bg-[#f7faf8]">{['Listing','Views','Action'].map(h=><th key={h} className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#7a9e8a] border-b border-[#dde8e2]">{h}</th>)}</tr></thead>
            <tbody>
              {[{t:'Google SWE Intern 2025',v:'6.5K',c:'internships'},{t:'IIM Bangalore PGDM',v:'2.8K',c:'admissions'},{t:'TCS Digital Hiring',v:'4.2K',c:'jobs'},{t:'PM Scholarship 2025',v:'3.2K',c:'scholarships'}].map((l,i)=>(
                <tr key={i} className="border-b border-[#f5f9f6] last:border-0"><td className="px-4 py-3"><div className="font-semibold text-[13.5px] text-[#0a2218]">{l.t}</div><span className={`chip-${l.c} text-[10px] mt-1 inline-block`}>{l.c}</span></td>
                <td className="px-4 py-3 text-[13px] text-[#7a9e8a]">{l.v}</td>
                <td className="px-4 py-3"><button onClick={()=>toast('Added to featured ⭐')} className="px-2.5 py-1 bg-[#e8f5ee] text-[#0a2218] text-[12px] font-semibold rounded-md hover:bg-[#0a2218] hover:text-white transition-all">+ Feature</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )

  if (page === 'deadlines') return (
    <>
      <div className="mb-5"><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">Deadline Tracker</h1></div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[{icon:'🔴',label:'Closing in 3 days',n:2,color:'#fff0f3',tc:'#e11d48'},{icon:'🟠',label:'Closing in 7 days',n:3,color:'#fef3c7',tc:'#d97706'},{icon:'🟢',label:'Active & healthy',n:13,color:'#dcfce7',tc:'#15803d'}].map(s=>(
          <div key={s.label} className="bg-white border border-[#dde8e2] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{background:s.color}}>{s.icon}</div>
            <div><div style={{fontFamily:'"DM Serif Display",serif',color:s.tc}} className="text-[22px] leading-none">{s.n}</div><div className="text-[12px] text-[#7a9e8a] mt-0.5">{s.label}</div></div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#dde8e2] flex items-center justify-between">
          <h3 className="font-bold text-[14px] text-[#0a2218]">All Deadlines — Sorted by Urgency</h3>
          <button onClick={()=>toast('Deadline report exported 📥')} className="text-[13px] font-semibold text-[#0a2218] border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-[#e8f5ee] transition-all">📥 Export</button>
        </div>
        <p className="px-5 py-4 text-[13.5px] text-[#4a6355]">Connect to Supabase to see live deadline data. The deadline tracker reads from the <code className="bg-[#f0f4f2] px-1.5 py-0.5 rounded text-[#0a2218] text-[12px]">listings</code> table and sorts by <code className="bg-[#f0f4f2] px-1.5 py-0.5 rounded text-[#0a2218] text-[12px]">last_date</code> ascending.</p>
      </div>
    </>
  )

  if (page === 'ai') return (
    <>
      <div className="mb-5"><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">AI Content Formatter</h1><p className="text-[13px] text-[#4a6355] mt-0.5">Paste raw text — AI extracts all structured fields in seconds</p></div>
      <div className="grid lg:grid-cols-[1fr_300px] gap-5">
        <div>
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden mb-4">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]"><span className="text-[17px]">📋</span><div><h3 className="text-[14px] font-bold text-[#0a2218]">Paste Raw Content</h3><p className="text-[12px] text-[#7a9e8a]">From official websites, PDFs, or notifications</p></div></div>
            <div className="p-5">
              <textarea id="ai-input" rows={7} className="w-full px-4 py-3 bg-[#f0f9f4] border-2 border-dashed border-[#9dc8b0] rounded-xl text-[13.5px] text-[#0a2218] outline-none focus:border-[#0a2218] focus:bg-white transition-all resize-y" placeholder="Paste raw text here...&#10;&#10;Example: JKPSC has released notification for KAS Combined Competitive Examination 2025. Total vacancies 54. Applications from eligible domicile holders of J&K. Age limit 21-40 years. Last date to apply 30 April 2025. Application fee Rs 600 for General, Rs 400 for SC/ST. Apply at jkpsc.nic.in" />
              <div className="flex gap-3 mt-3 flex-wrap items-center">
                <button id="ai-btn" onClick={()=>{
                  const btn=document.getElementById('ai-btn') as HTMLButtonElement
                  const out=document.getElementById('ai-out')
                  if(!btn||!out) return
                  const inp=(document.getElementById('ai-input') as HTMLTextAreaElement)?.value.trim()
                  if(!inp){alert('Please paste some content first.');return}
                  btn.innerHTML='<span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle;margin-right:8px"></span>Analysing…'
                  btn.disabled=true
                  setTimeout(()=>{
                    out.innerHTML=`<div style="margin-top:16px"><div style="display:inline-flex;align-items:center;gap:8px;background:#dcfce7;border:1px solid #86efac;color:#15803d;padding:7px 14px;border-radius:99px;font-size:13px;font-weight:600;margin-bottom:14px">✓ Extraction Complete — review fields below</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${[['Title','JKPSC KAS Combined Competitive Exam 2025'],['Category','jobs'],['Organisation','J&K Public Service Commission'],['Location','Srinagar'],['Short Desc','KAS 2025 — 54 vacancies for Group A & B gazetted posts. J&K domicile required. Apply by 30 April 2025.'],['Fees','₹600 (General) | ₹400 (SC/ST)'],['Last Date','2025-04-30'],['Tags','JKPSC, KAS, Civil Services, J&K, Domicile, Government']].map(([k,v])=>`<div><div style="font-size:11px;font-weight:700;color:#7a9e8a;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">${k}</div><div style="padding:8px 12px;background:#e8f5ee;border:1px solid #b3d9c2;border-radius:7px;font-size:13px;color:#0a2218;font-weight:500">${v}</div></div>`).join('')}</div><div style="display:flex;gap:10px;margin-top:14px"><a href="/admin/add-listing" style="padding:10px 20px;background:#0a2218;color:#fff;border-radius:9px;font-size:13.5px;font-weight:700;text-decoration:none;transition:all .15s">Use These Fields →</a><button onclick="document.getElementById('ai-out').innerHTML='';document.getElementById('ai-input').value=''" style="padding:10px 18px;border:1.5px solid #dde8e2;border-radius:9px;font-size:13.5px;font-weight:600;background:#fff;cursor:pointer">Clear</button></div></div>`
                    btn.innerHTML='🤖 Extract Fields with AI'
                    btn.disabled=false
                  },1800)
                }} className="px-5 py-2.5 bg-[#0a2218] text-white rounded-xl text-[13.5px] font-bold hover:bg-[#e8861a] hover:text-[#0a2218] transition-all disabled:opacity-60">🤖 Extract Fields with AI</button>
                <span className="text-[12px] text-[#7a9e8a]">ℹ️ Always review before publishing</span>
              </div>
              <div id="ai-out" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden sticky top-5">
          <div className="px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6] font-bold text-[13px] text-[#0a2218]">💡 Tips</div>
          <div className="p-4 space-y-3">
            {[['📄','Copy directly from official notification PDFs'],['🌐','Paste from official websites for cleanest data'],['✅','Always verify dates before publishing'],['🔗','Add apply link manually — AI cannot access URLs'],['🏷️','Review tags and add J&K-specific ones']].map(([icon,tip])=>(
              <div key={tip as string} className="flex gap-2.5 items-start py-2.5 border-b border-[#f5f9f6] last:border-0">
                <span className="text-[17px] shrink-0">{icon}</span>
                <span className="text-[13px] text-[#4a6355] leading-snug">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )

  if (page === 'seo') return (
    <>
      <div className="mb-5"><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">SEO Tools</h1></div>
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {[{score:92,title:'JKPSC KAS 2025',ok:true},{score:88,title:'J&K PMSSS Scholarship',issue:'Meta description short'},{score:76,title:'NIT Srinagar B.Tech',issue:'Slug too long'},{score:95,title:'J&K Bank PO 2025',ok:true}].map(s=>(
          <div key={s.title} className="bg-white border border-[#dde8e2] rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full border-3 flex items-center justify-center font-bold text-[15px]" style={{border:`3px solid ${s.score>=90?'#15803d':s.score>=75?'#ca8a04':'#e11d48'}`,color:s.score>=90?'#15803d':s.score>=75?'#ca8a04':'#e11d48'}}>{s.score}</div>
              <div><div className="font-semibold text-[14px] text-[#0a2218]">{s.title}</div><div className={`text-[12px] mt-0.5 ${(s as any).issue ? 'text-amber-600' : 'text-green-600'}`}>{(s as any).issue || '✓ All good'}</div></div>
            </div>
            {(s as any).issue && <div className="text-[12.5px] text-amber-700 bg-amber-50 px-3 py-2 rounded-lg mb-3">⚠️ {(s as any).issue}</div>}
            <button onClick={()=>toast('SEO analysis for '+s.title+' complete')} className="w-full py-2 border border-[#dde8e2] rounded-lg text-[13px] font-semibold text-[#0a2218] hover:bg-[#e8f5ee] transition-all">Analyse →</button>
          </div>
        ))}
      </div>
      <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]"><span className="text-[17px]">🗺️</span><div><h3 className="text-[14px] font-bold text-[#0a2218]">Sitemap & Indexing</h3></div></div>
        <div className="p-5 flex gap-3 flex-wrap">
          {[['🗺️ Regenerate Sitemap','Sitemap regenerated — 18 URLs'],['🔍 Submit to Google','Submitted to Google Search Console'],['📋 Validate Schema','Schema markup validated ✓'],['🤖 Edit Robots.txt','Robots.txt updated']].map(([label,msg])=>(
            <button key={label as string} onClick={()=>toast(msg as string)} className="px-4 py-2.5 border border-[#dde8e2] rounded-lg text-[13px] font-semibold text-[#0a2218] bg-white hover:bg-[#e8f5ee] transition-all">{label}</button>
          ))}
        </div>
      </div>
    </>
  )

  if (page === 'users') return (
    <>
      <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
        <div><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">Users</h1><p className="text-[13px] text-[#4a6355] mt-0.5">Registered users and admin accounts</p></div>
        <button onClick={()=>toast('Add Admin modal — connect auth system')} className="text-[13px] font-bold bg-[#0a2218] text-white px-3 py-2 rounded-lg hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">+ Add Admin</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[{icon:'👥',label:'Total Users',n:247,c:'green'},{icon:'📖',label:'Total Bookmarks',n:1842,c:'blue'},{icon:'📍',label:'Districts',n:12,c:'orange'},{icon:'🛡️',label:'Admins',n:2,c:'purple'}].map(s=>(
          <div key={s.label} className="bg-white border border-[#dde8e2] rounded-2xl p-4"><div className="text-[20px] mb-2">{s.icon}</div><div style={{fontFamily:'"DM Serif Display",serif'}} className="text-[26px] text-[#0a2218] leading-none">{s.n}</div><div className="text-[12px] text-[#7a9e8a] mt-1">{s.label}</div></div>
        ))}
      </div>
      <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#dde8e2] font-bold text-[14px] text-[#0a2218]">Recent Users</div>
        <table className="w-full">
          <thead><tr className="bg-[#f7faf8]">{['Name','Email','Location','Bookmarks','Joined','Actions'].map(h=><th key={h} className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#7a9e8a] border-b border-[#dde8e2]">{h}</th>)}</tr></thead>
          <tbody>
            {[{n:'Aadil Bashir',e:'aadil@example.com',l:'Srinagar',b:12,j:'2025-03-01'},{n:'Farzana Mir',e:'farzana@example.com',l:'Anantnag',b:8,j:'2025-03-05'},{n:'Tariq Rather',e:'tariq@example.com',l:'Baramulla',b:21,j:'2025-03-08'},{n:'Rubina Jan',e:'rubina@example.com',l:'Jammu',b:5,j:'2025-03-10'},{n:'Bilal Ahmed',e:'bilal@example.com',l:'Srinagar',b:16,j:'2025-03-12'}].map((u,i)=>(
              <tr key={i} className="border-b border-[#f5f9f6] last:border-0 hover:bg-[#f9fbfa]">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-[#e8f5ee] text-[#0a2218] text-[11px] font-bold flex items-center justify-center">{u.n.split(' ').map((x:string)=>x[0]).join('')}</div><span className="font-semibold text-[13.5px] text-[#0a2218]">{u.n}</span></div></td>
                <td className="px-4 py-3 text-[13px] text-[#7a9e8a]">{u.e}</td>
                <td className="px-4 py-3 text-[13px] text-[#7a9e8a]">{u.l}</td>
                <td className="px-4 py-3"><span className={`inline-block px-2.5 py-1 rounded text-[12px] font-semibold ${u.b>15?'bg-green-100 text-green-700':u.b>5?'bg-amber-100 text-amber-700':'bg-slate-100 text-slate-500'}`}>{u.b}</span></td>
                <td className="px-4 py-3 text-[12.5px] text-[#7a9e8a]">{u.j}</td>
                <td className="px-4 py-3"><button onClick={()=>toast('User banned (demo)')} className="px-2.5 py-1 bg-[#fff0f3] text-red-600 text-[12px] font-semibold rounded-md hover:bg-red-600 hover:text-white transition-all">Ban</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )

  if (page === 'settings') return (
    <>
      <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
        <div><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">Settings</h1></div>
        <button onClick={()=>{setSaving(true);setTimeout(()=>{setSaving(false);toast('Settings saved ✓')},700)}} className="text-[13px] font-bold bg-[#0a2218] text-white px-4 py-2 rounded-lg hover:bg-[#e8861a] hover:text-[#0a2218] transition-all disabled:opacity-60" disabled={saving}>
          {saving?'Saving…':'Save All Changes'}
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]"><span>🌐</span><h3 className="text-[14px] font-bold text-[#0a2218]">Site Info</h3></div>
            <div className="p-5 space-y-3">
              {[['Site Name','Kashmir Student'],['Tagline',"Kashmir's #1 Student Portal"],['Admin Email','admin@kashmirstudent.in'],['Site URL','https://kashmirstudent.in']].map(([l,v])=>(
                <div key={l as string}><label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5">{l}</label><input defaultValue={v} className="w-full px-3 py-2.5 border-[1.5px] border-[#dde8e2] rounded-lg text-[13.5px] outline-none focus:border-[#0a2218] transition-colors" /></div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]"><span>🔔</span><h3 className="text-[14px] font-bold text-[#0a2218]">Notifications</h3></div>
            <div className="p-5">
              {[{l:'Email alerts for expiring deadlines',s:'Send 3 days before last date',on:true},{l:'New user registrations',s:'Alert when users sign up',on:false},{l:'Weekly summary report',s:'Every Monday 9 AM',on:true}].map((t,i)=>(
                <div key={i} className={`flex items-center justify-between py-3 ${i>0?'border-t border-[#f5f9f6]':''}`}>
                  <div><div className="text-[13.5px] font-medium text-[#0a2218]">{t.l}</div><div className="text-[11.5px] text-[#7a9e8a]">{t.s}</div></div>
                  <ToggleSwitch defaultOn={t.on} onChange={(v)=>toast((v?'Enabled':'Disabled')+': '+t.l)} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]"><span>🔒</span><h3 className="text-[14px] font-bold text-[#0a2218]">Security</h3></div>
            <div className="p-5">
              {[{l:'Two-factor authentication',s:'Extra security for admin login',on:false},{l:'Login activity log',s:'Track all admin sign-ins',on:true},{l:'Auto-logout after 24h',s:'Require re-login daily',on:true}].map((t,i)=>(
                <div key={i} className={`flex items-center justify-between py-3 ${i>0?'border-t border-[#f5f9f6]':''}`}>
                  <div><div className="text-[13.5px] font-medium text-[#0a2218]">{t.l}</div><div className="text-[11.5px] text-[#7a9e8a]">{t.s}</div></div>
                  <ToggleSwitch defaultOn={t.on} onChange={(v)=>toast((v?'Enabled':'Disabled')+': '+t.l)} />
                </div>
              ))}
              <div className="border-t border-[#f5f9f6] pt-4 mt-1 space-y-2">
                <button onClick={()=>toast('Password changed ✓')} className="w-full py-2.5 border border-[#dde8e2] rounded-lg text-[13px] font-semibold text-[#0a2218] hover:bg-[#e8f5ee] transition-all">🔒 Change Admin Password</button>
                <button onClick={()=>toast('Cache cleared ✓')} className="w-full py-2.5 border border-[#dde8e2] rounded-lg text-[13px] font-semibold text-[#7a9e8a] hover:bg-[#f5f9f6] transition-all">🧹 Clear Site Cache</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  if (page === 'profile') return (
    <>
      <div className="mb-5"><h1 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218]">My Profile</h1></div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]"><span>👤</span><h3 className="text-[14px] font-bold text-[#0a2218]">Account Details</h3></div>
          <div className="p-5">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#f5f9f6]">
              <div className="w-16 h-16 rounded-full bg-[#0a2218] text-white text-[24px] font-bold flex items-center justify-center border-[3px] border-[#dde8e2]" style={{fontFamily:'"DM Serif Display",serif'}}>AD</div>
              <div><div className="text-[18px] font-bold text-[#0a2218]">Admin User</div><div className="text-[13px] text-[#7a9e8a]">Super Admin</div><div className="text-[12px] text-green-600 mt-1">● Active</div></div>
            </div>
            <div className="space-y-3">
              {[['Full Name','Admin User'],['Username','admin'],['Email','admin@kashmirstudent.in']].map(([l,v])=>(
                <div key={l as string}><label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5">{l}</label><input defaultValue={v} className="w-full px-3 py-2.5 border-[1.5px] border-[#dde8e2] rounded-lg text-[13.5px] outline-none focus:border-[#0a2218] transition-colors" /></div>
              ))}
              <button onClick={()=>toast('Profile updated ✓')} className="w-full py-3 bg-[#0a2218] text-white rounded-xl text-[14px] font-bold hover:bg-[#e8861a] hover:text-[#0a2218] transition-all mt-2">💾 Save Changes</button>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]"><span>🔑</span><h3 className="text-[14px] font-bold text-[#0a2218]">Change Password</h3></div>
          <div className="p-5 space-y-3">
            {[['Current Password','Current password'],['New Password','Min 8 characters'],['Confirm New Password','Repeat new password']].map(([l,p])=>(
              <div key={l as string}><label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5">{l}</label><input type="password" placeholder={p as string} className="w-full px-3 py-2.5 border-[1.5px] border-[#dde8e2] rounded-lg text-[13.5px] outline-none focus:border-[#0a2218] transition-colors" /></div>
            ))}
            <button onClick={()=>toast('Password changed ✓')} className="w-full py-2.5 bg-[#0a2218] text-white rounded-xl text-[14px] font-bold hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">Update Password</button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">🚧</div>
      <h2 style={{fontFamily:'"DM Serif Display",serif'}} className="text-[24px] text-[#0a2218] mb-2">{page.charAt(0).toUpperCase()+page.slice(1)}</h2>
      <p className="text-[13.5px] text-[#4a6355] mb-6">This section is under development.</p>
      <Link href="/admin/dashboard" className="px-5 py-2.5 bg-[#0a2218] text-white rounded-xl text-[13px] font-bold hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">← Back to Dashboard</Link>
    </div>
  )
}

function ToggleSwitch({ defaultOn, onChange }: { defaultOn: boolean; onChange: (v: boolean) => void }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button onClick={() => { setOn(!on); onChange(!on) }}
      className="w-10 h-5 rounded-full relative transition-colors shrink-0"
      style={{ background: on ? '#0a2218' : '#dde8e2' }}>
      <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" style={{ left: on ? '22px' : '2px' }} />
    </button>
  )
}
