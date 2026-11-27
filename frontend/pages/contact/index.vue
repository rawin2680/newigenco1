<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  Copy,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Building2,
  Headphones,
  Award,
  Sparkles
} from 'lucide-vue-next'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'
import { useLiveRefresh } from '~/composables/useLiveRefresh'
import { mergeContactPage, telDigits } from '~/shared/contactPage'
import { inlineNewsText } from '~/shared/newsBlocks'

const { submitInquiry, getContactPage } = useStrapiContent()
const { showToast } = useTheme()

// เนื้อหาหน้า (แก้ได้จากแอดมิน แท็บ "หน้าติดต่อเรา") ถ้า Strapi ยังไม่มีข้อมูลจะใช้ข้อความเดิม
const { data: fetchedContent, refresh: refreshContent } = await useAsyncData('contact-page-content', getContactPage)
const content = computed(() => fetchedContent.value || mergeContactPage(null))
useLiveRefresh(async () => { await refreshContent() })
const badgeIcons = [ShieldCheck, Award, Sparkles]

useSeoMeta({
  title: () => content.value.seoTitle,
  description: () => content.value.seoDescription
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  projectSummary: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.projectSummary) {
    showToast('กรุณากรอกชื่อ อีเมล และเลือกหัวข้อที่สนใจให้ครบถ้วน')
    return
  }

  isSubmitting.value = true
  const summary = form.value.projectSummary || 'ติดต่อสอบถามทั่วไปผ่านหน้าติดต่อ'
  const fullMessage = form.value.message
    ? `${summary} | เบอร์โทร: ${form.value.phone || '-'} | ข้อความ: ${form.value.message}`
    : `${summary} | เบอร์โทร: ${form.value.phone || '-'}`

  const result = await submitInquiry({
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    projectSummary: fullMessage
  })
  isSubmitting.value = false

  showToast(result.isLive ? 'ส่งข้อความสอบถามและบันทึกลงระบบเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด' : 'ส่งข้อความสอบถามเรียบร้อยแล้ว ทีมงาน IGENCO จะติดต่อกลับโดยเร็วที่สุด')
  form.value = { name: '', email: '', phone: '', projectSummary: '', message: '' }
}

// One-Click Copy
const copiedPhone = ref<string | null>(null)
const copiedEmail = ref<string | null>(null)

