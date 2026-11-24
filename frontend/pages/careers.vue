<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Briefcase, ArrowLeft, ArrowUpRight, CheckCircle2, Mail, Phone, MapPin, Sparkles } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'ร่วมงานกับเรา (Careers) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'เปิดรับสมัครบุคลากรคนรุ่นใหม่ร่วมงานกับ IGENCO: Full-Stack Developer, System Analyst, DevOps Engineer และ Business Development'
    }
  ]
})

const jobs = [
  {
    title: 'Full-Stack Web Developer (Vue.js / Nuxt / Node.js)',
    dept: 'Software Engineering Division',
    type: 'Full-Time (ประจำสำนักงานบางเขน)',
    exp: 'ประสบการณ์ 1-5 ปี (ยินดีรับนักศึกษาจบใหม่ที่มี Portfolio)',
    skills: ['Vue.js / Nuxt 3', 'TypeScript', 'Node.js / Express', 'PostgreSQL / MongoDB', 'Git / CI-CD'],
    desc: 'ร่วมออกแบบและพัฒนา Web Application ระดับ Enterprise ระบบบริหารจัดการข้อมูลขนาดใหญ่ และระบบงานภาครัฐ-เอกชน'
  },
  {
    title: 'System Analyst (SA) / นักวิเคราะห์ระบบงาน',
    dept: 'Solutions & Architecture Division',
    type: 'Full-Time (ประจำสำนักงานบางเขน)',
    exp: 'ประสบการณ์ 2 ปีขึ้นไปในสายงานวิเคราะห์ระบบซอฟต์แวร์',
    skills: ['System Flow / UML', 'Business Requirement Analysis', 'Database Schema Design', 'API Specification'],
    desc: 'วิเคราะห์ความต้องการทางธุรกิจของลูกค้าภาครัฐและเอกชน ออกแบบ Flow การทำงาน และประสานงานกับทีมพัฒนา'
  },
  {
    title: 'DevOps & Cloud Infrastructure Engineer',
    dept: 'IT Infrastructure Division',
    type: 'Full-Time (ประจำสำนักงานบางเขน)',
    exp: 'ประสบการณ์ 1-3 ปี',
    skills: ['Docker / Kubernetes', 'Linux Administration', 'Cloud Platform (AWS / Azure / Private)', 'Nginx / Network Security'],
    desc: 'ดูแลโครงสร้างพื้นฐานระบบแม่ข่าย การจัดเก็บข้อมูลความปลอดภัยสูง และระบบ CI/CD สำหรับโครงการต่าง ๆ'
  },
  {
    title: 'Business Development / IT Consultant',
    dept: 'Sales & Client Success Division',
    type: 'Full-Time (ประจำสำนักงานบางเขน)',
    exp: 'ประสบการณ์ 1-3 ปีในสายงานขายหรือที่ปรึกษา IT',
    skills: ['Enterprise Solution Sales', 'Project Presentation', 'Client Relationship', 'Gov & Enterprise Procurement'],
    desc: 'นำเสนอโซลูชันระบบงานซอฟต์แวร์ i-SMARTSOFT, I-SERFF, EFMS และดูแลลูกค้าหน่วยงานภาครัฐและเอกชน'
  }
]

const form = ref({
  name: '',
  email: '',
  phone: '',
  position: 'Full-Stack Web Developer (Vue.js / Nuxt / Node.js)',
  portfolioUrl: '',
  message: ''
})

const isSubmitted = ref(false)

