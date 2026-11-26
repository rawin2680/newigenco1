<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

const email = 'siraprapa@igenco.co.th'

const jobs = [
  {
    "title": "Project Manager",
    "label": "ผู้จัดการโครงการ",
    "duties": [
      "รับผิดชอบต่อนโยบายของบริษัท ในการดำเนินการ Project management และ financial management",
      "รับผิดชอบต่องานที่สัญญาไว้กับลูกค้า ซึ่งเกี่ยวข้องกับ คุณภาพงานตาม scope และ เวลาที่กำหนดการส่งมอบ",
      "รับผิดชอบต่อการออกแบบ และ บริหารจัดการทีมงานในโครงการ ให้เกิดศักยภาพสูงสุด",
      "บริการจัดการโครงการโดยการใช้ข้อมูลต่างๆ มาประกอบการทำ Strategic Plan, Action Planและ Implementation Plan",
      "บริหารและกำหนดงบประมาณ อัตรากำลัง ให้สอดคล้องกันตามแผนการดำเนินงานของโครงการภายใต้งบประมาณและคุณภาพงานตาม Scope",
      "ควบคุม ตรวจสอบ และติดตามการดำเนินงาน อย่างใกล้ชิดตามแผนการดำเนินงานของโครงการ",
      "บริหารจัดการความเปลี่ยนแปลงด้านความต้องการ และสภาพแวดล้อมในการดำเนินงาน",
      "ควบคุม ตรวจสอบ การดำเนินงานทุกขั้นตอนให้ได้สินค้าหรือบริการที่มีคุณภาพงานตาม scope และ เวลาที่กำหนดการส่งมอบ และลูกค้าได้รับความพึงพอใจ",
      "แก้ไขปัญหา รวมทั้งข้อขัดแย้งต่าง ๆ ของทีมงานและลูกค้า",
      "วิเคราะห์ความเสี่ยง พยากรณ์ความสำเร็จของงานด้วยการวิเคราะห์ข้อมูลที่เกิดขึ้นจริงเทียบกับแผน",
      "นำเสนอ ประเมินผล และสรุปผลการดำเนินงานโครงการ พร้อมทั้งแนวทางในการปรับปรุงงานให้ดีขึ้น ฯลฯ"
    ],
    "requirements": [
      "จบการศึกษาระดับปริญญาตรีขึ้นไป สาขาวิทยาศาสตร์คอมพิวเตอร์, วิทยาการคอมพิวเตอร์, วิศวกรรมคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง",
      "ประสบการณ์ในสายงานที่เกี่ยวข้อง ไม่น้อยกว่า 5 ปี",
      "ประสบการณ์ในการบริหารโครงการขนาดกลางขึ้นไป ไม่น้อยกว่า 2 ปี",
      "ความสามารถในการสร้างสัมพันธ์ที่ดีต่อผู้อื่นและทีมงาน",
      "มีความสามารถในการเป็นผู้นำ เพื่อนำและกำหนดทิศทางให้กับทีมงาน",
      "มีความสามารถในการวิเคราะห์สถานการณ์ต่างๆ",
      "มีความสามารถในการตัดสินใจเพื่อแก้ไขปัญหาให้ดีที่สุด",
      "มีความสามารถในการนำเสนอทางเลือกที่เหมาะสม ให้กับลูกค้า",
      "มีความรอบคอบ และชัดเจน ในการปฏิบัติหน้าที่",
      "มีความสามารถในการพัฒนาตนเองและผู้อื่น",
      "มีทักษะในการติดต่อสื่อสาร และประสานงานกับหน่วยงานทั้งภายในและภายนอก",
      "พูด อ่าน เขียน สื่อสารภาษาอังกฤษ ได้"
    ]
  },
  {
    "title": "System Analyst (SA)",
    "label": "นักวิเคราะห์ระบบ",
    "duties": [
      "รวบรวม และค้นหา ข้อมูลและความต้องการของลูกค้า เพื่อใช้ในการออกแบบระบบ",
      "ตกลงกับลูกค้า เพื่อหา Scope of work / Scope of Business Requirement",
      "ออกแบบ และ สร้างแบบจำลอง การทำงานของระบบในรูปแบบ Prototype เพื่อนำมาออกแบบระบบการทำงาน และฐานข้อมูลของระบบ",
      "จัดแสดง การทำงานของ Prototype ให้กับลูกค้าและทีมงาน",
      "แสดงผล หรือ ถ่ายทอดการออกแบบ ลงในรูปแบบเอกสารเพื่อส่งให้กับทีมงาน",
      "อบรมและถ่ายทอดการออกแบบให้ทีมพัฒนา เพื่อให้เกิดความเข้าใจในการทำงาน",
      "เสนอแผนการพัฒนาระบบ (Project Plan) ที่เหมาะสม เพื่อใช้ปฏิบัติงานภายในทีมงานที่เกี่ยวข้อง",
      "ควบคุม ดูแลการทำงานของทีมพัฒนา ให้ผลิตผลงานที่ถูกต้อง ตรงตามการออกแบบ และตรงตามเวลาที่กำหนด",
      "จัดการ ทดสอบการทำงานของระบบในรูปแบบ System test และ Integration test",
      "ดูแล การทดสอบระบบจากลูกค้าแบบ Quality Assurance",
      "ดูแล อบรม และถ่ายทอดการทำงานให้ลูกค้า เพื่อการทดสอบแบบ User Acceptance Test",
      "ดูแล การอบรมการใช้งานระบบให้กับลูกค้า (User and System Training)",
      "ดูแล การบำรุงรักษาระบบในช่วงของ Maintenance Period ตลอดจนการแก้ไขข้อผิดพลาดที่พบ",
      "จัดทำเอกสารที่เกี่ยวข้องกับการออกแบบระบบต่างๆ เช่น Requirement Specification, Data Dictionary, ER-Diagram, UML, Program Specification เป็นต้น",
      "ควบคุม ดูแล การติดตั้งระบบ (Deployment) พร้อมทั้งร่วมทดสอบระบบบน Production กับลูกค้า",
      "ดูแล และจัดการ Resource ที่มี ให้ทำงานที่เหมาะสม และ ทำงานร่วมกันได้อย่างราบรื่น รวมทั้งลดความขัดแย้งที่เกิดขึ้นภายในทีมงาน",
      "เป็นที่ปรึกษาการทำงานให้กับทีมงาน ดูแล และอบรม ความรู้ที่เกี่ยวข้องให้กับทีมงานได้",
      "หากชำนาญภาษา ASP.NET (C#) เขียนได้ทั้ง Windows / Web Application จะพิจารณา เป็นพิเศษ"
    ],
    "requirements": [
      "เพศชาย/หญิง อายุไม่ต่ำกว่า 28 ปี",
      "จบการศึกษาระดับปริญญาตรีขึ้นไป สาขาวิทยาศาสตร์คอมพิวเตอร์, วิทยาการคอมพิวเตอร์, วิศวกรรมคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง",
      "มีประสบการณ์ด้านการออกแบบและวิเคราะห์ระบบงาน ไม่ต่ำกว่า 3 ปี",
      "มีความเชี่ยวชาญการออกแบบระบบธุรกิจในระดับทั่วไป General Business",
      "มีความชำนาญในการรวบรวม และค้นหา ข้อมูลและความต้องการของลูกค้า เพื่อใช้ในการออกแบบระบบ",
      "มีความรู้การใช้งานฐานข้อมูล RDBMS เช่น MS SQL, Oracle",
      "มีความอดทนและความรับผิดชอบในการทำงานภายใต้ภาวะกดดันสูงได้",
      "มีความกระตือรือร้นในการเรียนรู้เทคนิคและเทคโนโลยีใหม่ ๆ ตลอดเวลา"
    ]
  },
  {
    "title": "Programmer / Programmer Analyst",
    "label": "นักพัฒนาซอฟต์แวร์",
    "duties": [
      "พัฒนาระบบ (Develop and Program) ในเชิงสถาปัตยกรรม N-Tiers (PT - MT - DT)",
      "พัฒนา Software ด้วยหลักการ Algorithm, Validation, และ Debugging Concept",
      "ทำความเข้าใจระบบที่ Designer (SA, ASA, SI etc) ได้ออกแบบไว้",
      "ทดสอบระบบที่พัฒนาขึ้นด้วย Unit Testing",
      "ทำเอกสารที่เกี่ยวข้องได้ เช่น Test Case, Technical Specification, Technical Flow",
      "ประสานงาน/ แสดงผลงาน/ รายงานสถานะความคืบหน้าของงาน ต่อหัวหน้าทีมที่รับผิดชอบ"
    ],
    "requirements": [
      "เพศชาย/หญิง อายุไม่เกิน 30 ปี",
      "จบการศึกษาระดับปริญญาตรีขึ้นไป สาขาวิทยาศาสตร์คอมพิวเตอร์ , วิทยาการคอมพิวเตอร์, วิศวกรรมคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง",
      "Programmer มีประสบการณ์ 0-2 ปีขึ้นไปในการพัฒนา Software",
      "Programmer Analyst มีประสบการณ์ 2 ปีขึ้นไปในการพัฒนา Software",
      "มีความรู้การใช้งานฐานข้อมูล RDBMS เช่น MS SQL, Oracle",
      "มีความอดทนและความรับผิดชอบในการทำงานภายใต้ภาวะกดดันสูงได้",
      "มีความกระตือรือร้นในการเรียนรู้เทคนิคและเทคโนโลยีใหม่ ๆ ตลอดเวลา",
      "หากชำนาญภาษา PHP, ASP.NET (C#) เขียนได้ทั้ง Windows / Web Application จะพิจารณา เป็นพิเศษ"
    ]
  },
  {
    "title": "IT Support",
    "label": "เจ้าหน้าที่สนับสนุนด้านไอที",
    "duties": [],
    "requirements": [
      "วุฒิการศึกษา ปวส.-ปริญญาตรี",
      "ประสบการณ์ 0-2 ปี",
      "มีความรู้ เกี่ยวกับคอมพิวเตอร์ และสามารถติดตั้ง Windows และแก้ปัญหาเบื้องต้นได้",
      "สามารถแก้ไขปัญหาเบื้องต้นเกี่ยวกับ Printer fax และอุปกรณ์ IT อื่นๆ",
      "มีความรู้ สามารถใช้ Microsoft Office, Windows Server, Software ต่างๆ",
      "มีความรู้พื้นฐาน Network จะพิจารณาเป็นพิเศษ",
      "มีความกระตือรือร้น คิดสร้างสรรค์ และมนุษยสัมพันธ์ดี ชอบเรียนรู้สิ่งใหม่ๆ"
    ]
  }
]

