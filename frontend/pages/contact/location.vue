<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Train,
  Plane,
  Bus,
  Car,
  Compass,
  FileText,
  Map,
  Download,
  ZoomIn,
  X
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useLiveRefresh } from '~/composables/useLiveRefresh'
import { mergeContactPage, telDigits } from '~/shared/contactPage'

useHead({
  title: 'ตำแหน่งที่ตั้งและแผนที่สำนักงาน (Headquarters Location & Map) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'แผนที่และตำแหน่งที่ตั้งสำนักงานใหญ่ บริษัท ไอเจนโก้ จำกัด 89/35 อาคารจูเคี่ยวเล้ง ชั้น 3 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร โทร 0-2523-3559 หรือ 063-525-4850'
    }
  ]
})

const { showToast } = useTheme()

// ที่อยู่ ลิงก์แผนที่ เบอร์โทร และอีเมล ใช้ข้อมูลเดียวกับหน้าติดต่อเรา (แก้ได้จากแอดมิน แท็บ "หน้าติดต่อเรา")
const { getContactPage } = useStrapiContent()
const { data: fetchedContact, refresh: refreshContact } = await useAsyncData('contact-page-content', getContactPage)
const contact = computed(() => fetchedContact.value || mergeContactPage(null))
useLiveRefresh(async () => { await refreshContact() })
const companyAddress = computed(() => contact.value.address)
// ลิงก์หมุดพิกัดบริษัท ไอเจนโก้ จำกัด บน Google Maps (จากที่ผู้ใช้ระบุ)
const googleMapsPinUrl = computed(() => contact.value.mapUrl)
// ลิงก์นำทางอัตโนมัติจากตำแหน่งปัจจุบันของผู้ใช้มายังบริษัท ไอเจนโก้ จำกัด (Turn-by-Turn Navigation)
const googleMapsDirectionsUrl = computed(() => contact.value.directionsUrl)
const mapImagePath = '/images/contact/igenco-office-map.jpg'

const copiedAddress = ref(false)
const copiedPhone = ref<string | null>(null)
const activeMapTab = ref<'graphic' | 'google'>('graphic')
const isLightboxOpen = ref(false)

const copyToClipboard = (text: string, type: 'address' | 'phone') => {
  if (import.meta.client) {
    navigator.clipboard.writeText(text)
    if (type === 'address') {
      copiedAddress.value = true
      showToast('คัดลอกที่อยู่บริษัทเรียบร้อยแล้ว')
      setTimeout(() => { copiedAddress.value = false }, 2500)
    } else {
      copiedPhone.value = text
      showToast(`คัดลอกเบอร์โทร ${text} เรียบร้อยแล้ว`)
      setTimeout(() => { copiedPhone.value = null }, 2500)
    }
  }
}

const transitGuides = [
  {
    icon: Train,
    title: 'รถไฟฟ้าสายสีแดง (SRT Red Line)',
    desc: 'ลงสถานีดอนเมือง (Don Mueang Station) ต่อรถสาธารณะตามแนวถนนวิภาวดีรังสิตเพียง 5 นาที'
  },
  {
    icon: Plane,
    title: 'ใกล้สนามบินนานาชาติดอนเมือง',
    desc: 'เดินทางสะดวก อยู่ใกล้ท่าอากาศยานดอนเมือง เหมาะสำหรับการประสานงานและการเดินทางจากต่างจังหวัด'
  },
  {
    icon: Bus,
    title: 'รถโดยสารประจำทาง (ขสมก.)',
    desc: 'สาย 29, 59, 95ก, 504, 510, 555 หรือรถตู้สายรังสิต-จตุจักร วิ่งผ่านหน้าอาคาร'
  },
  {
    icon: Car,
    title: 'รถยนต์ส่วนบุคคล',
    desc: 'เดินทางบนถนนวิภาวดีรังสิต (ฝั่งขาออก มุ่งหน้าดอนเมือง/รังสิต) มีลานจอดรถรองรับผู้มาติดต่อภายในอาคาร'
  }
]

