<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Building2, ArrowLeft, ArrowUpRight, Award, ShieldCheck, Calendar, Users, CheckCircle2, FileCheck2, Landmark, Sparkles, Quote } from 'lucide-vue-next'

useHead({
  title: 'ประวัติความเป็นมา (Heritage & Journey) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ประวัติการก่อตั้งบริษัท ไอเจนโก้ จำกัด (IGENCO) 15 มีนาคม 2553 บุคลากรผู้เชี่ยวชาญ IT ประสบการณ์กว่า 20 ปี ที่ปรึกษาขึ้นทะเบียนกระทรวงการคลัง มาตรฐาน ISO/IEC 29110 และการส่งเสริมการลงทุนจาก BOI'
    }
  ]
})

const accreditations = [
  {
    icon: Landmark,
    title: 'ที่ปรึกษาขึ้นทะเบียนกระทรวงการคลัง',
    code: 'ประเภทนิติบุคคล 4232 ระดับ 2',
    sub: 'สาขาเทคโนโลยีสารสนเทศและการสื่อสาร',
    desc: 'ได้รับการขึ้นทะเบียนที่ปรึกษาจากสำนักบริหารหนี้สาธารณะ กระทรวงการคลัง การันตีความพร้อมและคุณสมบัติระดับชาติ'
  },
  {
    icon: Award,
    title: 'มาตรฐานสากล ISO/IEC 29110:2011',
    code: 'Management Systems Certification',
    sub: 'Software Project Management & Software Implementation Process',
    desc: 'ผ่านการตรวจรับรองมาตรฐานวิศวกรรมซอฟต์แวร์ระดับสากล เพื่อให้เกิดความมั่นใจสูงสุดในผลิตภัณฑ์และบริการ'
  },
  {
    icon: ShieldCheck,
    title: 'การส่งเสริมการลงทุนจาก BOI',
    code: 'สำนักงานคณะกรรมการส่งเสริมการลงทุน',
    sub: 'ธุรกิจพัฒนาระบบเทคโนโลยีสารสนเทศด้านซอฟต์แวร์',
    desc: 'ได้รับการส่งเสริมการลงทุนจาก BOI ยืนยันสถานะความเป็นบริษัทเทคโนโลยีสัญชาติไทยอย่างแท้จริง'
  }
]

const alliances = [
  {
    name: 'depa',
    fullName: 'สำนักงานส่งเสริมเศรษฐกิจดิจิทัล',
    desc: 'ร่วมขับเคลื่อนและยกระดับอุตสาหกรรมดิจิทัลของประเทศ'
  },
  {
    name: 'Software Park Thailand',
    fullName: 'เขตอุตสาหกรรมซอฟต์แวร์แห่งประเทศไทย',
    desc: 'ร่วมกิจกรรมส่งเสริมศักยภาพและมาตรฐานผู้ประกอบการซอฟต์แวร์ไทย'
  },
  {
    name: 'ATSI',
    fullName: 'สมาคมอุตสาหกรรมซอฟต์แวร์ไทย',
    desc: 'พันธมิตรความร่วมมือด้านมาตรฐานและเครือข่ายธุรกิจซอฟต์แวร์'
  },
  {
    name: 'MOF Consultant Registry',
    fullName: 'สำนักบริหารหนี้สาธารณะ กระทรวงการคลัง',
    desc: 'ขึ้นทะเบียนที่ปรึกษาประเภทนิติบุคคล 4232 ระดับ 2'
  }
]