const submitApplication = () => {
  isSubmitted.value = true
  showToast('ส่งข้อมูลการสมัครงานเรียบร้อยแล้ว ทีมงาน HR จะติดต่อกลับครับ')
}
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-24 max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-16">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-mono mb-10 opacity-70">
        <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/about" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">เกี่ยวกับเรา</NuxtLink>
        <span>/</span>
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">ร่วมงานกับเรา (Careers)</span>
      </div>

      <!-- Header -->
      <div class="pb-16 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Briefcase class="w-4 h-4" />
          <span>CAREERS & OPPORTUNITIES // ร่วมงานกับเรา</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
          ร่วมเป็นส่วนหนึ่งของทีมไอเจนโก้ ขับเคลื่อนอนาคตดิจิทัล
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          เราสนับสนุนบรรยากาศการทำงานที่เป็นมืออาชีพ เรียนรู้เทคโนโลยีสมัยใหม่ และการทำงานเป็นทีม เพื่อส่งมอบคุณภาพซอฟต์แวร์ที่ดีที่สุดให้แก่ลูกค้า
        </p>
      </div>

      <!-- Job List -->
      <div class="py-16 space-y-8 border-b border-black/10 dark:border-white/10">
        <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
          OPEN POSITIONS // ตำแหน่งงานที่เปิดรับสมัคร
        </div>

        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="job in jobs"
            :key="job.title"
            class="p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-[#0A1A12] dark:text-white">{{ job.title }}</h3>
                <div class="text-xs font-mono text-[#00A852] dark:text-[#00FF88] mt-1">{{ job.dept }} • {{ job.type }}</div>
              </div>
              <span class="text-xs font-mono opacity-60">{{ job.exp }}</span>
            </div>

            <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">{{ job.desc }}</p>

            <div class="flex flex-wrap gap-2 pt-2">
              <span
                v-for="skill in job.skills"
                :key="skill"
                class="px-3 py-1 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Apply Form / Contact HR -->
      <div class="mt-16 p-8 sm:p-12 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] space-y-8">
        <div class="max-w-2xl space-y-2">
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            ส่งข้อมูลสมัครงาน / ฝากเรซูเม่
          </h2>
          <p class="text-sm text-[#475569] dark:text-[#94A3B8]">
            ทีมงานฝ่ายบุคคลจะติดต่อกลับเพื่อนัดสัมภาษณ์ หรือสามารถส่งอีเมลตรงพร้อมแนบ Resume มาที่ <strong>hr@igenco.co.th</strong> หรือโทร <strong>0-2521-3999</strong>
          </p>
        </div>

        <form @submit.prevent="submitApplication" class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          <div class="space-y-1.5">
            <label class="text-xs font-mono uppercase tracking-wider font-semibold">ชื่อ - นามสกุล *</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="กรอกชื่อ-นามสกุลของคุณ"
              class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/40 text-sm focus:outline-none focus:border-[#00C864]"
            >
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-mono uppercase tracking-wider font-semibold">เบอร์โทรศัพท์ติดต่อ *</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              placeholder="08X-XXX-XXXX"
              class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/40 text-sm focus:outline-none focus:border-[#00C864]"
            >
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-mono uppercase tracking-wider font-semibold">อีเมลติดต่อ *</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="your.email@example.com"
              class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/40 text-sm focus:outline-none focus:border-[#00C864]"
            >
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-mono uppercase tracking-wider font-semibold">ตำแหน่งที่สนใจ *</label>
            <select
              v-model="form.position"
              class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/40 text-sm focus:outline-none focus:border-[#00C864]"
            >
              <option v-for="job in jobs" :key="job.title" :value="job.title">{{ job.title }}</option>
            </select>
          </div>

          <div class="sm:col-span-2 space-y-1.5">
            <label class="text-xs font-mono uppercase tracking-wider font-semibold">ลิงก์ Portfolio / LinkedIn / GitHub</label>
            <input
              v-model="form.portfolioUrl"
              type="url"
              placeholder="https://..."
              class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/40 text-sm focus:outline-none focus:border-[#00C864]"
            >
          </div>

          <div class="sm:col-span-2 space-y-1.5">
            <label class="text-xs font-mono uppercase tracking-wider font-semibold">ข้อความแนะนำตัว / ประสบการณ์โดยย่อ</label>
            <textarea
              v-model="form.message"
              rows="3"
              placeholder="ระบุประสบการณ์ ความเชี่ยวชาญ หรือช่วงเวลาที่สะดวกเริ่มงาน"
              class="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/40 text-sm focus:outline-none focus:border-[#00C864]"
            />
          </div>

          <div class="sm:col-span-2 pt-2">
            <button
              type="submit"
              class="px-8 py-3.5 rounded-xl font-bold text-sm bg-[#00A852] text-white hover:bg-[#008f44] transition-all shadow-md flex items-center gap-2"
            >
              <span>ส่งใบสมัครงาน / เรซูเม่</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </main>

    <ContactFooter />
  </div>
</template>
