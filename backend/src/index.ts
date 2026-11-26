const weddingApp = {
  name: 'iMme Application (บันทึกงานแต่ง)',
  slug: 'imme-application',
  category: 'E-Commerce',
  badge: 'WEDDING PLANNER',
  shortDesc: 'iMme (i Merry, Merry me) แอปช่วยวางแผนงานแต่ง จัดการแขก และเก็บรูปกับคำอวยพรไว้ในที่เดียว',
  fullDetails: 'iMme Application คืออะไร?\n\niMme ช่วยคู่บ่าวสาวเตรียมงานแต่ง ตั้งแต่ค้นหาสถานที่ ส่งบัตรเชิญ ประเมินจำนวนแขกและผู้ติดตาม วางผังที่นั่ง ไปจนถึงแจ้งเตือนกำหนดการ\n\nคู่บ่าวสาวและแขกสามารถร่วมบันทึกเรื่องราว รูปภาพ บรรยากาศ และคำอวยพร ตั้งแต่ช่วงเตรียมงานจนถึงวันแต่งงาน เพื่อกลับมาเปิดดูและระลึกถึงช่วงเวลาสำคัญได้อีกครั้ง',
  features: [
    'เก็บความทรงจำของคู่บ่าวสาว โดยให้แขกร่วมบันทึกภาพและคำอวยพร',
    'ค้นหาสถานที่จัดงานแต่งจากตำแหน่งและรัศมีที่กำหนดเป็นกิโลเมตร',
    'ส่งบัตรเชิญพร้อมวันที่ สถานที่ และรายละเอียดงาน',
    'รับการตอบรับและจำนวนผู้ติดตาม เพื่อประเมินจำนวนแขกและจัดโต๊ะที่นั่ง',
    'แจ้งเตือนกำหนดการของคู่บ่าวสาวและแขกผู้ร่วมงาน',
    'ให้แขกอัปโหลดภาพ กดถูกใจ และแสดงความคิดเห็น พร้อมนำภาพไปแสดงบนโปรเจกเตอร์ผ่านเว็บไซต์ได้',
    'นำยอดกดถูกใจมาใช้จัดกิจกรรมในงาน เช่น มอบรางวัลให้ภาพที่ได้รับความนิยม',
    'แจ้งเตือนความทรงจำให้คู่บ่าวสาวและแขกผู้ร่วมงาน'
  ],
  fallbackImageUrl: '/images/products/imme-application.svg'
}

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
    // 1. Configure Public Role Permissions automatically so frontend can read public data and submit inquiries
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } })

      if (publicRole) {
        const actionsToEnable = [
          'api::inquiry.inquiry.create',
          'api::news-article.news-article.find',
          'api::news-article.news-article.findOne',
          'api::portfolio-case.portfolio-case.find',
          'api::portfolio-case.portfolio-case.findOne',
          'api::product.product.find',
          'api::product.product.findOne',
          'api::capability.capability.find',
          'api::capability.capability.findOne',
          'api::case.case.find',
          'api::case.case.findOne'
        ]

        for (const action of actionsToEnable) {
          const existing = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action,
                role: publicRole.id
              }
            })

          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id
              }
            })
          }
        }
        console.log('[IGENCO STRAPI] Public API permissions verified.')
      }
    } catch (err) {
      console.warn('[IGENCO STRAPI] Permission bootstrap skipped:', err)
    }

    // 2. Seed initial News Articles if empty
    try {
      const existingNews = await strapi.documents('api::news-article.news-article').findMany({ limit: 1 })
      if (!existingNews || existingNews.length === 0) {
        console.log('[IGENCO STRAPI] Seeding default News Articles...')
        const defaultNews = [
          {
            title: 'IGENCO ผ่านการรับรองมาตรฐาน ISO/IEC 29110',
            category: 'Enterprise Software',
            dateText: '25 กรกฎาคม 2561',
            readTime: '3 นาทีในการอ่าน',
            excerpt: 'บริษัท ไอเจนโก้ จำกัด ผ่านการรับรองมาตรฐาน ISO/IEC 29110 สำหรับการบริหารจัดการโครงการซอฟต์แวร์และการพัฒนาระบบอย่างมีประสิทธิภาพ',
            content: 'มาตรฐาน ISO/IEC 29110 ช่วยสร้างความเชื่อมั่นให้กับแบรนด์องค์กร ทำให้มีการบริหารจัดการงานคุณภาพและบริการด้านซอฟต์แวร์ที่ดี มีประสิทธิภาพ และตรวจสอบย้อนกลับได้ในทุกขั้นตอน',
            fallbackImageUrl: '/images/news/igenco-iso29110-ceremony.jpg',
            status: 'published'
          },
          {
            title: 'IGENCO ครบรอบ 8 ปี กิจกรรม CSR เพื่อสังคม',
            category: 'กิจกรรมองค์กร',
            dateText: '21 มีนาคม 2561',
            readTime: '3 นาทีในการอ่าน',
            excerpt: 'ผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด ร่วมกันจัดกิจกรรมบริจาคเงินสนับสนุนและสิ่งของเครื่องใช้จำเป็นให้กับน้องๆ ในสถานสงเคราะห์เด็กอ่อนปากเกร็ด',
            content: 'เนื่องในโอกาสครบรอบ 8 ปี แห่งการก่อตั้งบริษัท ไอเจนโก้ จำกัด คณะผู้บริหารและพนักงานได้ร่วมแบ่งปันความสุขและมอบสิ่งของจำเป็นเพื่อส่งเสริมคุณภาพชีวิตที่ดีแก่เยาวชน',
            fallbackImageUrl: '/images/news/igenco-8years-anniversary.jpg',
            status: 'published'
          },
          {
            title: 'I-SERFF Training Day สำหรับตัวแทนบริษัทประกันภัย',
            category: 'Service Development',
            dateText: '27 กุมภาพันธ์ 2558',
            readTime: '3 นาทีในการอ่าน',
            excerpt: 'ภาพกิจกรรมการจัดอบรมหลักสูตรสำหรับผู้ใช้งานตัวแทนบริษัทประกันภัย สำหรับการใช้งานระบบ I-SERFF เพื่อยื่นแบบและข้อความกรมธรรม์ผ่านระบบอิเล็กทรอนิกส์',
            content: 'การจัดอบรมเชิงปฏิบัติการการใช้งานระบบ I-SERFF ช่วยให้ตัวแทนจากบริษัทประกันภัยทั่วประเทศสามารถยื่นขอรับความเห็นชอบแบบและข้อความกรมธรรม์ต่อสำนักงาน คปภ. ได้อย่างถูกต้อง รวดเร็ว และลดข้อผิดพลาด',
            fallbackImageUrl: '/images/news/iserff-training-1.jpg',
            status: 'published'
          }
        ]

        for (const item of defaultNews) {
          await strapi.documents('api::news-article.news-article').create({
            data: item,
            status: 'published'
          })
        }
      }
    } catch (err) {
      console.warn('[IGENCO STRAPI] News seed skipped:', err)
    }

    // 3. Seed initial iGenQ Portfolio Cases if empty
    try {
      const existingPortfolio = await strapi.documents('api::portfolio-case.portfolio-case').findMany({ limit: 1 })
      if (!existingPortfolio || existingPortfolio.length === 0) {
        console.log('[IGENCO STRAPI] Seeding default iGenQ Portfolio Cases...')
        const defaultPortfolio = [
          {
            clientName: 'ที่ว่าการอำเภอสัตหีบ จังหวัดชลบุรี',
            title: 'ระบบบริหารคิวงานทะเบียนราษฎร์และบริการประชาชน',
            category: 'หน่วยงานราชการ',
            location: 'อำเภอสัตหีบ จังหวัดชลบุรี',
            servicePoints: 'เคาน์เตอร์บริการงานทะเบียน & บัตรประจำตัวประชาชน (8+ ช่องบริการ)',
            queueMode: 'ตู้กดบัตรคิว Kiosk + จอแสดงผล LED/TV + เสียงเรียกคิวอัตโนมัติ',
            highlight: 'จัดระเบียบการเข้ารับบริการประชาชน ลดความแออัดหน้าเคาน์เตอร์อย่างเป็นระบบ',
            description: 'ติดตั้งระบบบริหารคิวอัจฉริยะ iGenQ ณ ที่ว่าการอำเภอสัตหีบ จังหวัดชลบุรี เพื่อบริหารจัดการคิวประชาชนที่มาติดต่อทำบัตรประชาชน ทะเบียนบ้าน และงานทะเบียนราษฎร์',
            results: [
              'แยกประเภทคิวตามลักษณะงานได้อย่างชัดเจน',
              'มีหน้าจอแสดงผลลำดับคิวชัดเจนทั่วพื้นที่พักคอย พร้อมเสียงประกาศเรียกคิว',
              'บันทึกสถิติจำนวนผู้รับบริการและเวลาเฉลี่ยต่อรายสำหรับผู้บริหาร'
            ],
            tags: ['หน่วยงานราชการ', 'อำเภอสัตหีบ', 'Smart Queue'],
            fallbackImageUrl: '/images/products/client-sattahip.svg'
          },
          {
            clientName: 'ศูนย์บริการภาครัฐจังหวัดจันทบุรี (OSS)',
            title: 'ระบบลงทะเบียนคิวออนไลน์ & ตู้กดบัตรคิว Touch Screen (OSS)',
            category: 'หน่วยงานราชการ',
            location: 'ศาลากลางจังหวัดจันทบุรี ถ.เลียบเนิน',
            servicePoints: 'ครอบคลุม 8 หน่วยงานราชการบริการร่วม (One Stop Service)',
            queueMode: 'Touch Screen Kiosk + คิวออนไลน์ + เชื่อมโยงระบบบริการ 8 หน่วยงาน',
            highlight: 'ได้รับหนังสือรับรองผลงานอย่างเป็นทางการ (ที่ จบ ๐๐๑๗.๓/๒๑๐) ลงนามแทนผู้ว่าฯ',
            description: 'บริษัท ไอเจนโก้ จำกัด ได้รับจ้างทำเครื่องกดบัตรคิวแบบ Touch Screen พร้อมพัฒนาระบบโปรแกรมสำเร็จรูป ครอบคลุม 8 หน่วยงานหลักของจังหวัดจันทบุรี',
            results: [
              'ได้รับหนังสือรับรองผลงานอย่างเป็นทางการ ให้ไว้ ณ วันที่ ๒๖ กันยายน ๒๕๖๖',
              'เชื่อมโยงบริการ 8 หน่วยงานราชการในศูนย์บริการร่วมจังหวัดจันทบุรี',
              'ระบบทำงานเสถียรและใช้งานอย่างมีประสิทธิภาพต่อเนื่องมาจนถึงปัจจุบัน'
            ],
            tags: ['หนังสือรับรองผลงาน', 'ศาลากลางจังหวัดจันทบุรี', 'OSS'],
            fallbackImageUrl: '/images/products/igenq-cert-chanthaburi.jpg'
          },
          {
            clientName: 'บริษัท เพอร์เฟค คอมพาเนียน กรุ๊ป จำกัด (PCG)',
            title: 'ระบบบริหารคิวรถขนส่งและผู้ติดต่อคลังสินค้าขนาดใหญ่',
            category: 'องค์กรเอกชน',
            location: 'สมุทรปราการ (คลังสินค้าและโรงงาน)',
            servicePoints: 'ประตูทางเข้าโรงงาน จุดชั่งน้ำหนัก และท่าเทียบรถโหลดสินค้า',
            queueMode: 'Mobile QR e-Ticket + LINE Notify แจ้งเรียกเข้าท่าเทียบรถ',
            highlight: 'จัดการคิวรถบรรทุกและซัพพลายเออร์บนพื้นที่โรงงานขนาดใหญ่กว่า 100 ไร่',
            description: 'นำระบบ iGenQ มาประยุกต์ใช้จัดระเบียบคิวรถขนส่งสินค้าและผู้ติดต่อคลังสินค้า พนักงานขับรถสแกนรับบัตรคิวผ่านสมาร์ทโฟนและรับการแจ้งเตือนผ่าน LINE',
            results: [
              'ลดปัญหาการจราจรติดขัดบริเวณประตูทางเข้าและลานจอดรถบรรทุก',
              'ติดตามสถานะคิวรถเข้า-ออกและระยะเวลาเทียบท่าโหลดได้อย่างแม่นยำ',
              'เก็บบันทึกข้อมูลสถิติ Log การดำเนินงานแบบเรียลไทม์ตลอด 24 ชั่วโมง'
            ],
            tags: ['PCG', 'Logistics Queue', 'LINE Notify'],
            fallbackImageUrl: '/images/products/client-pcg.svg'
          },
          {
            clientName: 'โรงพยาบาลซีจีเอช (CGH Hospital)',
            title: 'ระบบบริหารคิวผู้ป่วยนอกและแผนกตรวจสุขภาพ (OPD)',
            category: 'โรงพยาบาล',
            location: 'กรุงเทพมหานคร',
            servicePoints: 'แผนกผู้ป่วยนอก (OPD), ห้องตรวจ, แผนกตรวจสุขภาพ และจุดรับยา',
            queueMode: 'e-Ticket บนมือถือ + LINE แจ้งเตือนก่อนถึงคิว + จอ Android TV',
            highlight: 'ลดเวลารอคอยและลดความแออัดในพื้นที่พักคอยโรงพยาบาลกว่า 45%',
            description: 'ติดตั้งระบบคิวอัจฉริยะ iGenQ สำหรับโรงพยาบาล ผู้ป่วยสามารถสแกน QR Code ติดตามจำนวนคิวรอผ่านสมาร์ทโฟนและรับการแจ้งเตือนผ่าน LINE',
            results: [
              'ลดความแออัดในโถงพักคอยผู้ป่วยนอกได้อย่างมีประสิทธิภาพ',
              'แจ้งเตือนผู้รับบริการล่วงหน้า 3 ลำดับผ่านระบบ LINE โดยอัตโนมัติ',
              'เชื่อมต่อหน้าจอ Android TV แสดงผลคิวตามห้องตรวจแบบเรียลไทม์'
            ],
            tags: ['CGH Hospital', 'OPD Queue', 'LINE Notify'],
            fallbackImageUrl: '/images/products/client-cgh.svg'
          }
        ]

        for (const item of defaultPortfolio) {
          await strapi.documents('api::portfolio-case.portfolio-case').create({
            data: item,
            status: 'published'
          })
        }
      }
    } catch (err) {
      console.warn('[IGENCO STRAPI] Portfolio seed skipped:', err)
    }

    // 4. Seed initial Products if empty
    try {
      const existingProducts = await strapi.documents('api::product.product').findMany({ limit: 1 })
      if (!existingProducts || existingProducts.length === 0) {
        console.log('[IGENCO STRAPI] Seeding default Products...')
        const defaultProducts = [
          {
            name: 'Regist.ai (ระบบบริหารการลงทะเบียนอัจฉริยะ)',
            slug: 'regist-ai',
            category: 'Enterprise Software',
            badge: 'ENTERPRISE GRADE',
            shortDesc: 'ระบบบริหารการลงทะเบียนและจัดการคิวอัจฉริยะ ตอบโจทย์งานสัมมนา ฝึกอบรม โรงพยาบาล และร้านอาหาร ทั้ง Online / Offline',
            features: ['ลงทะเบียนล่วงหน้าผ่าน Web/LINE', 'สแกน QR Code เช็กอินหน้างาน', 'ระบบ i-Queue จัดการคิวอัตโนมัติ'],
            fallbackImageUrl: '/images/products/regist-ai-banner.png',
            detailRoute: '/products/regist-ai'
          },
          {
            name: 'HR.ai (ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ)',
            slug: 'hr-ai',
            category: 'Enterprise Software',
            badge: 'AWARD WINNER',
            shortDesc: 'ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ ตอบโจทย์ทุกงานบริหารคน ครอบคลุม HRM, HRD และ OD รางวัล The Winner OIIO 2019',
            features: ['Web-Based HRIS/HRMS', 'รองรับ Single Sign-on (AD)', 'ระบบประเมินผลและพัฒนาบุคลากร'],
            fallbackImageUrl: '/images/products/hr-ai-office-banner.jpg',
            detailRoute: '/products/hr-ai'
          },
          {
            name: 'iGenQ (ระบบบริหารคิวอัจฉริยะ)',
            slug: 'igenq',
            category: 'Enterprise Software',
            badge: 'NEW NORMAL QUEUE',
            shortDesc: 'ระบบจัดการคิวแบบ New Normal แจ้งเตือนผ่าน LINE ไม่ต้องยืนรอ มีหนังสือรับรองผลงานจากศาลากลางจันทบุรี ซอฟต์แวร์คนไทย 100%',
            features: ['สแกน QR รับคิวทันทีไม่ต้องโหลด App', 'แจ้งเตือนถึงคิวผ่าน LINE', 'ออกเสียงเรียกผ่าน Bluetooth / Android TV'],
            fallbackImageUrl: '/images/products/igenq-poster-1.jpg',
            detailRoute: '/products/igenq'
          },
          {
            name: 'Software OnDemand (บริการพัฒนาซอฟต์แวร์ตามสั่ง)',
            slug: 'software-ondemand',
            category: 'Service Development',
            badge: 'ISO/IEC 29110',
            shortDesc: 'บริการออกแบบและพัฒนาซอฟต์แวร์ตามความต้องการเฉพาะองค์กร พัฒนาแอปพลิเคชันและระบบการทำงานระดับ Web, Mobile และ Cloud',
            features: ['วิเคราะห์และออกแบบระบบโดยทีมมืออาชีพ', 'มาตรฐานวิศวกรรมซอฟต์แวร์ ISO/IEC 29110', 'รองรับการเชื่อมต่อ API องค์กร'],
            fallbackImageUrl: '/images/products/software-ondemand.svg'
          },
          {
            name: 'OutSource Service (บริการจัดหาทีมงานไอที)',
            slug: 'outsource-service',
            category: 'Service Development',
            badge: 'DEDICATED TEAM',
            shortDesc: 'บริการจัดส่งและดูแลทีมงานผู้เชี่ยวชาญด้าน IT เข้าปฏิบัติงานร่วมกับองค์กร ทั้งแบบ On-Site และ Remote Dedicated Team',
            features: ['Programmer / Developer มืออาชีพ', 'System Analyst & QA Engineer', 'ยืดหยุ่นตามระยะเวลาโครงการ'],
            fallbackImageUrl: '/images/products/outsource-service.svg'
          },
          weddingApp
        ]

        for (const item of defaultProducts) {
          await strapi.documents('api::product.product').create({
            data: item,
            status: 'published'
          })
        }
      }
    } catch (err) {
      console.warn('[IGENCO STRAPI] Product seed skipped:', err)
    }

    try {
      const products = strapi.documents('api::product.product')
      const legacyApp = await products.findFirst({
        filters: { slug: weddingApp.slug, name: 'iMme Application (แอปพลิเคชันระบบสั่งซื้อสินค้า)' }
      })
      if (legacyApp) {
        const published = await products.findOne({ documentId: legacyApp.documentId, status: 'published' })
        await products.update({
          documentId: legacyApp.documentId,
          data: weddingApp,
          ...(published ? { status: 'published' } : {})
        })
      }
    } catch (err) {
      console.warn('[IGENCO STRAPI] iMme update skipped:', err)
    }

    // Import products that previously existed only in the frontend catalog.
    try {
      const catalogImport = strapi.store({ type: 'core', name: 'igenco', key: 'catalog-products-v1' })
      if (await catalogImport.get()) return

      const products = strapi.documents('api::product.product')
      const additions = [
        {
          name: 'i-FINSOFT – ERP',
          slug: 'i-finsoft',
          category: 'Enterprise Software',
          shortDesc: 'โปรแกรมบริหารทรัพยากรองค์กร ครอบคลุมงบประมาณ บัญชี พัสดุ บุคลากร และเงินเดือน',
          features: ['งบประมาณแบบมุ่งเน้นผลงาน', 'บัญชีการเงินและบัญชีต้นทุน', 'พัสดุและทะเบียนครุภัณฑ์', 'บุคลากรและเงินเดือน'],
          fallbackImageUrl: '/images/products/i-finsoft-logo.png',
          detailRoute: '/products/i-finsoft'
        },
        {
          name: 'i-SmartSoft',
          slug: 'i-smartsoft',
          category: 'Enterprise Software',
          shortDesc: 'โปรแกรมระบบบริหารสำนักงานอิเล็กทรอนิกส์ (e-Office)',
          features: ['สารบรรณและเอกสารอิเล็กทรอนิกส์', 'ระบบประชุมและจองห้อง', 'ใบลาและงานสำนักงานผ่านเว็บ'],
          fallbackImageUrl: '/images/products/i-smartsoft-mascot.png',
          detailRoute: '/products/i-smartsoft'
        },
        {
          name: 'i-SmartFlow',
          slug: 'i-smartflow',
          category: 'Enterprise Software',
          shortDesc: 'เครื่องมือสำหรับออกแบบกระบวนการและกำหนดเส้นทางการทำงาน (Workflow)',
          features: ['ออกแบบ Workflow แบบ Drag & Drop', 'แม่แบบและ eForm', 'Dashboard และการแจ้งเตือน'],
          fallbackImageUrl: '/images/products/i-smartflow-logo.png',
          detailRoute: '/products/i-smartflow'
        },
        {
          name: 'i-RealEstate (ระบบบริหารธุรกิจอสังหาริมทรัพย์)',
          slug: 'i-realestate',
          category: 'E-Commerce',
          shortDesc: 'ระบบบริหารจัดการงานขาย การจอง และข้อมูลโครงการอสังหาริมทรัพย์ ทั้งคอนโดมิเนียม โครงการบ้านจัดสรร และอาคารพาณิชย์',
          features: ['แสดงผังโครงการและยูนิตว่าง', 'จองออนไลน์และจัดการสัญญา', 'ติดตามงวดผ่อนดาวน์และลูกค้า'],
          fallbackImageUrl: '/images/products/i-realestate.svg'
        },
        {
          name: 'iPOS (ระบบบริหารจุดขายและการจัดการร้านค้า)',
          slug: 'ipos',
          category: 'E-Commerce',
          shortDesc: 'ระบบสำหรับธุรกิจค้าปลีก รองรับการขายหน้าร้าน ตัดสต็อกอัตโนมัติ และดูยอดขายได้ทุกที่',
          features: ['ระบบขายหน้าร้าน', 'ตัดสต็อกอัตโนมัติ', 'รายงานยอดขายและสาขา'],
          fallbackImageUrl: '/images/products/ipos.svg'
        }
      ]

      for (const product of additions) {
        const existing = await products.findFirst({
          filters: { $or: [{ slug: product.slug }, { name: product.name }] }
        })
        if (!existing) await products.create({ data: product, status: 'published' })
      }

      await catalogImport.set({ value: true })
    } catch (err) {
      console.warn('[IGENCO STRAPI] Catalog import skipped:', err)
    }
  }
}
