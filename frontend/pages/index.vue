<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import HeroSection from '~/components/HeroSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import KineticBand from '~/components/KineticBand.vue'
import ProductCatalog from '~/components/ProductCatalog.vue'
import NewsSection from '~/components/NewsSection.vue'
import ContactFooter from '~/components/ContactFooter.vue'
</script>

<template>
  <main class="min-h-screen relative selection:bg-[#00D26A] selection:text-[#022C22]">
    <!-- 1. แถบเมนูด้านบนแบบมาตรฐาน ใช้งานง่าย สบายตา (Modern Top Navbar) -->
    <AppHeader />

    <!-- 2. ส่วนหัว: แบนเนอร์หลักและไฮไลต์สำคัญ -->
    <HeroSection />

    <!-- 3. เกี่ยวกับเรา: บริษัท ไอเจนโก้ จำกัด (About IGENCO) -->
    <AboutSection />

    <!-- 4. กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตร (Clients & Partner Ecosystem) -->
    <KineticBand />

    <!-- 5. แคตตาล็อกสินค้าและผลิตภัณฑ์ (Product Catalog) -->
    <ProductCatalog />

    <!-- 6. ข่าวสารและกิจกรรมล่าสุด (News & Updates) -->
    <NewsSection />

    <!-- 7. ฟอร์มติดต่อ สอบถามสินค้า หรือขอคำปรึกษา (Contact & Consultation) -->
    <ContactFooter />
  </main>
</template>