const benefits = [
  "การรักษาพยาบาล ประกันสุขภาพ ประกันชีวิต ประกันอุบัติเหตุ",
  "การตรวจสุขภาพประจำปี ฉีดวัคซีนป้องกันโรคที่อันตรายต่างๆ",
  "กิจกรรมส่งเสริมคุณภาพชีวิต งานปีใหม่, สัมมนาประจำปีของบริษัทฯ",
  "การฝึกอบรม/สัมมนา/พัฒนาความรู้",
  "ทุนการศึกษา (Scholarship)",
  "เงินช่วยเหลือเฉพาะกิจ (Special Contribution)",
  "กองทุนสำรองเลี้ยงชีพ",
  "โบนัส"
]

const applicationLink = (position?: string) => {
  const subject = position ? `สมัครงานตำแหน่ง ${position}` : 'สมัครงานกับ IGENCO'
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`
}

useSeoMeta({
  title: 'สมัครงาน | บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  description: 'ดูตำแหน่งงาน หน้าที่ คุณสมบัติ และสวัสดิการ พร้อมสมัครงานกับบริษัท ไอเจนโก้ จำกัด ผ่านอีเมลฝ่ายบุคคล'
})
</script>

<template>
  <div class="min-h-screen text-slate-900 dark:text-slate-100">
    <AppHeader />
    <main class="mx-auto max-w-[1200px] space-y-12 px-5 pb-20 pt-28 sm:space-y-16 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="flex flex-wrap items-center gap-2 border-b border-current/10 pb-4 text-sm">
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-emerald-800 hover:underline dark:text-emerald-300">
          <ArrowLeft class="size-4" aria-hidden="true" /> หน้าแรก
        </NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink to="/about" class="hover:underline">เกี่ยวกับเรา</NuxtLink>
        <span aria-hidden="true">/</span>
        <span aria-current="page" class="font-semibold">สมัครงาน</span>
      </nav>

      <section aria-labelledby="careers-heading" class="mx-auto grid max-w-4xl justify-items-center gap-6 py-4 text-center sm:gap-8 sm:py-8">
        <div class="rounded-2xl border border-emerald-500/20 bg-white px-5 py-4 shadow-sm sm:px-7">
          <img src="/images/careers/igenco-logo.png" width="194" height="65" alt="IGENCO — Infinite Possibility" class="mx-auto block h-auto w-40 max-w-full sm:w-[194px]">
        </div>
        <div class="space-y-5">
          <h1 id="careers-heading" class="text-center font-display text-4xl font-black leading-tight tracking-tight text-[#022C22] dark:text-white sm:text-5xl lg:text-6xl">
            ร่วมงานกับ<span class="text-emerald-700 dark:text-emerald-300">ไอเจนโก้</span>
          </h1>
          <p class="mx-auto max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
            บริษัท ไอเจนโก้ จำกัด ต้องการผู้ร่วมงานที่มีความสามารถ ชอบความท้าทาย และแสวงหาความก้าวหน้า เพื่อร่วมพัฒนาและเติบโตไปพร้อมกับบริษัท ผู้สนใจสามารถสมัครทางอีเมลได้โดยไม่ต้องเดินทางมาที่บริษัท
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <a href="#open-positions" class="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-[#00C864] px-5 py-3 text-sm font-bold text-[#022C22] hover:bg-[#00B65B]">
              ดูตำแหน่งที่เปิดรับ <ArrowUpRight class="size-4" aria-hidden="true" />
            </a>
            <a :href="applicationLink()" class="spatial-glass inline-flex min-h-11 items-center gap-2 rounded-2xl border border-current/15 px-5 py-3 text-sm font-bold hover:border-emerald-600">
              <Mail class="size-4 shrink-0" aria-hidden="true" /> {{ email }}
            </a>
          </div>
        </div>
      </section>

      <section id="open-positions" aria-labelledby="positions-heading" class="scroll-mt-28 space-y-5">
        <h2 id="positions-heading" class="font-display text-2xl font-black sm:text-4xl">ตำแหน่งที่เปิดรับสมัคร</h2>
        <div class="space-y-4">
          <details v-for="job in jobs" :key="job.title" class="group spatial-glass rounded-3xl border border-current/10">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-3xl p-5 focus-visible:outline-emerald-600 sm:p-7 [&::-webkit-details-marker]:hidden">
              <div class="min-w-0">
                <h3 class="font-display text-lg font-bold sm:text-xl">{{ job.title }}</h3>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ job.label }}</p>
              </div>
              <ChevronDown class="size-5 shrink-0 text-emerald-700 transition-transform group-open:rotate-180 dark:text-emerald-300 motion-reduce:transition-none" aria-hidden="true" />
            </summary>
            <div class="space-y-6 border-t border-current/10 p-5 sm:p-7">
              <div class="grid gap-6" :class="{ 'lg:grid-cols-2': job.duties.length }">
                <div v-if="job.duties.length">
                  <h4 class="mb-3 font-display font-bold">หน้าที่รับผิดชอบ</h4>
                  <ol class="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
                    <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
                  </ol>
                </div>
                <div>
                  <h4 class="mb-3 font-display font-bold">คุณสมบัติผู้สมัคร</h4>
                  <ol class="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
                    <li v-for="requirement in job.requirements" :key="requirement">{{ requirement }}</li>
                  </ol>
                </div>
              </div>
              <a :href="applicationLink(job.title)" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800">
                <Mail class="size-4" aria-hidden="true" /> สมัครตำแหน่งนี้ทางอีเมล
              </a>
            </div>
          </details>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" class="space-y-5">
        <h2 id="benefits-heading" class="font-display text-2xl font-black sm:text-4xl">สวัสดิการ</h2>
        <ul class="grid gap-3 sm:grid-cols-2">
          <li v-for="benefit in benefits" :key="benefit" class="spatial-glass rounded-2xl border border-current/10 px-5 py-4 text-sm leading-relaxed sm:text-base">
            {{ benefit }}
          </li>
        </ul>
      </section>

      <section aria-labelledby="hr-heading" class="spatial-glass grid gap-5 rounded-3xl border border-emerald-500/25 p-5 sm:p-8 lg:grid-cols-2">
        <div class="space-y-3">
          <h2 id="hr-heading" class="font-display text-2xl font-black">ติดต่อฝ่ายบุคคล</h2>
          <p class="font-semibold">คุณศิรประภา เพชรทิม</p>
          <address class="flex gap-2 text-sm not-italic leading-relaxed text-slate-700 dark:text-slate-300">
            <MapPin class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            บริษัท ไอเจนโก้ จำกัด เลขที่ 89/35 อาคารจูเคี่ยวเล้ง ชั้น 3 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร 10210
          </address>
        </div>
        <div class="grid content-center gap-3 text-sm">
          <a :href="applicationLink()" class="inline-flex w-fit max-w-full items-center gap-2 break-all font-bold text-emerald-800 hover:underline dark:text-emerald-300"><Mail class="size-4 shrink-0" aria-hidden="true" />{{ email }}</a>
          <a href="tel:025233559" class="inline-flex w-fit items-center gap-2 hover:underline"><Phone class="size-4 shrink-0" aria-hidden="true" /> 0-2523-3559</a>
          <a href="tel:0635254850" class="inline-flex w-fit items-center gap-2 hover:underline"><Phone class="size-4 shrink-0" aria-hidden="true" /> 063-5254850</a>
        </div>
      </section>
    </main>
    <ContactFooter />
  </div>
</template>
