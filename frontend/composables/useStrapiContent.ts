import { newsEditorFields } from '~/shared/newsEditorFields'
import type {
  CapabilityModule,
  ProjectCase,
  SectorBlueprint,
  ContactInquiry,
  StrapiNewsItem,
  StrapiPortfolioItem,
  StrapiProductItem
} from '~/types/strapi'

export const useStrapiContent = () => {
  const config = useRuntimeConfig()
  const strapiUrl = config.public.strapiUrl

  // -------------------------------------------------------------
  // MOCK DATA: พร้อมใช้งานทันทีในเฟสแรกโดยไม่ต้องรอเปิด Strapi Backend
  // -------------------------------------------------------------
  const mockCapabilities: CapabilityModule[] = [
    {
      code: '01',
      title: 'Enterprise AI & Autonomous Workflows',
      description: 'วางระบบผู้ช่วย AI อัจฉริยะที่เชื่อมต่อกับฐานข้อมูลภายในองค์กร ช่วยวิเคราะห์ยอดขาย ตอบคำถามลูกค้าเชิงลึก และตัดสินใจทางธุรกิจแบบอัตโนมัติ 24 ชั่วโมง',
      tags: ['LLM Integration', 'Predictive Ops', 'RAG Pipeline'],
      archLayer: '[ARCH_LAYER: NEURAL_AUTOMATION_V4 // LATENCY < 18ms]',
      icon: 'BrainCircuit'
    },
    {
      code: '02',
      title: 'Interactive 3D & Spatial Web Experiences',
      description: 'เปลี่ยนหน้าเว็บธรรมดาให้กลายเป็นพื้นที่ 3 มิติแบบโต้ตอบได้ (WebGL / Three.js) สร้างการจดจำแบรนด์ที่เหนือกว่าคู่แข่งและเพิ่มระยะเวลาการมีส่วนร่วมของผู้ใช้',
      tags: ['Three.js / Shaders', 'Kinetic Typography', '60fps Motion'],
      archLayer: '[ARCH_LAYER: WEBGL_SHADER_PIPELINE // 60-120 FPS]',
      icon: 'Box'
    },
    {
      code: '03',
      title: 'High-Contrast Green Cloud Infrastructure',
      description: 'สถาปัตยกรรมคลาวด์ความเร็วสูงที่รองรับการขยายตัวแบบไร้ขีดจำกัด พร้อมระบบความปลอดภัยระดับ Zero-Trust และใช้พลังงานสะอาด 100% เพื่อองค์กรยุคยั่งยืน',
      tags: ['Edge Deployment', 'Zero-Trust Auth', 'Carbon Neutral'],
      archLayer: '[ARCH_LAYER: EDGE_COMPUTE_MESH // GREEN_ENERGY]',
      icon: 'ShieldCheck'
    },
    {
      code: '04',
      title: 'Real-Time Executive Telemetry & BI',
      description: 'รวมศูนย์ข้อมูลทุกแผนกไว้ในหน้าจอควบคุมเดียว เห็นแนวโน้มกำไร ต้นทุน และพฤติกรรมลูกค้าแบบเรียลไทม์ เพื่อการตัดสินใจที่แม่นยำและฉับไวที่สุด',
      tags: ['Real-Time Stream', 'Executive Dash', 'ROI +240%'],
      archLayer: '[ARCH_LAYER: REALTIME_TELEMETRY_BI // ROI +240%]',
      icon: 'Activity',
      isHighlighted: true
    }
  ]

  const mockCases: ProjectCase[] = [
    {
      caseNumber: 'CASE // 001',
      sector: 'FINTECH INFRASTRUCTURE',
      title: 'AETHER PAY — ระบบชำระเงินข้ามประเทศความเร็วแสง',
      description: 'ออกแบบแพลตฟอร์มการเงินและระบบ AI ตรวจสอบธุรกรรมแบบเรียลไทม์ รองรับธุรกรรมกว่า 50,000 รายการต่อวินาที',
      metric: '0.02s',
      metricLabel: 'SETTLEMENT LATENCY',
      year: '2026'
    },
    {
      caseNumber: 'CASE // 002',
      sector: '3D DIGITAL TWIN',
      title: 'KINETIC GRID — คลังสินค้าอัจฉริยะจำลอง 3 มิติ',
      description: 'สร้างระบบ Digital Twin 3 มิติบนเว็บเบราว์เซอร์ ให้ผู้บริหารมองเห็นสถานะสินค้าและหุ่นยนต์ขนส่งทั่วประเทศแบบเรียลไทม์',
      metric: '-38%',
      metricLabel: 'LOGISTICS OVERHEAD',
      year: '2026'
    },
    {
      caseNumber: 'CASE // 003',
      sector: 'SPATIAL COMMERCE',
      title: 'FLORA TECH — แพลตฟอร์มค้าปลีกอัจฉริยะระดับโลก',
      description: 'ยกระดับประสบการณ์การช้อปปิ้งด้วยระบบแนะนำสินค้าด้วย AI รายบุคคลและอินเทอร์เฟซที่ลื่นไหลระดับ 60fps',
      metric: '+210%',
      metricLabel: 'CONVERSION GROWTH',
      year: '2026'
    },
    {
      caseNumber: 'NEXT // YOUR BRAND',
      sector: 'COLLABORATION',
      title: 'พร้อมสร้างปรากฏการณ์ใหม่ให้ธุรกิจของคุณหรือยัง?',
      description: 'ร่วมงานกับทีมสถาปนิกซอฟต์แวร์และนักออกแบบเชิงทดลองของเรา เพื่อเปลี่ยนวิสัยทัศน์ให้เป็นจริง',
      metric: 'JOIN US',
      metricLabel: 'GET STARTED',
      year: '2026',
      isCta: true
    }
  ]

  const mockSectorBlueprints: Record<string, SectorBlueprint> = {
    fintech: {
      key: 'fintech',
      title: 'Quantum Risk Engine & Autonomous FinTech Core',
      description: 'สถาปัตยกรรมประมวลผลธุรกรรมความเร็วสูงผสานโมเดล AI ตรวจจับความผิดปกติแบบเรียลไทม์ ลดขั้นตอนการอนุมัติเอกสารซ้ำซ้อน พร้อมแดชบอร์ดวิเคราะห์กระแสเงินสดสำหรับผู้บริหาร',
      baseRoi: 215,
      baseCost: 48
    },
    commerce: {
      key: 'commerce',
      title: 'Spatial 3D Commerce & Hyper-Personalization AI',
      description: 'แพลตฟอร์มค้าปลีกยุคใหม่ที่แสดงสินค้าแบบ 3D Interactive พร้อมระบบ AI วิเคราะห์พฤติกรรมผู้ซื้อรายบุคคลแบบเรียลไทม์ เพิ่มอัตราการปิดการขายและมูลค่าตะกร้าสินค้า',
      baseRoi: 195,
      baseCost: 36
    },
    logistics: {
      key: 'logistics',
      title: 'Predictive Supply Chain & Digital Twin Network',
      description: 'ระบบจำลองโครงข่ายขนส่งและคลังสินค้าแบบเรียลไทม์ ใช้ AI คำนวณเส้นทางประหยัดพลังงานสูงสุดและพยากรณ์ปริมาณสต็อกล่วงหน้าได้แม่นยำ',
      baseRoi: 180,
      baseCost: 44
    },
    saas: {
      key: 'saas',
      title: 'Multi-Tenant Cloud OS & Embedded AI Copilot',
      description: 'โครงสร้างพื้นฐานซอฟต์แวร์องค์กรที่ขยายตัวได้ไม่จำกัด มาพร้อมผู้ช่วย AI ฝังตัวในทุกหน้าจอเพื่อช่วยผู้ใช้งานทำงานเสร็จเร็วขึ้นหลายเท่าตัว',
      baseRoi: 240,
      baseCost: 52
    }
  }

  // Fetch Capabilities (Strapi API with Graceful Mock Fallback)
  const getCapabilities = async (): Promise<CapabilityModule[]> => {
    try {
      const res = await $fetch<{ data: any[] }>(`${strapiUrl}/api/capabilities?populate=*`, {
        timeout: 2000
      })
      if (res && res.data && res.data.length > 0) {
        return res.data.map(item => ({
          id: item.id,
          code: item.code || item.attributes?.code,
          title: item.title || item.attributes?.title,
          description: item.description || item.attributes?.description,
          tags: item.tags || item.attributes?.tags || [],
          archLayer: item.archLayer || item.attributes?.archLayer,
          icon: item.icon || item.attributes?.icon || 'Box',
          isHighlighted: item.isHighlighted || item.attributes?.isHighlighted
        }))
      }
    } catch {
      // Backend not yet up -> use typed mock data seamlessly
    }
    return mockCapabilities
  }

  // Fetch Case Studies
  const getCases = async (): Promise<ProjectCase[]> => {
    try {
      const res = await $fetch<{ data: any[] }>(`${strapiUrl}/api/cases?populate=*`, {
        timeout: 2000
      })
      if (res && res.data && res.data.length > 0) {
        return res.data.map(item => ({
          id: item.id,
          caseNumber: item.caseNumber || item.attributes?.caseNumber,
          sector: item.sector || item.attributes?.sector,
          title: item.title || item.attributes?.title,
          description: item.description || item.attributes?.description,
          metric: item.metric || item.attributes?.metric,
          metricLabel: item.metricLabel || item.attributes?.metricLabel,
          year: item.year || item.attributes?.year,
          isCta: item.isCta || item.attributes?.isCta
        }))
      }
    } catch {
      // Backend not yet up
    }
    return mockCases
  }

  const resolveMediaUrl = (mediaObj: any, fallback?: string): string => {
    const url = mediaObj?.url || mediaObj?.data?.attributes?.url
    if (url) {
      return url.startsWith('http') ? url : `${strapiUrl}${url}`
    }
    return fallback || '/images/news/igenco-iso29110-ceremony.jpg'
  }

  // Fetch News Articles from Strapi (with graceful fallback if backend is offline)
  const getNewsArticles = async (): Promise<StrapiNewsItem[] | null> => {
    try {
      const all: any[] = []
      for (let page = 1; ; page++) {
        const res = await $fetch<{ data: any[]; meta: { pagination: { pageCount: number } } }>(strapiUrl + '/api/news-articles', {
          cache: 'no-store',
          timeout: 2500,
          query: { populate: 'coverImage', sort: 'sortOrder:asc,createdAt:desc,id:desc', status: 'published', 'pagination[page]': page, 'pagination[pageSize]': 100 }
        })
        all.push(...res.data)
        if (page >= res.meta.pagination.pageCount) break
      }
      return all.map(item => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        category: item.category || '',
        date: item.dateText || '',
        readTime: item.readTime || '',
        excerpt: item.excerpt || '',
        content: item.content || '',
        image: item.coverImage?.url || item.coverImage?.data?.attributes?.url ? resolveMediaUrl(item.coverImage) : item.fallbackImageUrl || '',
        detail: item.detail && typeof item.detail === 'object' ? item.detail : null,
        ...newsEditorFields(item)
      }))
    } catch {
      // Strapi not yet reachable
    }
    return null
  }

  // Fetch iGenQ Portfolio Cases from Strapi
  const getPortfolioCases = async (): Promise<StrapiPortfolioItem[] | null> => {
    try {
      const res = await $fetch<{ data: any[] }>(`${strapiUrl}/api/portfolio-cases?populate=*&sort=id:asc`, {
        timeout: 2500
      })
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map(item => ({
          id: item.id,
          documentId: item.documentId,
          clientName: item.clientName,
          title: item.title,
          category: item.category || 'หน่วยงานราชการ',
          location: item.location || '',
          servicePoints: item.servicePoints || '',
          queueMode: item.queueMode || '',
          highlight: item.highlight || '',
          description: item.description || '',
          results: Array.isArray(item.results) ? item.results : [],
          tags: Array.isArray(item.tags) ? item.tags : [],
          image: resolveMediaUrl(item.image, item.fallbackImageUrl || '/images/products/igenq-poster-1.jpg')
        }))
      }
    } catch {
      // Strapi not yet reachable
    }
    return null
  }

  const mapProduct = (item: any): StrapiProductItem => ({
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    slug: item.slug,
    category: item.category || 'Enterprise Software',
    badge: item.badge || 'ENTERPRISE GRADE',
    shortDesc: item.shortDesc || '',
    fullDetails: item.fullDetails || '',
    features: Array.isArray(item.features) ? item.features : [],
    image: resolveMediaUrl(item.image, item.fallbackImageUrl || '/images/products/regist-ai-banner.png'),
    detailRoute: item.detailRoute || ''
  })

  const getProducts = async (): Promise<StrapiProductItem[] | null> => {
    try {
      const products: StrapiProductItem[] = []
      let page = 1
      let pageCount = 1
      do {
        const res = await $fetch<{ data: unknown[]; meta: { pagination: { pageCount: number } } }>(
          `${strapiUrl}/api/products`,
          {
            query: { populate: 'image', sort: 'sortOrder:asc,id:desc', status: 'published', 'pagination[page]': page, 'pagination[pageSize]': 100 },
            timeout: 2500
          }
        )
        products.push(...res.data.map(mapProduct))
        pageCount = res.meta.pagination.pageCount
        page++
      } while (page <= pageCount)
      return products
    } catch {
      return null
    }
  }

  // Submit Contact Form to Strapi Inquiries Collection
  const submitInquiry = async (payload: ContactInquiry): Promise<{ success: boolean; isLive: boolean; message: string }> => {
    try {
      await $fetch(`${strapiUrl}/api/inquiries`, {
        method: 'POST',
        body: {
          data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone || '',
            projectSummary: payload.projectSummary,
            blueprintSpec: payload.blueprintSpec || ''
          }
        },
        timeout: 3500
      })
      return { success: true, isLive: true, message: 'บันทึกข้อมูลส่งเข้าสู่ระบบหลังบ้าน (Strapi) สำเร็จแล้ว!' }
    } catch {
      return { success: true, isLive: false, message: 'ส่งข้อความสอบถามเรียบร้อยแล้ว (โหมดจำลอง Frontend)' }
    }
  }

  return {
    mockSectorBlueprints,
    getCapabilities,
    getCases,
    getNewsArticles,
    getPortfolioCases,
    getProducts,
    submitInquiry
  }
}
