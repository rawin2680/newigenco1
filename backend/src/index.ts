export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    // Automatically seed initial capabilities and cases if empty
    try {
      const existingCapabilities = await strapi.entityService.findMany('api::capability.capability', {
        limit: 1,
      })

      if (!existingCapabilities || existingCapabilities.length === 0) {
        console.log('[VERDANT STRAPI] Seeding default capabilities...')
        const defaultCapabilities = [
          {
            code: '01',
            title: 'Enterprise AI & Autonomous Workflows',
            description: 'วางระบบผู้ช่วย AI อัจฉริยะที่เชื่อมต่อกับฐานข้อมูลภายในองค์กร ช่วยวิเคราะห์ยอดขาย ตอบคำถามลูกค้าเชิงลึก และตัดสินใจทางธุรกิจแบบอัตโนมัติ 24 ชั่วโมง',
            tags: ['LLM Integration', 'Predictive Ops', 'RAG Pipeline'],
            archLayer: '[ARCH_LAYER: NEURAL_AUTOMATION_V4 // LATENCY < 18ms]',
            icon: 'BrainCircuit',
            isHighlighted: false,
            publishedAt: new Date(),
          },
          {
            code: '02',
            title: 'Interactive 3D & Spatial Web Experiences',
            description: 'เปลี่ยนหน้าเว็บธรรมดาให้กลายเป็นพื้นที่ 3 มิติแบบโต้ตอบได้ (WebGL / Three.js) สร้างการจดจำแบรนด์ที่เหนือกว่าคู่แข่งและเพิ่มระยะเวลาการมีส่วนร่วมของผู้ใช้',
            tags: ['Three.js / Shaders', 'Kinetic Typography', '60fps Motion'],
            archLayer: '[ARCH_LAYER: WEBGL_SHADER_PIPELINE // 60-120 FPS]',
            icon: 'Box',
            isHighlighted: false,
            publishedAt: new Date(),
          },
          {
            code: '03',
            title: 'High-Contrast Green Cloud Infrastructure',
            description: 'สถาปัตยกรรมคลาวด์ความเร็วสูงที่รองรับการขยายตัวแบบไร้ขีดจำกัด พร้อมระบบความปลอดภัยระดับ Zero-Trust และใช้พลังงานสะอาด 100% เพื่อองค์กรยุคยั่งยืน',
            tags: ['Edge Deployment', 'Zero-Trust Auth', 'Carbon Neutral'],
            archLayer: '[ARCH_LAYER: EDGE_COMPUTE_MESH // GREEN_ENERGY]',
            icon: 'ShieldCheck',
            isHighlighted: false,
            publishedAt: new Date(),
          },
          {
            code: '04',
            title: 'Real-Time Executive Telemetry & BI',
            description: 'รวมศูนย์ข้อมูลทุกแผนกไว้ในหน้าจอควบคุมเดียว เห็นแนวโน้มกำไร ต้นทุน และพฤติกรรมลูกค้าแบบเรียลไทม์ เพื่อการตัดสินใจที่แม่นยำและฉับไวที่สุด',
            tags: ['Real-Time Stream', 'Executive Dash', 'ROI +240%'],
            archLayer: '[ARCH_LAYER: REALTIME_TELEMETRY_BI // ROI +240%]',
            icon: 'Activity',
            isHighlighted: true,
            publishedAt: new Date(),
          },
        ]

        for (const cap of defaultCapabilities) {
          await strapi.entityService.create('api::capability.capability', {
            data: cap,
          })
        }
      }
    } catch (err) {
      console.warn('[VERDANT STRAPI] Bootstrap seed check completed.')
    }
  },
}