const landmarkSteps = [
  {
    step: '01',
    title: 'เดินทางบนถนนวิภาวดีรังสิต (ขาออก)',
    desc: 'มุ่งหน้าไปทางสนามบินดอนเมือง / รังสิต สังเกตป้ายบอกทางสะพานกลับรถเข้าฐานทัพอากาศ'
  },
  {
    step: '02',
    title: 'ชิดซ้ายขึ้นสะพานกลับรถ',
    desc: 'ชิดซ้ายขึ้นสะพานกลับรถเข้าฐานทัพอากาศ (Air Force Base U-Turn Bridge)'
  },
  {
    step: '03',
    title: 'ผ่านประตูทางเข้าฐานทัพอากาศ / จุดกลับรถ',
    desc: 'เลี้ยวตามแนวเส้นทางลูกศร เข้าสู่แนวกลุ่มอาคารสำนักงาน'
  },
  {
    step: '04',
    title: 'ถึงอาคารจูเคี่ยวเล้ง ชั้น 3',
    desc: 'อาคารเลขที่ 89/35 ชั้น 3 สังเกตป้ายบริษัท ไอเจนโก้ จำกัด มีที่จอดรถสำหรับผู้มาติดต่อ'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-24 max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16">
      
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs font-mono mb-8 opacity-75">
        <NuxtLink to="/" class="hover:text-[#00C864] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/contact" class="hover:text-[#00C864] dark:hover:text-[#00FF88]">ติดต่อเรา</NuxtLink>
        <span>/</span>
        <span class="text-[#00C864] dark:text-[#00FF88] font-bold">ตำแหน่งที่ตั้งสำนักงาน</span>
      </nav>

      <!-- Page Header -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#00C864]/10 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/20 mb-4 font-bold">
          <MapPin class="w-3.5 h-3.5" />
          <span>HEADQUARTERS & LOCATION // ตำแหน่งที่ตั้งสำนักงาน</span>
        </div>
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight uppercase">
          ตำแหน่งที่ตั้ง <span class="text-[#00C864] dark:text-[#00FF88]">สำนักงานใหญ่</span>
        </h1>
        <p class="text-sm sm:text-base opacity-75 mt-3 max-w-3xl leading-relaxed">
          สำนักงานใหญ่ บริษัท ไอเจนโก้ จำกัด (IGENCO) ตั้งอยู่บนถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร ใกล้สนามบินดอนเมือง และสะพานกลับรถเข้าฐานทัพอากาศ
        </p>
      </div>

      <!-- Main Section: Info Column (Left) + Dual Map Viewer (Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        
        <!-- Left Column: Address, Phone & Contact Info -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Headquarters Address Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-current/10 shadow-xl space-y-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-[#00C864]/15 dark:bg-[#00FF88]/15 text-[#00C864] dark:text-[#00FF88] flex items-center justify-center shrink-0">
                  <Building2 class="w-6 h-6" />
                </div>
                <div>
                  <span class="text-xs font-mono uppercase text-[#00C864] dark:text-[#00FF88] font-bold block">IGENCO HEADQUARTERS</span>
                  <h2 class="text-lg font-bold">บริษัท ไอเจนโก้ จำกัด</h2>
                </div>
              </div>
            </div>

            <!-- Address Text -->
            <div class="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 space-y-2">
              <div class="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                <MapPin class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-1" />
                <span class="font-medium">{{ companyAddress }}</span>
              </div>
              <div class="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00C864]/10 hover:bg-[#00C864] hover:text-white text-[#00C864] dark:text-[#00FF88] transition-all cursor-pointer"
                  @click="copyToClipboard(companyAddress, 'address')"
                >
                  <Check v-if="copiedAddress" class="w-3.5 h-3.5 text-[#00C864]" />
                  <Copy v-else class="w-3.5 h-3.5" />
                  <span>{{ copiedAddress ? 'คัดลอกที่อยู่แล้ว' : 'คัดลอกที่อยู่' }}</span>
                </button>
              </div>
            </div>

            <!-- Phones -->
            <div class="space-y-2.5">
              <span class="text-xs font-semibold uppercase opacity-70 block">เบอร์โทรศัพท์สำหรับติดต่อสอบถาม</span>
              <div class="space-y-2 text-xs">
                <div v-for="phone in contact.phones" :key="phone.number + phone.label" class="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-current/10">
                  <div class="flex items-center gap-2">
                    <Phone class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="font-mono font-bold">{{ phone.number }}</span>
                    <span v-if="phone.label" class="opacity-60">({{ phone.label }})</span>
                  </div>
                  <a :href="'tel:' + telDigits(phone.number)" class="px-2 py-0.5 rounded text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline">โทรออก</a>
                </div>
              </div>
            </div>

            <!-- Email & Tax ID -->
            <div class="space-y-2 pt-2 border-t border-current/10 text-xs">
              <div class="flex items-center gap-2 opacity-80">
                <Mail class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                <span>อีเมล : {{ contact.emails[0]?.address }}</span>
              </div>
              <div class="flex items-center gap-2 opacity-80 font-mono">
                <FileText class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                <span>เลขประจำตัวผู้เสียภาษี : 0115553003741</span>
              </div>
            </div>

            <!-- Action Buttons: Google Maps Navigation & Map Links -->
            <div class="space-y-2.5 pt-2">
              <!-- 1. ปุ่มหลัก: กดนำทางจากตำแหน่งของผู้ใช้มายังบริษัทโดยตรง -->
              <a
                :href="googleMapsDirectionsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-4 rounded-xl font-bold text-sm tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_8px_30px_rgba(0,200,100,0.35)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Navigation class="w-5 h-5 animate-pulse" />
                <span>กดนำทาง Google Maps (จากตำแหน่งของคุณ)</span>
                <ExternalLink class="w-4 h-4 opacity-75" />
              </a>

              <!-- 2. ปุ่มดูหมุดพิกัดบริษัท ไอเจนโก้ บน Google Maps -->
              <a
                :href="googleMapsPinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-3 rounded-xl font-semibold text-xs tracking-wider bg-black/[0.04] dark:bg-white/[0.06] hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/15 text-[#022C22] dark:text-[#F1F5F9] transition-all flex items-center justify-center gap-2 border border-current/10 cursor-pointer"
              >
                <MapPin class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                <span>เปิดดูหมุดพิกัด บริษัท ไอเจนโก้ บน Google Maps</span>
                <ExternalLink class="w-3.5 h-3.5 opacity-60" />
              </a>

              <!-- 3. ปุ่มดาวน์โหลดภาพแผนที่เส้นทาง -->
              <a
                :href="mapImagePath"
                download="igenco-office-map.jpg"
                class="w-full py-2.5 rounded-xl font-semibold text-xs tracking-wider bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/10 dark:hover:bg-white/10 text-[#022C22] dark:text-[#F1F5F9] transition-all flex items-center justify-center gap-2 border border-current/10 cursor-pointer"
              >
                <Download class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                <span>ดาวน์โหลดภาพแผนที่เส้นทาง (Save Map Image)</span>
              </a>
            </div>

          </div>

          <!-- Business Hours Card -->
          <div class="p-6 rounded-3xl spatial-glass border border-current/10 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-[#00C864]/15 dark:bg-[#00FF88]/15 text-[#00C864] dark:text-[#00FF88] flex items-center justify-center shrink-0">
              <Clock class="w-5 h-5" />
            </div>
            <div class="text-xs leading-relaxed">
              <h3 class="font-bold text-sm mb-0.5">เวลาเปิดทำการสำหรับการนัดหมายเข้าพบ</h3>
              <p class="opacity-75">วันจันทร์ - วันศุกร์ เวลา 08:30 - 17:30 น.</p>
              <p class="text-[11px] opacity-60 mt-1">แนะนำให้นัดหมายล่วงหน้าเพื่อเตรียมห้องประชุมและทีมผู้เชี่ยวชาญสาธิตระบบ</p>
            </div>
          </div>

          <!-- Link to Consultation Form -->
          <NuxtLink
            to="/contact"
            class="group p-5 rounded-2xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] transition-all flex items-center justify-between hover-lift block"
          >
            <div>
              <span class="text-xs font-mono uppercase text-[#00C864] dark:text-[#00FF88] font-bold">ต้องการติดต่อสอบถาม?</span>
              <h4 class="text-sm font-bold mt-0.5 group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">กรอกแบบฟอร์มขอรับคำปรึกษาออนไลน์</h4>
            </div>
            <ArrowRight class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] group-hover:translate-x-1.5 transition-transform" />
          </NuxtLink>

        </div>

        <!-- Right Column: Dual Map Viewer (Graphic Route Map & Google Maps) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="spatial-glass rounded-3xl p-5 sm:p-7 border border-current/10 shadow-2xl overflow-hidden">
            
            <!-- Map Mode Switcher Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-current/10">
              <div class="flex items-center gap-2">
                <Compass class="w-5 h-5 text-[#00C864] dark:text-[#00FF88]" />
                <span class="text-sm font-bold uppercase tracking-wide">แผนที่แสดงตำแหน่งและเส้นทาง</span>
              </div>

              <!-- Tabs: Graphic Map vs Google Maps -->
              <div class="inline-flex p-1 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] border border-current/10 text-xs font-semibold">
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer',
                    activeMapTab === 'graphic'
                      ? 'bg-[#00C864] text-white shadow-md font-bold'
                      : 'opacity-70 hover:opacity-100'
                  ]"
                  @click="activeMapTab = 'graphic'"
                >
                  <Map class="w-3.5 h-3.5" />
                  <span>แผนที่ภาพเส้นทาง (Graphic Map)</span>
                </button>
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer',
                    activeMapTab === 'google'
                      ? 'bg-[#00C864] text-white shadow-md font-bold'
                      : 'opacity-70 hover:opacity-100'
                  ]"
                  @click="activeMapTab = 'google'"
                >
                  <Compass class="w-3.5 h-3.5" />
                  <span>Google Maps พิกัดจริง</span>
                </button>
              </div>
            </div>

            <!-- View 1: Official Graphic Route Map -->
            <div v-if="activeMapTab === 'graphic'" class="space-y-4">
              <div
                class="relative rounded-2xl overflow-hidden border border-current/15 bg-white group cursor-zoom-in shadow-inner"
                @click="isLightboxOpen = true"
              >
                <img
                  :src="mapImagePath"
                  alt="แผนที่เส้นทางการเดินทาง บริษัท ไอเจนโก้ จำกัด อาคารจูเคี่ยวเล้ง ดอนเมือง"
                  class="w-full h-auto object-contain max-h-[500px] mx-auto block hover:scale-[1.02] transition-transform duration-300"
                />
                
                <!-- Zoom Overlay Badge -->
                <div class="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/75 text-white backdrop-blur-md text-xs font-mono flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <ZoomIn class="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>คลิกเพื่อขยายภาพขนาดใหญ่</span>
                </div>
              </div>

              <!-- Graphic Map Information Bar -->
              <div class="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div class="space-y-1">
                  <div class="font-bold text-[#00C864] dark:text-[#00FF88]">จุดสังเกตสำคัญในแผนที่ภาพ:</div>
                  <p class="opacity-75">
                    ถนนวิภาวดีรังสิต (ขาออก) $\rightarrow$ ชิดซ้ายขึ้นสะพานกลับรถเข้าฐานทัพอากาศ $\rightarrow$ เข้าสู่อาคารจูเคี่ยวเล้ง ชั้น 3
                  </p>
                </div>
                <div class="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-lg bg-[#00C864]/15 hover:bg-[#00C864] text-[#00C864] dark:text-[#00FF88] hover:text-white font-bold transition-all flex items-center gap-1"
                    @click="isLightboxOpen = true"
                  >
                    <ZoomIn class="w-3.5 h-3.5" />
                    <span>ขยายเต็มจอ</span>
                  </button>
                  <a
                    :href="mapImagePath"
                    download="igenco-office-map.jpg"
                    class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864] hover:text-white transition-all"
                    title="ดาวน์โหลดภาพแผนที่"
                  >
                    <Download class="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <!-- View 2: Google Maps Interactive Iframe -->
            <div v-else class="space-y-4">
              <div class="w-full h-[460px] rounded-2xl overflow-hidden border border-current/15 bg-black/5 relative shadow-inner">
                <iframe
                  title="แผนที่ตั้ง บริษัท ไอเจนโก้ จำกัด อาคารจูเคี่ยวเล้ง ดอนเมือง"
                  src="https://maps.google.com/maps?q=13.9352181,100.6120949&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  class="w-full h-full contrast-[105%] transition-all duration-300"
                />
              </div>

              <div class="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div class="space-y-1">
                  <div class="font-bold text-[#00C864] dark:text-[#00FF88]">พิกัดสำนักงานใหญ่ บริษัท ไอเจนโก้ จำกัด:</div>
                  <p class="opacity-75 font-mono">
                    13.9352181, 100.6120949 (อาคารจูเคี่ยวเล้ง ซอยวิภาวดีรังสิต 33)
                  </p>
                </div>
                <div class="shrink-0 flex items-center gap-2">
                  <a
                    :href="googleMapsDirectionsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 rounded-xl bg-[#00C864] text-white font-bold transition-all flex items-center gap-1.5 shadow-md hover:opacity-90"
                  >
                    <Navigation class="w-3.5 h-3.5" />
                    <span>กดนำทางทันที</span>
                  </a>
                  <a
                    :href="googleMapsPinUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 font-semibold transition-all flex items-center gap-1"
                  >
                    <span>เปิดหมุดพิกัด</span>
                    <ExternalLink class="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Step-by-Step Navigation Guide (ลำดับขั้นตอนการเดินทางตามแผนที่ภาพ) -->
      <div class="mb-16">
        <div class="mb-6">
          <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
            <Navigation class="w-5 h-5 text-[#00C864] dark:text-[#00FF88]" />
            <span>แนวทางเส้นทางการเดินทางเข้าสู่อาคาร (Step-by-Step)</span>
          </h2>
          <p class="text-xs opacity-70 mt-1">
            อ้างอิงจากแผนที่เส้นทางการเดินทางอย่างเป็นทางการของบริษัท ไอเจนโก้ จำกัด
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="item in landmarkSteps"
            :key="item.step"
            class="p-5 rounded-2xl spatial-glass border border-current/10 hover-lift space-y-3 relative overflow-hidden"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-extrabold text-[#00C864] dark:text-[#00FF88] px-2.5 py-1 rounded-lg bg-[#00C864]/10">
                STEP {{ item.step }}
              </span>
            </div>
            <h3 class="text-sm font-bold leading-snug">{{ item.title }}</h3>
            <p class="text-xs opacity-75 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Travel & Transit Guides -->
      <div class="mb-12">
        <div class="mb-6">
          <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
            <Compass class="w-5 h-5 text-[#00C864] dark:text-[#00FF88]" />
            <span>คำแนะนำการเดินทางด้วยยานพาหนะต่าง ๆ</span>
          </h2>
          <p class="text-xs opacity-70 mt-1">
            ข้อมูลการเดินทางด้วยระบบขนส่งสาธารณะและรถยนต์ส่วนบุคคลเพื่อความสะดวกในการเดินทางมายังสำนักงาน
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="guide in transitGuides"
            :key="guide.title"
            class="p-5 rounded-2xl spatial-glass border border-current/10 hover-lift space-y-3"
          >
            <div class="w-10 h-10 rounded-xl bg-[#00C864]/10 dark:bg-[#00FF88]/10 text-[#00C864] dark:text-[#00FF88] flex items-center justify-center">
              <component :is="guide.icon" class="w-5 h-5" />
            </div>
            <h3 class="text-sm font-bold">{{ guide.title }}</h3>
            <p class="text-xs opacity-75 leading-relaxed">{{ guide.desc }}</p>
          </div>
        </div>
      </div>

    </main>

    <!-- Lightbox Modal for Fullscreen Graphic Map -->
    <div
      v-if="isLightboxOpen"
      class="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      @click="isLightboxOpen = false"
    >
      <div
        class="relative max-w-5xl w-full max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col"
        @click.stop
      >
        <!-- Modal Top Bar -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200 text-[#022C22]">
          <div class="flex items-center gap-2.5">
            <Map class="w-5 h-5 text-[#00C864]" />
            <h3 class="font-bold text-sm sm:text-base">แผนที่เส้นทาง บริษัท ไอเจนโก้ จำกัด (อาคารจูเคี่ยวเล้ง ดอนเมือง)</h3>
          </div>
          <div class="flex items-center gap-2">
            <a
              :href="mapImagePath"
              download="igenco-office-map.jpg"
              class="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#00C864] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 text-gray-800"
            >
              <Download class="w-3.5 h-3.5" />
              <span>ดาวน์โหลด</span>
            </a>
            <button
              type="button"
              class="p-2 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Close Modal"
              @click="isLightboxOpen = false"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Modal Image -->
        <div class="flex-1 overflow-auto flex items-center justify-center py-4 bg-gray-50 rounded-2xl my-2">
          <img
            :src="mapImagePath"
            alt="แผนที่เส้นทาง บริษัท ไอเจนโก้ จำกัด"
            class="max-w-full max-h-[75vh] object-contain rounded-xl shadow-sm"
          />
        </div>

        <!-- Modal Footer -->
        <div class="pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
          <span>เลขที่ 89/35 อาคารจูเคี่ยวเล้ง ชั้น 3 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กทม. โทร 063-525-4850</span>
          <button
            type="button"
            class="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold self-end sm:self-auto transition-colors"
            @click="isLightboxOpen = false"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>

    <ContactFooter />
  </div>
</template>
