<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Building2, ArrowLeft, ArrowUpRight, Award, ShieldCheck, Calendar, Users, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'ประวัติความเป็นมาและก้าวสู่ปีที่ 9 - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ประวัติการก่อตั้งบริษัท ไอเจนโก้ จำกัด 15 มีนาคม 2553 จากการรวมตัวของบุคลากร IT สู่การบริการภาครัฐและเอกชนกว่า 100 องค์กร'
    }
  ]
})
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

      <!-- Header -->
      <div class="pb-16 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Calendar class="w-4 h-4" />
          <span>HERITAGE // ประวัติความเป็นมา</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
          เส้นทางแห่งความมุ่งมั่น สู่ผู้ให้บริการระบบคอมพิวเตอร์ครบวงจร
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          ก่อตั้งเมื่อวันที่ 15 มีนาคม 2553 จากการรวมตัวของบุคลากรทางด้าน IT ผู้เชี่ยวชาญ สู่การเป็นพันธมิตรที่ได้รับความไว้วางใจจากองค์กรรัฐและเอกชนกว่า 100 แห่ง
        </p>
      </div>

      <!-- Content Story -->
      <div class="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b border-black/10 dark:border-white/10">
        <div class="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
          <p>
            <strong>บริษัท ไอเจนโก้ จำกัด</strong> จัดตั้งเมื่อวันที่ <strong>15 มีนาคม 2553</strong> จากการรวมตัวของทีมงานบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญในการออกแบบและพัฒนาโปรแกรมระบบงาน การวิเคราะห์โครงสร้างระบบ การจัดการฐานข้อมูล รวมถึงการเป็นที่ปรึกษาโครงการต่าง ๆ ที่เกี่ยวข้องกับงานทางด้านเทคโนโลยีสารสนเทศมาทั้งในภาครัฐและเอกชน นับ 100 ราย
          </p>

          <p>
            โดยประกอบธุรกิจบริการให้คำปรึกษา พัฒนาระบบคอมพิวเตอร์และงานเครือข่ายงานด้านเทคโนโลยีสารสนเทศให้กับสถาบันและองค์กรต่าง ๆ ทั้งในภาคราชการ รัฐวิสาหกิจ สถาบันการศึกษา และภาคเอกชน โดยขอบเขตการบริการครอบคลุมตั้งแต่การให้คำปรึกษา (IT Consultant), การพัฒนา (Software Development), การวางระบบคอมพิวเตอร์และเครือข่ายสารสนเทศ (IT infrastructure) และแอพพลิเคชั่นทางธุรกิจ (Business Application)
          </p>

          <p>
            มุ่งเน้นในการบริหารองค์กรภายใต้นโยบายการทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจทุกขั้นตอนของกระบวนการพัฒนาระบบ เพื่อส่งมอบงานระบบและบริการให้ลูกค้าอย่างเหนือความประทับใจ ควบคู่กับการพัฒนาผลิตภัณฑ์ให้เป็นนวัตกรรมใหม่เพื่อเป็นทางเลือกภายใต้แบรนด์ "IGENCO" ซึ่งเป็นระบบ Web Application ที่ได้รับการการันตีคุณภาพและความไว้วางใจจากลูกค้าของเราอย่างต่อเนื่อง
          </p>
        </div>

        <div class="lg:col-span-5 space-y-4">
          <div class="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 aspect-[4/3] bg-black/5">
            <img
              src="/images/news/igenco-8years-anniversary.jpg"
              alt="กิจกรรมครบรอบ 8 ปี มุ่งสู่ปีที่ 9 บริษัท ไอเจนโก้ จำกัด"
              class="w-full h-full object-cover"
            >
          </div>
          <div class="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            ภาพกิจกรรมบริจาคเนื่องในวาระเปิดมาครบรอบ 8 ปี และมุ่งสู่ปีที่ 9 อย่างมั่นคง ณ สถานสงเคราะห์เด็กอ่อนปากเกร็ด (21 มีนาคม 2561)
          </div>
        </div>
      </div>

      <!-- ISO & BOI Alliance Section -->
      <div class="py-16 space-y-8 border-b border-black/10 dark:border-white/10">
        <div class="max-w-3xl space-y-3">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            STANDARDS & NATIONAL SUPPORT // มาตรฐานและการสนับสนุน
          </div>
          <h2 class="text-2xl sm:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            การรับรองมาตรฐานสากล ISO/IEC 29110 และการส่งเสริมจาก BOI
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-8 rounded-2xl border border-black/10 dark:border-white/10 space-y-4">
            <div class="flex items-center gap-3">
              <Award class="w-6 h-6 text-[#00A852] dark:text-[#00FF88]" />
              <h3 class="text-xl font-bold">มาตรฐานสากล ISO/IEC 29110</h3>
            </div>
            <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ผ่านการรับรองมาตรฐานวิศวกรรมซอฟต์แวร์ระดับสากล ISO/IEC 29110 ด้าน Project Management และ Software Implementation จากสถาบัน TÜV NORD
            </p>
            <NuxtLink to="/news/1" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
              <span>ดูเอกสารและรายละเอียดใบรับรอง</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>

          <div class="p-8 rounded-2xl border border-black/10 dark:border-white/10 space-y-4">
            <div class="flex items-center gap-3">
              <ShieldCheck class="w-6 h-6 text-[#00A852] dark:text-[#00FF88]" />
              <h3 class="text-xl font-bold">การส่งเสริมการลงทุนจาก BOI</h3>
            </div>
            <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ได้รับการส่งเสริมการลงทุนจากสำนักงานคณะกรรมการส่งเสริมการลงทุน (BOI) ร่วมมือกับ Software Park Thailand และ SIPA เพื่อยืนยันสถานะบริษัทซอฟต์แวร์สัญชาติไทยแท้
            </p>
            <NuxtLink to="/about" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
              <span>กลับสู่หน้าภาพรวมเกี่ยวกับเรา</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <ContactFooter />
  </div>
</template>
