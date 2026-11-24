export interface FlowchartStep {
  id: string
  code: string
  title: string
  description: string
  inputs: string[]
  outputs: string[]
}

export interface NewsFlowchart {
  id: string
  figureNumber: string
  title: string
  englishTitle: string
  description: string
  image?: string
  steps: FlowchartStep[]
}

export interface NewsAuthor {
  name: string
  role: string
  avatar: string
  bio?: string
}

export interface NewsItem {
  id: number
  title: string
  subtitle?: string
  date: string
  publishedDateRaw?: string
  category: string
  readTime: string
  summary: string
  fullContent: string[]
  aiSummary: string[]
  image: string
  isFeatured?: boolean
  author: NewsAuthor
  rating: {
    score: number
    count: number
  }
  likes: number
  certifier?: {
    organization: string
    certificateDate: string
    standard: string
    scope: string
    logoText: string
    logoImage?: string
  }
  flowcharts?: NewsFlowchart[]
}

export const useNews = () => {
  const newsList: NewsItem[] = [
    {
      id: 1,
      title: 'IGENCO ผ่านการรับรองมาตรฐาน ISO/IEC 29110',
      subtitle: 'กระบวนการด้านการบริหารโครงการและกระบวนการด้านการสร้างซอฟต์แวร์',
      date: '25 กรกฎาคม 2561',
      publishedDateRaw: '2018-07-25',
      category: 'Enterprise Software',
      readTime: '3 นาทีในการอ่าน',
      isFeatured: true,
      summary: 'มาตรฐาน ISO 29110 ช่วยสร้างความเชื่อมั่นให้กับแบรนด์องค์กร ทำให้มีการบริหารจัดการงานคุณภาพและบริการด้านซอฟต์แวร์ที่ดี มีประสิทธิภาพและมีศักยภาพในการดำเนินธุรกิจขององค์กร อีกทั้งยังสร้างความน่าเชื่อถือให้กับคู่ค้าและลูกค้าทั้งในระดับประเทศและระดับสากล',
      author: {
        name: 'นายเกรียงไกร ทองบุรี',
        role: 'ผู้จัดการฝ่ายบริหารโครงการและควบคุมคุณภาพซอฟต์แวร์ (Project Manager & Quality Assurance Lead)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        bio: 'ผู้เชี่ยวชาญด้านมาตรฐานวิศวกรรมซอฟต์แวร์ ISO/IEC 29110 และการบริหารงานระบบสารสนเทศระดับองค์กร IGENCO'
      },
      rating: {
        score: 5.0,
        count: 48
      },
      likes: 124,
      certifier: {
        organization: 'TÜV NORD (Thailand) Co., Ltd.',
        certificateDate: '25 กรกฎาคม 2561',
        standard: 'ISO/IEC 29110 (Entry Profile)',
        scope: 'Software Implementation Process and Project Management Process',
        logoText: 'TÜV NORD CERTIFIED',
        logoImage: '/images/news/tuv-nord-iso29110-logo.png'
      },
      fullContent: [
        'มาตรฐาน ISO 29110 ช่วยสร้างความเชื่อมั่นให้กับแบรนด์องค์กร ทำให้มีการบริหารจัดการงานคุณภาพและบริการด้านซอฟต์แวร์ที่ดี มีประสิทธิภาพและมีศักยภาพในการดำเนินธุรกิจขององค์กร อีกทั้งยังสร้างความน่าเชื่อถือให้กับคู่ค้าและลูกค้าทั้งในระดับประเทศและระดับสากล',
        'เพื่อเป็นการสร้างความเชื่อมั่นให้กับลูกค้า และมาตรฐานด้านการส่งมอบผลงาน บริษัท ไอเจนโก้ จำกัด (IGENCO) จึงได้เข้าร่วมโครงการส่งเสริมให้ผู้ประกอบการได้รับมาตรฐาน ISO 29110 และได้รับการประเมินรับรองจาก TÜV NORD (Thailand) Co., Ltd. ซึ่งเป็น Certifier สากล เมื่อวันที่ 25 กรกฎาคม 2561 ฉบับใบรับรองตามขอบข่ายการประเมินด้านซอฟต์แวร์ (Software Implementation Process and Project Management Process)',
        'มาตรฐาน ISO 29110 (Software Engineering-Lifecycle Profiles for Very Small Entities (VSEs)) เป็นมาตรฐานที่มีการรับรองคุณภาพกระบวนการพัฒนาซอฟต์แวร์สำหรับหน่วยงานขนาดเล็ก ที่พัฒนาโดยคณะทำงาน ISO/IEC JTC 1/SC 7/WG 24 และสถาบันมาตรฐานซอฟต์แวร์แห่งชาติ ประเทศสหรัฐอเมริกา (SEI) โดยบูรณาการมาตรฐาน ISO 15504 (SPICE) และ CMMI เข้าด้วยกัน เพื่อรองรับการพัฒนาซอฟต์แวร์อย่างเป็นระบบ ทั้งยังเป็นแนวทางนำไปสู่การพัฒนาซอฟต์แวร์ขั้นสูงต่อไป (Software Process Improvement)',
        'โดยที่มาตรฐาน ISO 29110 ให้ความสำคัญในกระบวนการเริ่มต้นสำหรับระดับ Entry Profile อยู่ 2 กระบวนการหลัก คือกระบวนการบริหารงานโครงการ (Project Management) และกระบวนการด้านการสร้างซอฟต์แวร์ (Software Implementation) ซึ่งครอบคลุมทุกวงจรการพัฒนาซอฟต์แวร์คุณภาพระดับองค์กร'
      ],
      aiSummary: [
        'IGENCO ผ่านการรับรองมาตรฐานสากล ISO/IEC 29110 จากสถาบัน TÜV NORD (Thailand) Co., Ltd.',
        'ครอบคลุม 2 กระบวนการหลัก: การบริหารโครงการ (PM) และการสร้างซอฟต์แวร์ (SI) ตามมาตรฐานสากล SEI & CMMI',
        'ยกระดับความเชื่อมั่นให้ลูกค้าองค์กรภาครัฐและเอกชน มั่นใจในคุณภาพการส่งมอบงานตรงเวลาและไร้ข้อผิดพลาด'
      ],
      flowcharts: [
        {
          id: 'pm-flow',
          figureNumber: 'Figure 3',
          title: 'กระบวนการบริหารงานโครงการ',
          englishTitle: 'Project Management Process Diagram (PM)',
          description: 'โครงสร้างกระบวนการบริหารจัดการโครงการ 4 ระยะหลัก เพื่อควบคุมต้นทุน กำหนดการส่งมอบ และคุณภาพของระบบตามมาตรฐานสากล',
          image: '/images/news/iso29110-project-management-diagram.jpg',
          steps: [
            {
              id: 'pm-1',
              code: 'PM.1',
              title: 'Project Planning (การวางแผนโครงการ)',
              description: 'กำหนดขอบเขตงาน ทรัพยากร ทีมงาน งบประมาณ และตารางเวลาปฏิบัติงานอย่างละเอียดร่วมกับลูกค้า',
              inputs: ['Statement of Work', 'Customer Requirements'],
              outputs: ['Project Plan', 'WBS Schedule']
            },
            {
              id: 'pm-2',
              code: 'PM.2',
              title: 'Project Plan Execution (การดำเนินงานตามแผน)',
              description: 'จัดสรรทีมงาน มอบหมายภาระงาน และกำกับดูแลการสร้างซอฟต์แวร์ตามกรอบระยะเวลาที่กำหนด',
              inputs: ['Project Plan', 'Resource Allocation'],
              outputs: ['Work Products', 'Progress Reports']
            },
            {
              id: 'pm-3',
              code: 'PM.3',
              title: 'Project Assessment & Control (การประเมินและควบคุม)',
              description: 'ติดตามความคืบหน้า ตรวจสอบคุณภาพ และจัดการความเสี่ยง (Risk Management) พร้อมรับมือการเปลี่ยนแปลง',
              inputs: ['Progress Metrics', 'Issue Log'],
              outputs: ['Corrective Actions', 'Status Review']
            },
            {
              id: 'pm-4',
              code: 'PM.4',
              title: 'Project Closure (การปิดโครงการและส่งมอบ)',
              description: 'ส่งมอบผลงานฉบับสมบูรณ์ ได้รับการตรวจรับจากลูกค้า พร้อมบันทึก Lessons Learned เพื่อพัฒนาในโครงการต่อไป',
              inputs: ['Completed System', 'Test Acceptance'],
              outputs: ['Customer Acceptance Record', 'Project Archive']
            }
          ]
        },
        {
          id: 'si-flow',
          figureNumber: 'Figure 4',
          title: 'กระบวนการด้านการสร้างซอฟต์แวร์',
          englishTitle: 'Software Implementation Process Diagram (SI)',
          description: 'วงจรการพัฒนาซอฟต์แวร์เชิงวิศวกรรม 6 ขั้นตอนอย่างเป็นระบบ จากการวิเคราะห์ความต้องการสู่การส่งมอบและติดตั้ง',
          image: '/images/news/iso29110-software-implementation-diagram.jpg',
          steps: [
            {
              id: 'si-1',
              code: 'SI.1',
              title: 'SI Initiation (การเริ่มต้นกระบวนการสร้าง)',
              description: 'ทบทวนแผนโครงการ จัดเตรียมสภาพแวดล้อมเครื่องมือ และเตรียมทีมพัฒนาให้พร้อมสำหรับงาน',
              inputs: ['Project Plan'],
              outputs: ['Environment Setup', 'Baseline Repository']
            },
            {
              id: 'si-2',
              code: 'SI.2',
              title: 'Requirements Analysis (การวิเคราะห์ความต้องการ)',
              description: 'วิเคราะห์ความต้องการของระบบทั้ง Functional & Non-Functional อย่างรัดกุม',
              inputs: ['Business Needs', 'User Stories'],
              outputs: ['Software Requirements Spec (SRS)']
            },
            {
              id: 'si-3',
              code: 'SI.3',
              title: 'Architectural & Detailed Design (การออกแบบสถาปัตยกรรม)',
              description: 'ออกแบบโครงสร้างระบบ ฐานข้อมูล และ UI/UX เพื่อให้ระบบรองรับการขยายตัวและความปลอดภัยสูงสุด',
              inputs: ['SRS Specification'],
              outputs: ['System Architecture', 'Database Schema']
            },
            {
              id: 'si-4',
              code: 'SI.4',
              title: 'Software Construction (การเขียนและสร้างโค้ด)',
              description: 'พัฒนาโค้ดตามมาตรฐาน Clean Code พร้อมทำ Unit Testing ตรวจสอบความถูกต้องรายโมดูล',
              inputs: ['Design Specifications'],
              outputs: ['Source Code', 'Unit Test Results']
            },
            {
              id: 'si-5',
              code: 'SI.5',
              title: 'Integration & Tests (การรวมระบบและทดสอบ)',
              description: 'รวมโมดูลทั้งหมดเข้าด้วยกัน ทดสอบ Integration Test, Performance Test และ System Test',
              inputs: ['Software Modules'],
              outputs: ['Tested Build', 'Traceability Matrix']
            },
            {
              id: 'si-6',
              code: 'SI.6',
              title: 'Product Delivery (การส่งมอบผลิตภัณฑ์)',
              description: 'ติดตั้งระบบบน Production ส่งมอบคู่มือผู้ใช้ และจัดอบรมการใช้งานจริงแก่บุคลากรของลูกค้า',
              inputs: ['Verified System', 'User Manual'],
              outputs: ['Production Deployment', 'User Acceptance Sign-off']
            }
          ]
        }
      ],
      image: '/images/news/igenco-iso29110-ceremony.jpg'
    },
    {
      id: 2,
      title: 'IGENCO ครบรอบ 8 ปี',
      date: '21 มีนาคม 2561',
      publishedDateRaw: '2018-03-21',
      category: 'กิจกรรมองค์กร',
      readTime: '2 นาทีในการอ่าน',
      summary: 'วันที่ 21 มีนาคม 2561 ผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด ร่วมกันจัดกิจกรรมมอบทุนการศึกษาแก่นักเรียนยากจนและมอบสิ่งของเครื่องใช้จำเป็นให้แก่โรงเรียนในชนบท เพื่อเป็นการตอบแทนสังคม',
      author: {
        name: 'ทีมงานประชาสัมพันธ์ IGENCO',
        role: 'Corporate Communications & CSR Team',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      rating: {
        score: 5.0,
        count: 32
      },
      likes: 95,
      fullContent: [
        'วันที่ 21 มีนาคม 2561 ผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด ร่วมกันจัดกิจกรรมมอบทุนการศึกษาแก่นักเรียนยากจนและมอบสิ่งของเครื่องใช้จำเป็นให้แก่โรงเรียนในชนบท ในโอกาสที่บริษัทฯ ได้เปิดดำเนินการมาครบ 8 ปี',
        'กิจกรรมนี้จัดขึ้นเพื่อร่วมเป็นส่วนหนึ่งในการสนับสนุนการศึกษาของเยาวชนไทย และสร้างคุณค่าตอบแทนสู่สังคมอย่างยั่งยืน โดยทีมงานได้ร่วมกันมอบอุปกรณ์การเรียนและทุนพัฒนาสถานศึกษา'
      ],
      aiSummary: [
        'บริษัท ไอเจนโก้ จำกัด ฉลองวาระครบรอบ 8 ปีแห่งการดำเนินธุรกิจ',
        'จัดกิจกรรม CSR มอบทุนการศึกษาและสิ่งของจำเป็นแก่โรงเรียนในชนบท',
        'ตอกย้ำเจตนารมณ์ในการตอบแทนสังคมและสนับสนุนการศึกษาของเยาวชน'
      ],
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'I-SERFF Training Day',
      date: '27 กุมภาพันธ์ 2558',
      publishedDateRaw: '2015-02-27',
      category: 'Service Development',
      readTime: '2 นาทีในการอ่าน',
      summary: 'ภาพกิจกรรมการจัดอบรมหลักสูตรสำหรับผู้ใช้งานตัวแทนบริษัทประกันภัย สำหรับการใช้งานระบบ I-SERFF โดยความร่วมมือจาก สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)',
      author: {
        name: 'ฝ่ายบริการและฝึกอบรม IGENCO',
        role: 'Client Training & Implementation Specialist',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
      },
      rating: {
        score: 4.9,
        count: 28
      },
      likes: 64,
      fullContent: [
        'ภาพกิจกรรมการจัดอบรมหลักสูตรสำหรับผู้ใช้งานตัวแทนบริษัทประกันภัย สำหรับการใช้งานระบบ I-SERFF เมื่อวันที่ 27/02/2558 โดยความร่วมมือจาก สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)',
        'เพื่อเสริมสร้างความรู้ความเข้าใจในการยื่นขอรับความเห็นชอบแบบและข้อความกรมธรรม์ประกันภัยผ่านระบบอิเล็กทรอนิกส์ได้อย่างมีประสิทธิภาพ รวดเร็ว และแม่นยำ พร้อมทั้งตอบข้อซักถามในการใช้งานจริง'
      ],
      aiSummary: [
        'จัดอบรมการใช้งานระบบ I-SERFF แก่ตัวแทนบริษัทประกันภัยชั้นนำ',
        'ความร่วมมืออย่างเป็นทางการร่วมกับสำนักงาน คปภ.',
        'เพิ่มความรวดเร็วและความถูกต้องในการยื่นเอกสารแบบอิเล็กทรอนิกส์'
      ],
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'การประชุมชี้แจงการใช้งานระบบรับและจัดเก็บข้อมูลอิเล็กทรอนิกส์ระหว่างสถาบันคุ้มครองเงินฝากและสถาบันการเงิน (EFMS)',
      date: 'สัมมนา & การประชุม',
      category: 'Enterprise Software',
      readTime: '3 นาทีในการอ่าน',
      summary: 'สถาบันคุ้มครองเงินฝาก (สคฝ.) จัดการประชุมชี้แจงการใช้งานระบบรับและจัดเก็บข้อมูลอิเล็กทรอนิกส์ระหว่างสถาบันคุ้มครองเงินฝากและสถาบันการเงิน (EFMS) ให้กับเจ้าหน้าที่สถาบันการเงิน เพื่อเตรียมความพร้อม',
      author: {
        name: 'ทีมที่ปรึกษาระบบ EFMS',
        role: 'Financial Systems & Integration Consultant',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
      },
      rating: {
        score: 5.0,
        count: 41
      },
      likes: 88,
      fullContent: [
        'สถาบันคุ้มครองเงินฝาก (สคฝ.) จัดการประชุมชี้แจงการใช้งานระบบรับและจัดเก็บข้อมูลอิเล็กทรอนิกส์ระหว่างสถาบันคุ้มครองเงินฝากและสถาบันการเงิน (EFMS) ให้กับเจ้าหน้าที่สถาบันการเงิน เพื่อเตรียมความพร้อมและทำความเข้าใจแนวปฏิบัติ',
        'ระบบ EFMS ได้รับการพัฒนาขึ้นเพื่อยกระดับความปลอดภัยและความรวดเร็วในการส่งผ่านข้อมูลทางการเงินตามมาตรฐานความปลอดภัยข้อมูลระดับสูงสุด ช่วยให้หน่วยงานกำกับดูแลและสถาบันการเงินประสานงานกันได้อย่างไร้รอยต่อ'
      ],
      aiSummary: [
        'การประชุมชี้แจงระบบ EFMS ร่วมกับสถาบันคุ้มครองเงินฝากและสถาบันการเงิน',
        'เน้นย้ำมาตรฐานความปลอดภัยและการเชื่อมต่อข้อมูลอิเล็กทรอนิกส์ที่ไร้รอยต่อ',
        'เตรียมความพร้อมให้แก่เจ้าหน้าที่ธนาคารและสถาบันการเงินทั่วประเทศ'
      ],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 5,
      title: 'I-SMARTSOFT (โปรแกรมระบบบริหารสำนักงานอิเล็กทรอนิกส์ iSmartFlow)',
      date: 'ผลิตภัณฑ์ & โซลูชัน',
      category: 'Enterprise Software',
      readTime: '2 นาทีในการอ่าน',
      summary: 'โปรแกรมระบบบริหารสำนักงานอิเล็กทรอนิกส์ iSmartFlow ช่วยจัดการเอกสาร หนังสือเวียน และระบบอนุมัติงานภายในองค์กรแบบ Paperless รวดเร็วและแม่นยำ',
      author: {
        name: 'ฝ่ายพัฒนาผลิตภัณฑ์ iSmartFlow',
        role: 'Product Development Lead',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
      },
      rating: {
        score: 4.8,
        count: 36
      },
      likes: 79,
      fullContent: [
        'I-SMARTSOFT / iSmartFlow นวัตกรรมระบบบริหารสำนักงานอิเล็กทรอนิกส์ที่ออกแบบมาเพื่อองค์กรยุคดิจิทัลโดยเฉพาะ',
        'ช่วยบริหารจัดการงานสารบรรณ งานหนังสือเข้า-ออก การเกษียนหนังสือ และระบบ Work Flow อนุมัติเอกสารออนไลน์ 100% ประหยัดเวลาและลดการใช้กระดาษในองค์กรได้อย่างยั่งยืน'
      ],
      aiSummary: [
        'ระบบบริหารสำนักงานอิเล็กทรอนิกส์ iSmartFlow ลดการใช้กระดาษ 100%',
        'รองรับระบบสารบรรณและ E-Workflow การอนุมัติเอกสารออนไลน์',
        'เพิ่มความคล่องตัวในการทำงานของทุกแผนกในองค์กร'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
    }
  ]

  const getNewsById = (id: number | string): NewsItem | undefined => {
    return newsList.find(n => n.id === Number(id))
  }

  return {
    newsList,
    getNewsById
  }
}
