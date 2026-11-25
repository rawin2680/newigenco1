<script setup lang="ts">
import { ref } from 'vue'
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
  FileText
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

useHead({
  title: 'ตำแหน่งที่ตั้งสำนักงาน (Headquarters Location) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ตำแหน่งที่ตั้งและแผนที่สำนักงานใหญ่ บริษัท ไอเจนโก้ จำกัด 89/35 อาคารจูเคี่ยวเล้ง ชั้น 3 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร โทร 0-2523-3559'
    }
  ]
})

const { showToast } = useTheme()

const companyAddress = '89/35 อาคารจูเคี่ยวเล้ง ชั้น 3 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร 10210'
const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=89%2F35+%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B9%E0%B9%80%E0%B8%84%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%80%E0%B8%A5%E0%B9%89%E0%B8%87+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%A7%E0%B8%B4%E0%B8%A0%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%B5%E0%B8%A3%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%95+%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87'

const copiedAddress = ref(false)
const copiedPhone = ref<string | null>(null)

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
        <span class="text-[#00C864] dark:text-[#00FF88] font-bold">ตำแหน่งที่ตั้ง</span>
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
          สำนักงานใหญ่ บริษัท ไอเจนโก้ จำกัด ตั้งอยู่บนถนนวิภาวดีรังสิต เขตดอนเมือง กรุงเทพมหานคร การเดินทางสะดวกสบายใกล้สนามบินดอนเมือง และรถไฟฟ้าสายสีแดง
        </p>
      </div>

      <!-- Main Grid: Info on Left + Interactive Map on Right -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        
        <!-- Left Column: Address, Phone & Actions -->
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
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-current/10">
                  <div class="flex items-center gap-2">
                    <Phone class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="font-mono font-bold">0-2523-3559</span>
                    <span class="opacity-60">(ชั้น 2)</span>
                  </div>
                  <a href="tel:025233559" class="px-2 py-0.5 rounded text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline">โทรออก</a>
                </div>
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-current/10">
                  <div class="flex items-center gap-2">
                    <Phone class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="font-mono font-bold">0-2523-3560</span>
                    <span class="opacity-60">(ชั้น 3)</span>
                  </div>
                  <a href="tel:025233560" class="px-2 py-0.5 rounded text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline">โทรออก</a>
                </div>
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-current/10">
                  <div class="flex items-center gap-2">
                    <Phone class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="font-mono font-bold">06-3525-4850</span>
                    <span class="opacity-60">(สายด่วน)</span>
                  </div>
                  <a href="tel:0635254850" class="px-2 py-0.5 rounded text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline">โทรออก</a>
                </div>
              </div>
            </div>

            <!-- Email & Tax ID -->
            <div class="space-y-2 pt-2 border-t border-current/10 text-xs">
              <div class="flex items-center gap-2 opacity-80">
                <Mail class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                <span>อีเมล : support@igenco.co.th</span>
              </div>
              <div class="flex items-center gap-2 opacity-80 font-mono">
                <FileText class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
                <span>เลขประจำตัวผู้เสียภาษี : 0115553003741</span>
              </div>
            </div>

            <!-- Open in Google Maps Button -->
            <a
              :href="googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_8px_25px_rgba(0,200,100,0.3)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <Navigation class="w-4 h-4" />
              <span>เปิดดูเส้นทางบน Google Maps</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>

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

        <!-- Right Column: Interactive Map Container -->
        <div class="lg:col-span-7 space-y-6">
          <div class="spatial-glass rounded-3xl p-4 sm:p-6 border border-current/10 shadow-2xl overflow-hidden">
            
            <div class="flex items-center justify-between mb-4 px-2">
              <div class="flex items-center gap-2">
                <Compass class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                <span class="text-xs font-mono uppercase tracking-wider font-bold">แผนที่พิกัดสำนักงาน (Google Maps)</span>
              </div>
              <a
                :href="googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs text-[#00C864] dark:text-[#00FF88] font-bold hover:underline flex items-center gap-1"
              >
                <span>ขยายเต็มจอ</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>

            <!-- Embedded Google Map -->
            <div class="w-full h-[460px] rounded-2xl overflow-hidden border border-current/10 bg-black/5 relative">
              <iframe
                title="แผนที่ตั้ง บริษัท ไอเจนโก้ จำกัด อาคารจูเคี่ยวเล้ง ดอนเมือง"
                src="https://maps.google.com/maps?q=89/35%20ถนนวิภาวดีรังสิต%20ดอนเมือง%20กรุงเทพมหานคร&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full grayscale-[15%] contrast-[105%] hover:grayscale-0 transition-all duration-300"
              />
            </div>

            <!-- Map Caption -->
            <div class="mt-4 px-2 flex items-center justify-between text-xs opacity-70">
              <span>📍 พิกัด: อาคารจูเคี่ยวเล้ง ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง</span>
              <span class="font-mono">IGENCO TECH</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Travel & Transit Guides -->
      <div class="mb-12">
        <div class="mb-6">
          <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
            <Compass class="w-5 h-5 text-[#00C864] dark:text-[#00FF88]" />
            <span>คำแนะนำการเดินทางและจุดสังเกตสำคัญ</span>
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

    <ContactFooter />
  </div>
</template>