const services = [
  {
    code: '01',
    en: 'IT Consultant',
    th: 'การให้คำปรึกษาด้านเทคโนโลยีสารสนเทศ',
    desc: 'บริการให้คำปรึกษา วางแผน และวิเคราะห์สถาปัตยกรรมระบบงานคอมพิวเตอร์ระดับองค์กร'
  },
  {
    code: '02',
    en: 'Software Development',
    th: 'การพัฒนาระบบโปรแกรมคอมพิวเตอร์',
    desc: 'ออกแบบและพัฒนาระบบ Web Application นวัตกรรมใหม่ภายใต้แบรนด์ IGENCO'
  },
  {
    code: '03',
    en: 'IT Infrastructure',
    th: 'การวางระบบคอมพิวเตอร์และเครือข่ายสารสนเทศ',
    desc: 'วางโครงสร้างพื้นฐานระบบแม่ข่าย เครือข่ายความปลอดภัยสูง และระบบเชื่อมโยงข้อมูล'
  },
  {
    code: '04',
    en: 'Business Application',
    th: 'แอพพลิเคชั่นทางธุรกิจเฉพาะทาง',
    desc: 'โซลูชันระบบงานคอมพิวเตอร์และโปรแกรมประยุกต์เพื่อการบริหารจัดการข้อมูลครบวงจร'
  }
]
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
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">ประวัติความเป็นมา</span>
      </div>

      <!-- Header Section -->
      <div class="pb-16 border-b border-black/10 dark:border-white/10 space-y-6 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Calendar class="w-4 h-4" />
          <span>HERITAGE & JOURNEY // ประวัติความเป็นมา</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
          ประวัติความเป็นมา บริษัท ไอเจนโก้ จำกัด (IGENCO)
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          ผู้ให้บริการที่ปรึกษา ออกแบบและพัฒนาระบบคอมพิวเตอร์ เครือข่ายสารสนเทศ และ Web Application คุณภาพสูง มุ่งมั่นส่งมอบผลงานที่เหนือความประทับใจ
        </p>
      </div>

      <!-- Key Quick Numbers -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-b border-black/10 dark:border-white/10">
        <div class="space-y-1">
          <div class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-[#0A1A12] dark:text-white">
            15 มี.ค. 2553
          </div>
          <div class="text-xs font-mono tracking-wider uppercase opacity-60">
            วันจัดตั้งบริษัท IGENCO
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
            20+ ปี
          </div>
          <div class="text-xs font-mono tracking-wider uppercase opacity-60">
            ประสบการณ์ทีมงานในสายงาน IT
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-[#0A1A12] dark:text-white">
            100+ องค์กร
          </div>
          <div class="text-xs font-mono tracking-wider uppercase opacity-60">
            ภาครัฐ รัฐวิสาหกิจ และเอกชน
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
            MOF 4232
          </div>
          <div class="text-xs font-mono tracking-wider uppercase opacity-60">
            ที่ปรึกษาระดับ 2 กระทรวงการคลัง
          </div>
        </div>
      </div>

      <!-- Official Narrative Story (จัดวางรูปแบบ Editorial สวยงาม อ่านง่าย) -->
      <div class="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b border-black/10 dark:border-white/10">
        <div class="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
          <p>
            <strong>บริษัท ไอเจนโก้ จำกัด หรือ IGENCO</strong> จัดตั้งเมื่อปี <strong>15 มีนาคม 2553</strong> โดยประกอบธุรกิจบริการให้คำปรึกษา พัฒนาระบบคอมพิวเตอร์และงานเครือข่ายงานด้านเทคโนโลยีสารสนเทศให้กับสถาบันและองค์กรต่างๆ ทั้งในภาคราชการ รัฐวิสาหกิจ สถาบันการศึกษา และภาคเอกชน งานโดยขอบเขตการบริการครอบคลุมตั้งแต่การให้คำปรึกษา (IT Consultant) การพัฒนา (Software Development) และวางระบบคอมพิวเตอร์และเครือข่ายสารสนเทศ (IT infrastructure) แอพพลิเคชั่นทางธุรกิจ (Business Application) มุ่งเน้นในการบริหารองค์กรภายใต้นโยบายการทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจทุกขั้นตอนของกระบวนการพัฒนาระบบ เพื่อส่งมอบงานระบบและบริการให้ลูกค้าอย่างเหนือความประทับใจ ควบคู่กับการพัฒนาผลิตภัณฑ์ให้เป็นนวัตกรรมใหม่เพื่อเป็นทางเลือกภายใต้แบรนด์ <strong>"IGENCO"</strong> ซึ่งเป็นระบบ Web Application ที่ได้รับการการันตีคุณภาพและความไว้วางใจจากลูกค้าของเราอย่างต่อเนื่อง
          </p>

          <p>
            บริษัท ไอเจนโก้ จำกัด หรือ IGENCO ก่อตั้งจากการรวมตัวของทีมงานบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญในการออกแบบและพัฒนาโปรแกรมระบบงาน การวิเคราะห์โครงสร้างระบบ การจัดการฐานข้อมูล รวมถึงการเป็นที่ปรึกษาโครงการต่าง ๆ ที่เกี่ยวข้องกับงานทางด้านเทคโนโลยีสารสนเทศมาทั้งในภาครัฐและเอกชน นับ 100 ราย มากกว่า 20 ปี ตลอดเส้นทางการทำงานสายงาน IT ปัจจุบันบริษัทฯ เข้าร่วมกิจกรรมกับหน่วยงานที่สนับสนุนการพัฒนาซอฟต์แวร์ของประเทศ เช่น <strong>สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)</strong>, <strong>เขตอุตสาหกรรมซอฟต์แวร์แห่งประเทศไทย (Software Park Thailand)</strong>, <strong>สมาคมอุตสาหกรรมซอฟแวร์ไทย (ATSI)</strong> ตลอดจนพันธมิตรทางการค้าอื่นๆ เพื่อเป็นการเพิ่มศักยภาพด้านการพัฒนาระบบและการบริการให้ดียิ่งขึ้น
          </p>

          <p>
            นอกจากนี้บริษัทฯ ยังได้รับการส่งเสริมการลงทุนจาก <strong>BOI</strong> ในการประกอบธุรกิจเกี่ยวกับการพัฒนาระบบเทคโนโลยีสารสนเทศในด้านซอฟต์แวร์ และได้รับการขึ้นทะเบียนที่ปรึกษาจากสำนักบริหารหนี้สาธารณะ กระทรวงการคลัง ประเภทนิติบุคคล <strong>4232 ระดับ 2</strong> สาขาเทคโนโลยีสารสนเทศและการสื่อสาร และเพื่อให้เกิดความมั่นใจในผลิตภัณฑ์และบริการของ IGENCO ที่ผ่านมาตรฐานด้าน Software Project Management and Software Implementation Process ด้วย Management Systems as per <strong>ISO/IEC 29110</strong> และการให้บริการด้าน IT ซึ่งเป็นบริษัทฯ สัญชาติไทยอย่างแท้จริง
          </p>
        </div>

        <!-- Right Side: Anniversary Photo & Core Capabilities Card -->
        <div class="lg:col-span-5 space-y-6">
          <div class="overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 aspect-[4/3] bg-black/5 shadow-md">
            <img
              src="/images/news/igenco-8years-anniversary.jpg"
              alt="ภาพผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด (IGENCO)"
              class="w-full h-full object-cover"
            >
          </div>
          <div class="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            ภาพกิจกรรมผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด ณ สถานสงเคราะห์เด็กอ่อนปากเกร็ด ในวาระก้าวสู่ปีที่ 9 อย่างมั่นคง
          </div>

          <!-- Services Mini Pillar Box -->
          <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] space-y-3">
            <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#00A852] dark:text-[#00FF88]">
              ขอบเขตการให้บริการ 4 ด้านหลัก
            </div>
            <div class="space-y-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00A852] dark:bg-[#00FF88]" />
                <span class="font-bold text-[#0A1A12] dark:text-white">IT Consultant:</span>
                <span class="opacity-75">บริการให้คำปรึกษาเทคโนโลยีสารสนเทศ</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00A852] dark:bg-[#00FF88]" />
                <span class="font-bold text-[#0A1A12] dark:text-white">Software Development:</span>
                <span class="opacity-75">การพัฒนาระบบโปรแกรมคอมพิวเตอร์</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00A852] dark:bg-[#00FF88]" />
                <span class="font-bold text-[#0A1A12] dark:text-white">IT Infrastructure:</span>
                <span class="opacity-75">วางระบบคอมพิวเตอร์และเครือข่ายสารสนเทศ</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#00A852] dark:bg-[#00FF88]" />
                <span class="font-bold text-[#0A1A12] dark:text-white">Business Application:</span>
                <span class="opacity-75">แอพพลิเคชั่นทางธุรกิจ แบรนด์ IGENCO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Corporate Trust Statement Quote (Official Text) -->
      <div class="py-16 border-b border-black/10 dark:border-white/10">
        <div class="p-8 sm:p-12 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#00C864]/30 space-y-6 relative overflow-hidden">
          <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            <Quote class="w-4 h-4" />
            <span>CORPORATE TRUST & IMPACT // สัญญาแห่งความไว้วางใจ</span>
          </div>

          <blockquote class="text-lg sm:text-2xl font-display font-medium text-[#0A1A12] dark:text-[#F8FAFC] leading-relaxed">
            "จากการเอาใจใส่ต่อการพัฒนาระบบและบริการของเรา ปัจจุบันบริษัทฯ ได้รับความไว้วางใจจากลูกค้าทั้งองค์กรขนาดใหญ่ในภาครัฐและเอกชน ให้เป็นผู้พัฒนาและติดตั้งระบบงานสารสนเทศภายในองค์กร โดยระบบสามารถตอบสนองความต้องการและลดระยะเวลาในการปฏิบัติงานของผู้ใช้งาน ตลอดจนบูรณาการข้อมูลขององค์กร สามารถนำไปวางแผนทางการบริหารเพื่อพัฒนาองค์กรและศักยภาพของพนักงานให้มีประสิทธิภาพยิ่งขึ้นไป"
          </blockquote>

          <div class="flex items-center gap-3 pt-2 text-xs font-mono opacity-60">
            <span>บริษัท ไอเจนโก้ จำกัด (IGENCO)</span>
            <span>•</span>
            <span>ความไว้วางใจจากองค์กรชั้นนำระดับประเทศ</span>
          </div>
        </div>
      </div>

      <!-- Accreditations & Certifications Section -->
      <div class="py-16 space-y-10 border-b border-black/10 dark:border-white/10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            ACCREDITATIONS & RECOGNITIONS // การรับรองและการขึ้นทะเบียนภาครัฐ
          </div>
          <h2 class="text-2xl sm:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            มาตรฐานวิศวกรรมและการรับรองระดับชาติ
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="acc in accreditations"
            :key="acc.title"
            class="p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4"
          >
            <component :is="acc.icon" class="w-8 h-8 text-[#00A852] dark:text-[#00FF88]" />
            <div class="space-y-1">
              <h3 class="text-lg font-bold text-[#0A1A12] dark:text-white">{{ acc.title }}</h3>
              <div class="text-xs font-mono font-semibold text-[#00A852] dark:text-[#00FF88]">{{ acc.code }}</div>
              <div class="text-xs font-mono opacity-60">{{ acc.sub }}</div>
            </div>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed pt-2 border-t border-black/5 dark:border-white/5">
              {{ acc.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- National Ecosystem & Alliances -->
      <div class="py-16 space-y-8 border-b border-black/10 dark:border-white/10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            NATIONAL ALLIANCES // พันธมิตรและองค์กรสนับสนุน
          </div>
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            ร่วมมือกับหน่วยงานหลักที่สนับสนุนการพัฒนาซอฟต์แวร์ไทย
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="al in alliances"
            :key="al.name"
            class="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] space-y-2"
          >
            <div class="text-lg font-mono font-bold text-[#00A852] dark:text-[#00FF88]">{{ al.name }}</div>
            <div class="text-xs font-bold text-[#0A1A12] dark:text-white">{{ al.fullName }}</div>
            <div class="text-[11px] text-[#475569] dark:text-[#94A3B8] leading-relaxed">{{ al.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <NuxtLink to="/about/policy" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>อ่านนโยบายและวิสัยทัศน์องค์กรต่อไป</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
        <NuxtLink to="/about" class="text-xs font-mono opacity-60 hover:opacity-100">
          กลับสู่ภาพรวมเกี่ยวกับเรา
        </NuxtLink>
      </div>
    </main>

    <ContactFooter />
  </div>
</template>
