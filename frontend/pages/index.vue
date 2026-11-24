<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import HeroSection from '~/components/HeroSection.vue'
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

    <!-- 3. แถบความเคลื่อนไหว (Kinetic Motion Marquee) -->
    <KineticBand />

    <!-- 4. แคตตาล็อกสินค้าและผลิตภัณฑ์ (Product Catalog) -->
    <ProductCatalog />

    <!-- 5. ข่าวสารและกิจกรรมล่าสุด (News & Updates) -->
    <NewsSection />

    <!-- 6. ฟอร์มติดต่อ สอบถามสินค้า หรือขอคำปรึกษา (Contact & Consultation) -->
    <ContactFooter />
  </main>
</template>
