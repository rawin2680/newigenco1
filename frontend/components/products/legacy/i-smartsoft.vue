<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ChevronDown, ChevronRight, Phone } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

const modules = [
  {
    title: "ระบบสารบรรณอิเล็กทรอนิกส์",
    english: "eDocument Flow System",
    description: "ระบบระบบงานสารบรรณอิเล็กทรอนิกส์ ใช้สำหรับการบริหารงานด้านเอกสารตามหนังสือราชการทุกประเภท ตั้งแต่กระบวนการสร้างหนังสือ การรับหนังสือ การจัดเก็บเอกสารเข้าสู่ระบบ และสามารถส่งต่อเพื่อลงนามในเอกสาร หรือ ส่งเข้าระบบหนังสือเวียน มีระบบลงนามรับทราบในเอกสาร โดยทำงานผ่านระบบแบบออนไลน์ รองรับระเบียบสำนักนายกรัฐมนตรีว่าด้วยงานสารบรรณฯกำหนดสิทธิการใช้งานแต่ละระดับผู้ใช้งาน ลดการใช้กระดาษ ประหยัดเวลาและค่าใช้จ่าย สะดวกในการจัดเก็บและค้นหา ทำงานในลักษณะ Web base ไม่ต้องติดตั้งโปรแกรมที่เครื่องผู้ใช้งาน"
  },
  {
    title: "ระบบจัดเก็บเอกสารอิเล็กทรอนิกส์",
    english: "eDocument Management System",
    description: "ระบบบริหารสำนักงานอัติโนมัติได้รับการพัฒนาและออกแบบให้เหมาะสมกับเทคโนโลยีสมัยใหม่ ที่มุ่งเน้นให้องค์กรเป็นองค์กรอัจฉริยะ ลดการใช้พลังงาน ประหยัดค่าใช้จ่ายโดยการใช้ระบบคอมพิวเตอร์มาใช้ในองค์กรซึ่งมีความสะดวก ง่ายต่อการการจัดเก็บเอกสารและการสืบค้น รวมถึงข้อมูลชนิดต่างๆ ที่อยู่ในรูปของไฟล์อิเล็กทรอนิกส์มีความยืดหยุ่นสูงในการจัดโครงสร้างของการจัดเก็บแฟ้ม เอกสาร โดยไม่จำกัดจำนวน และระดับชั้น สามารถกำหนดรูปแบบการจัดเก็บข้อมูล การสืบค้นข้อมูล และการแสดงผลข้อมูล ได้อย่างง่ายดาย และมีความยืดหยุ่นสูง และมีรูปแบบส่วนติดต่อผู้ใช้งานที่สามารถเข้าใจได้ง่าย และใช้งานได้สะดวกตามฟังก์ชั่นการทำงานอย่างครบถ้วนตามความต้องการด้านสำนักงานอย่างอัตโนมัติและอย่างมีประสิทธิภาพ"
  },
  {
    title: "ระบบจองห้องประชุมออนไลน์",
    english: "eRoom Management System",
    description: "ระบบบริหารจองห้องประชุม ได้รับการพัฒนาและออกแบบให้เหมาะสมกับเทคโนโลยีสมัยใหม่ ที่มุ่งเน้นให้องค์กรเป็นองค์กรอัจฉริยะ ลดการใช้พลังงาน ประหยัดค่าใช้จ่ายโดยการใช้ระบบคอมพิวเตอร์มาใช้ในองค์กรซึ่งมีความสะดวก เป็นระบบที่ช่วยให้ผู้ใช้งานสามารถทำการจองห้องประชุมได้สะดวกสบายยิ่งขึ้น ใช้งานได้ง่ายมีรายละเอียดการจองต่างๆ เพื่อง่ายต่อผู้ใช้งานในการทำการจองห้องประชุม การสืบค้นข้อมูล และการแสดงผลข้อมูล ได้อย่างง่ายดาย และมีความยืดหยุ่นสูง และใช้งานได้สะดวกตามฟังก์ชั่นการทำงานอย่างครบถ้วนตามความต้องการด้านสำนักงานอย่างอัตโนมัติและอย่างมีประสิทธิภาพ"
  },
  {
    title: "ระบบจัดการประชุมออนไลน์",
    english: "eMeeting Management System",
    description: "ระบบจัดการประชุมออนไลน์ ได้รับการพัฒนาและออกแบบให้เหมาะสมกับเทคโนโลยีสมัยใหม่ ที่มุ่งเน้นให้องค์กรเป็นองค์กรอัจฉริยะ ลดการใช้พลังงาน ประหยัดค่าใช้จ่ายโดยการใช้ระบบคอมพิวเตอร์มาใช้ในองค์กรซึ่งมีความสะดวก เป็นระบบที่ช่วยให้การจัดการประชุมเป็นเรื่องง่าย สะดวก รวดเร็ว ลดการใช้กระดาษ 100% เพื่อให้ผู้ใช้งานจัดหัวข้อการประชุม การเชิญประชุม การจัดการประชุมแบบออนไลน์ การลงมติการประชุม การสืบค้นข้อมูล และการแสดงผลข้อมูล ตลอดจนการเผยแพร่การประชุมได้อย่างง่ายดาย และมีความยืดหยุ่นสูง และใช้งานได้สะดวกตามฟังก์ชั่นการทำงานอย่างครบถ้วนตามความต้องการด้านสำนักงานอย่างอัตโนมัติและอย่างมีประสิทธิภาพ"
  },
  {
    title: "ระบบปฎิทินนัดหมาย",
    english: "e-Calendar management System",
    description: "ระบบปฎิทินนัดหมาย เป็นระบบที่ช่วยให้การนัดหมายต่างๆ รวมถึงกิจกรรมภายในองค์กรเป็นเรื่องง่าย สะดวก รวดเร็ว สามารถแสดงผลข้อมูลและการแจ้งเตือนกิจกรรมได้ทันที มีฟังก์ชั่นการตอบรับ/ปฎิเสธการนัดหมายการเข้าร่วมกิจกรรม หรือการตรวจสอบสถานะกิจกรรมต่างๆ ผ่านหน้าจอปฎิทินนัดหมายส่วนบุคคล สามารถใช้งานได้สะดวกตามฟังก์ชั่นการทำงานอย่างครบถ้วนตามความต้องการด้านสำนักงานอย่างอัตโนมัติและอย่างมีประสิทธิภาพ"
  },
  {
    title: "ระบบใบลาออนไลน์",
    english: "e-Leave management System",
    description: "ระบบใบลาออนไลน์สำหรับพนักงาน เจ้าหน้าที่ ยื่นใบลาผ่านระบบออนไลน์ ตามสิทธิปรเภทการลาของพนักงาน การจัดการวันลาสะสม การออกรายงานสถิติการลาพนักงาน การอนุมัติการลาสำหรับหัวหน้างานหรือผู้บริหาร สามารถใช้งานได้สะดวกตามฟังก์ชั่นการทำงานอย่างครบถ้วนตามความต้องการด้านสำนักงานอย่างอัตโนมัติและอย่างมีประสิทธิภาพ"
  },
  {
    title: "ระบบสนับสนุนการปฎิบัติงานนอกสำนักงาน",
    english: "Time and Work from home",
    description: "ระบบการลงเวลาเข้าปฎิบัติงานของบุคลากรทั้งที่สำนักงาน หรือการลงเวลาผ่านระบบด้วยตำแหน่ง GPS รวมถึงการบันทึกผลการปฎิบัติงานประจำวันเพื่อรายงานต่อผู้บังคับบัญชาโดยตรง กระบวนการขออนุมัติการปฎิบัติงาน WFH สะดวกตามฟังก์ชั่นการทำงานอย่างครบถ้วนตามความต้องการด้านสำนักงานอย่างอัตโนมัติและอย่างมีประสิทธิภาพ"
  },
  {
    title: "ระบบบริหารงานยานพาหนะ",
    english: "eCar management System",
    description: "ระบบบริหารยานพานหะ ได้รับการพัฒนาและออกแบบให้เหมาะสมกับเทคโนโลยีสมัยใหม่ ที่มุ่งเน้นให้องค์กรเป็นองค์กรอัจฉริยะ ลดการใช้พลังงาน ประหยัดค่าใช้จ่ายโดยการใช้ระบบคอมพิวเตอร์มาใช้ในองค์กรซึ่งมีความสะดวก เป็นระบบที่ช่วยให้การบริหารยานพาหนะ สะดวก รวดเร็ว ลดการใช้กระดาษ 100% รองรับทะเบียนประวัติรถ การซ่อมบำรุง การขออนุญาตใช้รถแบบออนไลน์ การอนุมัติการจัดรถ การบันทึกค่าใช้จ่าย การประเมินพนักงานขับรถ การทำผิดกฎจราจร ประวัติการเกิดอุบัติเหตุ การต่อภาษีประจำปี ฟังก์ชั่นการทำงานอย่างครบถ้วนตามความต้องการด้านสำนักงานอย่างอัตโนมัติและอย่างมีประสิทธิภาพ"
  },
  {
    title: "ระบบจัดการองค์ความรู้ KM",
    description: "ระบบการเขียนบทความองค์ความรู้ต่างๆ สำหรับเจ้าหน้าที่หรือพนักงานในองค์กร โดยสามารถแบ่งตามหมวดหมู่บทความ สามารถเผยแพร่บทความหรือเก็บเป็นส่วนบุคคลได้ รวมทั้งยังสามารถแสดงคววามคิดเห็นในบทความ เชื่อมโยงกับโปรแกรม Social Media ต่างๅ เช่น Facebbook, twitter เป็นต้น"
  },
  {
    title: "ระบบบริหารครุภัณฑ์",
    english: "Asset Management System",
    description: "ระบบบริหารจัดการทะเบียนครุภัณฑ์องค์กร การบริหารจัดการทรัพย์สิน การบันทึกประวัติ การโอนย้าย การยืมคืน การคิดค่าเสื่อมราคา การตรวจนับประจำปีผ่าน QR Code ได้อย่างสะดวกมีประสิทธิภาพ"
  },
]

