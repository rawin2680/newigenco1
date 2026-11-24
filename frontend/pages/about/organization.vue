<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  Users,
  UserCheck,
  Briefcase,
  Award,
  ShieldCheck,
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  Laptop,
  ShoppingCart,
  Calculator,
  Megaphone,
  TrendingUp,
  Network,
  Server,
  Layers,
  ZoomIn,
  Building2,
  CheckCircle2,
  ChevronRight
} from 'lucide-vue-next'

useHead({
  title: 'แผนผังการบริหาร (Organization Structure) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'แผนผังและโครงสร้างการบริหารงาน บริษัท ไอเจนโก้ จำกัด (IGENCO) กรรมการผู้จัดการ รองกรรมการสายบริหาร สายการขายและการตลาด และสายสารสนเทศ'
    }
  ]
})

const isModalOpen = ref(false)

const divisions = [
  {
    id: 'admin',
    title: 'รองกรรมการสายบริหาร',
    en: 'Deputy Managing Director - Administration',
    color: '#00C864',
    icon: Briefcase,
    departments: [
      { name: 'ฝ่ายบุคคล', en: 'Human Resources (HR)', icon: Users, desc: 'สรรหา พัฒนา และดูแลสวัสดิการของบุคลากรในองค์กร' },
      { name: 'ฝ่ายผู้จัดการทั่วไป', en: 'General Management', icon: UserCheck, desc: 'กำกับดูแลการปฏิบัติการทั่วไปและสนับสนุนงานบริหาร' },
      { name: 'ฝ่ายจัดซื้อ - คลัง', en: 'Procurement & Inventory', icon: ShoppingCart, desc: 'บริหารจัดการการจัดซื้อ อุปกรณ์ และคลังพัสดุระบบ' },
      { name: 'ฝ่ายบัญชี - การเงิน', en: 'Accounting & Finance', icon: Calculator, desc: 'วางแผนการเงิน บัญชี และบริหารงบประมาณอย่างโปร่งใส' }
    ]
  },
  {
    id: 'sales',
    title: 'รองกรรมการสายการขายและการตลาด',
    en: 'Deputy Managing Director - Sales & Marketing',
    color: '#00A852',
    icon: TrendingUp,
    departments: [
      { name: 'ฝ่ายการตลาด', en: 'Marketing Division', icon: Megaphone, desc: 'วางแผนกลยุทธ์การตลาด สื่อสารแบรนด์ และวิเคราะห์ตลาด' },
      { name: 'ฝ่ายการขาย', en: 'Sales Division', icon: TrendingUp, desc: 'ประสานงานลูกค้าภาครัฐ-เอกชน และนำเสนอโซลูชันซอฟต์แวร์' },
      { name: 'ฝ่ายส่งเสริมการขาย', en: 'Sales Promotion', icon: Award, desc: 'จัดแคมเปญ ส่งเสริมการขาย และสร้างความสัมพันธ์ลูกค้าระยะยาว' }
    ]
  },
  {
    id: 'tech',
    title: 'รองกรรมการสายสารสนเทศ',
    en: 'Deputy Managing Director - Information Technology',
    color: '#00D26A',
    icon: Cpu,
    departments: [
      { name: 'Business Application', en: 'ระบบงานธุรกิจระดับองค์กร', icon: Laptop, desc: 'วิจัยและพัฒนา Web Application สำเร็จรูปแบรนด์ IGENCO' },
      { name: 'Innovation Application', en: 'นวัตกรรมซอฟต์แวร์ประยุกต์', icon: Layers, desc: 'สร้างสรรค์นวัตกรรมระบบงานใหม่ ๆ เพื่อตอบโจทย์ยุคดิจิทัล' },
      { name: 'Internet Marketing', en: 'การตลาดดิจิทัลและออนไลน์', icon: Network, desc: 'บริหารช่องทางออนไลน์ การเชื่อมต่อ และบริการดิจิทัล' },
      { name: 'Hardware & Surveillance', en: 'ฮาร์ดแวร์และความปลอดภัย', icon: Server, desc: 'ดูแลระบบโครงสร้างพื้นฐาน แม่ข่าย และอุปกรณ์ความปลอดภัย' }
    ]
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-24 max-w-[1240px] mx-auto px-5 sm:px-10 lg:px-16">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-mono mb-10 opacity-70">
        <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/about" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">เกี่ยวกับเรา</NuxtLink>
        <span>/</span>
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">แผนผังการบริหาร</span>
      </div>

      <!-- Header Section -->
      <div class="pb-14 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Users class="w-4 h-4" />
          <span>ORGANIZATION CHART // แผนผังการบริหาร</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-[1.15]">
          แผนผังและโครงสร้างการบริหารงาน
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          โครงสร้างการบริหารงาน บริษัท ไอเจนโก้ จำกัด (IGENCO) ที่มีความคล่องตัว รวดเร็วในการตัดสินใจ และสอดคล้องกับมาตรฐานวิศวกรรมสากล ISO/IEC 29110
        </p>
      </div>

      <!-- ========================================================
           1. MODERN INTERACTIVE HIERARCHY TREE (ผังองค์กรแบบโมเดิร์น)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#00A852] dark:text-[#00FF88]">
            EXECUTIVE HIERARCHY // สายการบังคับบัญชา
          </span>
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            โครงสร้างการบริหารงานระดับสูง
          </h2>
          <p class="text-sm text-[#475569] dark:text-[#94A3B8]">
            ขับเคลื่อนภายใต้การนำของกรรมการผู้จัดการ สู่ 3 สายงานหลักที่ประสานงานอย่างมีเอกภาพ
          </p>
        </div>

        <!-- Org Tree Container -->
        <div class="relative max-w-5xl mx-auto">
          
          <!-- Top Leader: กรรมการผู้จัดการบริษัท (CEO / Managing Director) -->
          <div class="flex justify-center">
            <div class="group relative px-8 py-5 rounded-3xl bg-gradient-to-b from-[#00C864] to-[#00A852] text-white shadow-xl shadow-[#00C864]/20 border border-white/20 flex items-center gap-4 hover:scale-[1.02] transition-transform">
              <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <Users class="w-6 h-6" />
              </div>
              <div>
                <div class="text-[11px] font-mono tracking-wider uppercase text-white/80">Executive Leadership</div>
                <h3 class="text-lg sm:text-xl font-bold tracking-tight">กรรมการผู้จัดการบริษัท</h3>
                <div class="text-xs text-white/90">Managing Director (CEO)</div>
              </div>
            </div>
          </div>

          <!-- Vertical Trunk Line from CEO -->
          <div class="w-0.5 h-10 bg-black/20 dark:bg-white/20 mx-auto" />

          <!-- Horizontal Crossbar connecting 3 Divisions -->
          <div class="hidden md:block relative h-0.5 bg-black/20 dark:bg-white/20 max-w-3xl mx-auto mb-6" />

          <!-- 3 Columns for Divisions -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            <div
              v-for="div in divisions"
              :key="div.id"
              class="space-y-6"
            >
              <!-- Division Header Card -->
              <div class="p-6 rounded-3xl border border-[#00C864]/40 bg-white dark:bg-[#06140d] shadow-md space-y-3 relative overflow-hidden group hover:border-[#00C864] transition-all">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88] flex items-center justify-center shrink-0">
                    <component :is="div.icon" class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="text-base font-bold text-[#0A1A12] dark:text-white leading-tight">
                      {{ div.title }}
                    </h4>
                    <div class="text-[10px] font-mono opacity-60">{{ div.en }}</div>
                  </div>
                </div>
              </div>

              <!-- Connecting Line Down to Departments -->
              <div class="w-0.5 h-4 bg-black/15 dark:bg-white/15 mx-auto -my-3" />

              <!-- Departments List Under this Division -->
              <div class="space-y-3">
                <div
                  v-for="dept in div.departments"
                  :key="dept.name"
                  class="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] hover:bg-white dark:hover:bg-white/[0.03] hover:border-[#00C864]/40 transition-all flex items-start gap-3 group"
                >
                  <div class="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#00A852] dark:text-[#00FF88] shrink-0 mt-0.5 group-hover:bg-[#00A852] group-hover:text-white transition-colors">
                    <component :is="dept.icon" class="w-4 h-4" />
                  </div>
                  <div class="space-y-0.5 min-w-0">
                    <div class="text-sm font-bold text-[#0A1A12] dark:text-white truncate">
                      {{ dept.name }}
                    </div>
                    <div class="text-[11px] font-mono text-[#00A852] dark:text-[#00FF88] truncate">
                      {{ dept.en }}
                    </div>
                    <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed pt-0.5">
                      {{ dept.desc }}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      <!-- ========================================================
           2. OFFICIAL DIAGRAM SHOWCASE (แสดงภาพแผนผังต้นฉบับอย่างสวยงาม)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="space-y-2 max-w-2xl">
            <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#00A852] dark:text-[#00FF88]">
              OFFICIAL VISUAL CHART // แผนผังโครงสร้างทางการ
            </span>
            <h3 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
              ภาพผังโครงสร้างการบริหารองค์กร ไอเจนโก้
            </h3>
            <p class="text-sm text-[#475569] dark:text-[#94A3B8]">
              แสดงลำดับสายการบังคับบัญชา และหน่วยงานย่อยทั้งหมดตามโครงสร้างจริงของบริษัท
            </p>
          </div>

          <!-- Zoom / View Full button -->
          <button
            @click="isModalOpen = true"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88] hover:bg-[#00A852] hover:text-white transition-all self-start sm:self-auto cursor-pointer"
          >
            <ZoomIn class="w-4 h-4" />
            <span>คลิกดูภาพขยายเต็มจอ</span>
          </button>
        </div>

        <!-- Image Frame Card -->
        <div
          @click="isModalOpen = true"
          class="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#06140d] shadow-xl group cursor-pointer"
        >
          <div class="p-4 sm:p-8 flex justify-center items-center bg-black/[0.01] dark:bg-white/[0.01]">
            <img
              src="/images/about/igenco-organization-chart.jpg"
              alt="แผนผังการบริหาร บริษัท ไอเจนโก้ จำกัด (IGENCO)"
              class="max-h-[550px] w-auto object-contain rounded-2xl group-hover:scale-[1.01] transition-transform duration-500"
            >
          </div>

          <!-- Hover Overlay Guide -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
            <div class="px-5 py-2.5 rounded-full bg-white/90 dark:bg-black/90 text-[#0A1A12] dark:text-white font-mono text-xs font-bold flex items-center gap-2 shadow-2xl">
              <ZoomIn class="w-4 h-4 text-[#00A852] dark:text-[#00FF88]" />
              <span>คลิกเพื่อดูภาพแผนผังขนาดใหญ่</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           3. GOVERNANCE PRINCIPLES (หลักการบริหารองค์กรแบบคล่องตัว)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-8">
        <div class="space-y-3 max-w-3xl">
          <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#00A852] dark:text-[#00FF88]">
            MANAGEMENT PRINCIPLES // ปรัชญาการบริหาร
          </span>
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            การบริหารงานที่คล่องตัว ยืดหยุ่น และได้มาตรฐานสากล
          </h2>
          <p class="indent-8 text-base text-[#475569] dark:text-[#94A3B8] leading-[1.95] text-justify font-normal">
            ด้วยโครงสร้างแบบ <strong class="text-[#00A852] dark:text-[#00FF88]">"Small & Smart"</strong> การบริหารงานในไอเจนโก้จึงเน้นการประสานงานที่ไร้รอยต่อระหว่างฝ่ายบริหาร ฝ่ายการตลาด และสายเทคโนโลยีสารสนเทศ ทุกสายงานสามารถสื่อสารและตัดสินใจได้อย่างรวดเร็ว เพื่อตอบสนองต่อโจทย์ความต้องการของลูกค้าและการเปลี่ยนแปลงของเทคโนโลยีในทันท่วงที
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2 bg-white/40 dark:bg-white/[0.01]">
            <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">01 / คล่องตัว (Agile)</div>
            <h4 class="text-base font-bold text-[#0A1A12] dark:text-white">ตัดสินใจรวดเร็ว ไม่ซับซ้อน</h4>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ลดขั้นตอนที่ไม่จำเป็นในสายการบังคับบัญชา เพื่อส่งมอบงานได้ตรงเวลาและทันความต้องการ
            </p>
          </div>

          <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2 bg-white/40 dark:bg-white/[0.01]">
            <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">02 / มาตรฐานสากล</div>
            <h4 class="text-base font-bold text-[#0A1A12] dark:text-white">ISO/IEC 29110 Certified</h4>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ทุกฝ่ายยึดถือกฎเกณฑ์การบริหารโครงการและวิศวกรรมซอฟต์แวร์ตามมาตรฐานระดับโลก
            </p>
          </div>

          <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2 bg-white/40 dark:bg-white/[0.01]">
            <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">03 / ทีมเวิร์กเข้มแข็ง</div>
            <h4 class="text-base font-bold text-[#0A1A12] dark:text-white">Synergy & Responsibility</h4>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ทำงานร่วมกันอย่างโปร่งใส มีความรับผิดชอบ และสร้างความสำเร็จร่วมกับลูกค้าทุกองค์กร
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation to Other Sections -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/about/values" class="text-xs font-mono opacity-60 hover:opacity-100 flex items-center gap-1">
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>อ่านค่านิยมและวัฒนธรรมองค์กร</span>
          </NuxtLink>
          <span>•</span>
          <NuxtLink to="/about" class="text-xs font-mono opacity-60 hover:opacity-100">
            ภาพรวมเกี่ยวกับเรา
          </NuxtLink>
        </div>

        <NuxtLink to="/careers" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>ร่วมงานกับเรา (เปิดรับสมัครงาน)</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </main>

    <!-- Modal for Fullscreen Chart View -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      @click="isModalOpen = false"
    >
      <div
        class="relative max-w-5xl w-full bg-white dark:bg-[#071910] p-4 sm:p-6 rounded-3xl border border-white/20 shadow-2xl max-h-[90vh] overflow-auto"
        @click.stop
      >
        <div class="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#00A852] dark:bg-[#00FF88]" />
            <h4 class="text-base font-bold font-display text-[#0A1A12] dark:text-white">
              แผนผังการบริหาร บริษัท ไอเจนโก้ จำกัด (IGENCO)
            </h4>
          </div>
          <button
            @click="isModalOpen = false"
            class="px-3.5 py-1.5 rounded-full text-xs font-mono bg-black/5 dark:bg-white/10 hover:bg-[#00A852] hover:text-white transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง [ESC]
          </button>
        </div>

        <div class="flex justify-center items-center py-4">
          <img
            src="/images/about/igenco-organization-chart.jpg"
            alt="แผนผังการบริหาร บริษัท ไอเจนโก้ จำกัด (ขนาดใหญ่)"
            class="max-w-full h-auto rounded-xl"
          >
        </div>
      </div>
    </div>

    <ContactFooter />
  </div>
</template>