const copyToClipboard = (text: string, type: 'phone' | 'email') => {
  if (import.meta.client) {
    navigator.clipboard.writeText(text)
    if (type === 'phone') {
      copiedPhone.value = text
      showToast(`คัดลอกเบอร์โทร ${text} เรียบร้อยแล้ว`)
      setTimeout(() => { copiedPhone.value = null }, 2500)
    } else {
      copiedEmail.value = text
      showToast(`คัดลอกอีเมล ${text} เรียบร้อยแล้ว`)
      setTimeout(() => { copiedEmail.value = null }, 2500)
    }
  }
}
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
        <span class="opacity-60">ติดต่อเรา</span>
        <span>/</span>
        <span class="text-[#00C864] dark:text-[#00FF88] font-bold">{{ content.headingMain }} {{ content.headingHighlight }}</span>
      </nav>

      <!-- Page Header Banner -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#00C864]/10 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/20 mb-4 font-bold">
          <Headphones class="w-3.5 h-3.5" />
          <span>{{ content.badge }}</span>
        </div>
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight uppercase">
          {{ content.headingMain }} <span class="text-[#00C864] dark:text-[#00FF88]">{{ content.headingHighlight }}</span>
        </h1>
        <p class="text-sm sm:text-base opacity-75 mt-3 max-w-3xl leading-relaxed">
          {{ content.intro }}
        </p>
      </div>

      <!-- Main Layout: 2 Columns -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- ==========================================
             Left Column: Contact Channels & Quick Info
        =========================================== -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Direct Contact Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-current/10 shadow-xl space-y-6">
            <h2 class="text-base font-bold uppercase tracking-wider flex items-center gap-2 text-[#00C864] dark:text-[#00FF88]">
              <Phone class="w-4 h-4" />
              <span>{{ content.channelsTitle }}</span>
            </h2>

            <!-- Phone Numbers -->
            <div class="space-y-3">
              <span class="text-xs font-semibold uppercase opacity-70 block">{{ content.phonesLabel }}</span>
              
              <div class="space-y-2">
                <div v-for="phone in content.phones" :key="phone.number + phone.label" class="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10">
                  <div class="flex items-center gap-2.5">
                    <Phone class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="text-sm font-mono font-bold">{{ phone.number }}</span>
                    <span v-if="phone.label" class="text-xs opacity-60">({{ phone.label }})</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <a :href="'tel:' + telDigits(phone.number)" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#00C864]/15 hover:bg-[#00C864] hover:text-white text-[#00C864] dark:text-[#00FF88] transition-all">โทร</a>
                    <button
                      type="button"
                      :aria-label="'คัดลอกเบอร์โทร ' + phone.number"
                      class="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-all"
                      @click="copyToClipboard(telDigits(phone.number), 'phone')"
                    >
                      <Check v-if="copiedPhone === telDigits(phone.number)" class="w-3.5 h-3.5 text-[#00C864]" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2 pt-2 border-t border-current/10">
              <span class="text-xs font-semibold uppercase opacity-70 block">{{ content.emailsLabel }}</span>
              <div v-for="email in content.emails" :key="email.address" class="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10">
                <div class="flex items-center gap-2.5">
                  <Mail class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                  <span class="text-sm font-mono font-medium">{{ email.address }}</span>
                  <span v-if="email.label" class="text-xs opacity-60">({{ email.label }})</span>
                </div>
                <button
                  type="button"
                  :aria-label="'คัดลอกอีเมล ' + email.address"
                  class="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-all"
                  @click="copyToClipboard(email.address, 'email')"
                >
                  <Check v-if="copiedEmail === email.address" class="w-3.5 h-3.5 text-[#00C864]" />
                  <Copy v-else class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="p-3.5 rounded-xl bg-[#00C864]/5 dark:bg-[#00FF88]/5 border border-[#00C864]/20 flex items-start gap-3">
              <Clock class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed">
                <span class="font-bold block">{{ content.officeHoursTitle }}</span>
                <span class="opacity-80">{{ content.officeHours }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Navigation to Location Page -->
          <NuxtLink
            to="/contact/location"
            class="group p-6 rounded-3xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] transition-all flex items-center justify-between shadow-lg hover:shadow-xl hover-lift block"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864]/15 dark:bg-[#00FF88]/15 text-[#00C864] dark:text-[#00FF88] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MapPin class="w-6 h-6" />
              </div>
              <div>
                <span class="text-xs font-mono uppercase text-[#00C864] dark:text-[#00FF88] font-bold block">OFFICE LOCATION</span>
                <h3 class="text-base font-bold mt-0.5 group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">{{ content.locationTitle }}</h3>
                <p class="text-xs opacity-70 mt-0.5">{{ content.locationSubtitle }}</p>
              </div>
            </div>
            <ArrowRight class="w-5 h-5 text-[#00C864] dark:text-[#00FF88] group-hover:translate-x-1.5 transition-transform" />
          </NuxtLink>

          <!-- Trust Badges -->
          <div v-if="content.trustBadges.length" class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-3 text-xs">
            <div v-for="(badge, i) in content.trustBadges" :key="i" class="flex items-center gap-3">
              <component :is="badgeIcons[i % badgeIcons.length]" class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0" />
              <span><template v-for="(part, p) in inlineNewsText(badge)" :key="p"><strong v-if="part.tag === 'strong'">{{ part.text }}</strong><template v-else>{{ part.text }}</template></template></span>
            </div>
          </div>

        </div>

        <!-- ==========================================
             Right Column: Interactive Consultation Form
        =========================================== -->
        <div class="lg:col-span-7">
          <div class="p-8 sm:p-12 rounded-3xl spatial-glass border border-current/10 shadow-2xl backdrop-blur-2xl">
            <div class="mb-6">
              <h2 class="text-2xl font-extrabold uppercase tracking-tight flex items-center gap-2">
                <span>{{ content.formTitle }}</span>
              </h2>
              <p class="text-xs opacity-75 mt-1">
                {{ content.formSubtitle }}
              </p>
            </div>

            <form class="space-y-4" @submit.prevent="handleSubmit">
              <!-- Name -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">ชื่อผู้ติดต่อ / หน่วยงาน *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="ระบุชื่อ - นามสกุล หรือชื่อบริษัท/หน่วยงานของท่าน"
                  class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
                >
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">อีเมลติดต่อกลับ *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
                >
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">เบอร์โทรศัพท์ติดต่อ</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="08X-XXX-XXXX หรือ 02-XXX-XXXX"
                  class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
                >
              </div>

              <!-- Solution Topic -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">หัวข้อหรือโซลูชันที่ต้องการปรึกษา *</label>
                <div class="relative">
                  <select
                    v-model="form.projectSummary"
                    required
                    class="w-full px-4 py-3.5 pr-10 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all appearance-none cursor-pointer text-[#0A1A12] dark:text-[#F8FAFC]"
                  >
                    <option value="" disabled selected class="text-gray-400 dark:text-gray-500 bg-white dark:bg-[#0A1A12]">
                      -- เลือกหัวข้อหรือโซลูชันที่ต้องการ --
                    </option>
                    <option
                      v-for="opt in content.topicOptions"
                      :key="opt"
                      :value="opt"
                      class="text-[#0A1A12] dark:text-[#F8FAFC] bg-white dark:bg-[#0A1A12] py-1.5"
                    >
                      {{ opt }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-current opacity-60">
                    <ChevronDown class="w-4 h-4" />
                  </div>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">รายละเอียดเพิ่มเติม (ถ้ามี)</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="ระบุความต้องการ จำนวนผู้ใช้งาน รูปแบบหน่วยงาน หรือเวลาที่สะดวกให้ทีมงานติดต่อกลับ..."
                  class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
                />
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_8px_25px_rgba(0,200,100,0.35)] disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>{{ isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งแบบฟอร์มขอรับคำปรึกษา' }}</span>
                <Send class="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>

    </main>

    <!-- หน้านี้มีแบบฟอร์มขอคำปรึกษาอยู่แล้ว จึงซ่อนแบบฟอร์มซ้ำในส่วนท้าย -->
    <ContactFooter hide-inquiry />
  </div>
</template>