useHead({
  title: 'i-SMARTSOFT | บริษัท ไอเจนโก้ จำกัด',
  meta: [{ name: 'description', content: 'ระบบบริหารสำนักงานอิเล็กทรอนิกส์ i-SMARTSOFT ครอบคลุมงานสารบรรณ เอกสาร การประชุม และงานสำนักงาน 10 ระบบ' }]
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />

    <main class="smartsoft-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-20 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="group inline-flex items-center gap-2 text-sm font-bold text-yellow-800 hover:underline dark:text-yellow-300">
          <ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
        <div class="hidden items-center gap-2 text-xs opacity-75 sm:flex">
          <NuxtLink to="/">หน้าแรก</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <NuxtLink to="/#products">ผลิตภัณฑ์</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <span aria-current="page">i-SMARTSOFT</span>
        </div>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <div>
            <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl lg:text-6xl">
              i-<span class="text-yellow-700 dark:text-yellow-300">SMARTSOFT</span>
            </h1>
            <p class="mt-3 font-display text-lg font-bold text-yellow-800 dark:text-yellow-300 sm:text-2xl">ระบบบริหารสำนักงานอิเล็กทรอนิกส์</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Office Automation Systems (e-Office)</p>
          </div>
          <div class="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
            <p>
              i-SmartSoft คือ โปรแกรมระบบบริหารสำนักงานอัติโนมัติ (e-Office) สำหรับหน่วยงานภาครัฐ รัฐวิสาหกิจ องค์กรมหาชน และรวมถึงหน่วยงานภาคเอกชน โปรแกรมที่ได้พัฒนาและออกแบบให้เหมาะสมและง่ายต่อการจัดการเอกสารภายในสำนักงานแบบอัตโนมัติรองรับการทำงานทั้งภาษาไทยและภาษาอังกฤษ ซึ่งเป็นการลดภาระในการบริหารงานด้านเอกสาร โปรแกรม มีฟังก์ชั่นการทำงานมากมาย สามารถอำนวยความสะดวกในการปฎิบัติงานด้านสำนักงานครบวงจรแบบอัตโนมัติมีประสิทธิภาพ ทำงานในลักษณะ Web Application สามารถรองรับการปฏิบัติงานของผู้ใช้งานได้พร้อม ๆ กันไม่จำกัดจำนวนผู้ใช้ ครอบคลุมกระบวนการปฎิบัติงานต่างๆ ดังต่อไปนี้
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="#smartsoft-contact" class="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#422006] shadow-sm hover:bg-yellow-500">
              นัดสาธิตระบบ
              <ArrowUpRight class="size-4" aria-hidden="true" />
            </a>
            <a href="#smartsoft-modules" class="spatial-glass inline-flex items-center gap-2 rounded-2xl border border-yellow-500/30 px-5 py-3 text-sm font-bold hover:border-yellow-500">ดูระบบงานทั้ง 10 ระบบ</a>
          </div>
        </div>
        <div class="spatial-glass rounded-3xl border border-yellow-500/20 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img src="/images/products/i-smartsoft-mascot.png" alt="มาสคอต i-SMARTSOFT" class="mx-auto aspect-square w-full max-w-56 object-contain">
        </div>
      </section>

      <section aria-labelledby="smartsoft-modules" class="space-y-6">
        <h2 id="smartsoft-modules" class="scroll-mt-28 font-display text-2xl font-black text-[#022C22] dark:text-white sm:text-4xl">ระบบงานของ i-SMARTSOFT</h2>
        <div class="grid items-start gap-5 md:grid-cols-2">
          <details v-for="module in modules" :key="module.title" class="group spatial-glass rounded-2xl border border-current/10 p-5">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm focus-visible:outline-yellow-600 [&::-webkit-details-marker]:hidden">
              <span>
                <span class="block font-display text-base font-bold sm:text-lg">{{ module.title }}</span>
                <span v-if="module.english" lang="en" class="mt-1 block text-xs text-slate-600 dark:text-slate-300">{{ module.english }}</span>
              </span>
              <ChevronDown class="size-5 shrink-0 text-yellow-700 transition-transform group-open:rotate-180 dark:text-yellow-300" aria-hidden="true" />
            </summary>
            <p class="mt-4 border-t border-current/10 pt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{{ module.description }}</p>
          </details>
        </div>
      </section>

      <section id="smartsoft-contact" class="spatial-glass flex scroll-mt-28 flex-wrap items-center justify-between gap-5 rounded-3xl border border-yellow-500/25 p-6 sm:p-8">
        <div class="space-y-2">
          <h2 class="font-display text-2xl font-black text-[#022C22] dark:text-white">ติดต่อสอบถามและนัดสาธิตระบบ</h2>
          <p class="text-sm text-slate-700 dark:text-slate-300">ฝ่ายการตลาดและการขาย · คุณภณิดาพร จูมมณี</p>
        </div>
        <a href="tel:+66962949236" class="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#422006] hover:bg-yellow-500">
          <Phone class="size-4" aria-hidden="true" />
          โทร 09 6294 9236
        </a>
      </section>
    </main>

    <ContactFooter />
  </div>
</template>

<style scoped>
.smartsoft-theme {
  --heading-accent-end: #854d0e;
  --heading-signal: #eab308;
}

:global(html.dark) .smartsoft-theme {
  --heading-accent-end: #fef08a;
  --heading-signal: #facc15;
}
</style>
